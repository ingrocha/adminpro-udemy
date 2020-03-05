import { throwError } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {map, catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';

import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';

// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
    ) {
    // console.log( 'Servicio de usuario listo' );
    this.cargarStorage();
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

// ===============================================
// LOGIN LOGOUT
// ===============================================

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);

  }

  loginGoogle( token: string) {
    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token } )
      .pipe(
        map ( (resp: any) => {
          this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);
          
          return true;
        })
        );
  }

  login(usuario: Usuario, recordar: boolean = false) {
  
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

  let url = URL_SERVICIOS + '/login';
  return this.http.post(url, usuario)
      .pipe(
        map ( (resp: any) =>{
          this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);
          return true;
        }),
        catchError( ( error: any )  => {
          Swal.fire({
            title: 'Error en el loguin',
            text: error.error.mensaje,
            icon: 'error',
          });

          return throwError(error);
        })
        );
  }

  // ============================================================
  // USUARIOS
  // ============================================================

  crearUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario).pipe( map((resp: any) => {
    // swal('Usuario creado', usuario.email,'success');
    Swal.fire({
      title: 'Usuario creado',
      text: usuario.email,
      icon: 'success',
    });
    return resp.usuario;
  }),
    catchError( (error: any) =>{
      Swal.fire({
            title: error.error.mensaje,
            text: error.error.error.message,
            icon: 'error',
          });
      return throwError(error);
    })
    );

  }

  actualizarUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put( url, usuario ) 
              .pipe(
                map ( (resp: any) => {
                  if (usuario._id === this.usuario._id) {
                    this.guardarStorage( resp.usuario._id, this.token, resp.usuario, resp.menu);
                  }
                  Swal.fire({
                    title: 'Usuario actualizado',
                    text: usuario.email,
                    icon: 'success',
                  });
                  return true;
                }),
                  catchError( (error: any) =>{
                    Swal.fire({
                          title: error.error.mensaje,
                          text: error.error.error.message,
                          icon: 'error',
                        });
                    return throwError(error);
                  })
                );

  }

  cambiarImagen( archivo: File, id: string ) {
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id)
          .then( (resp: any) => {
            this.usuario.img = resp.usuario.img;
            Swal.fire({
              title: 'Imagen actualizada',
              text: this.usuario.nombre,
              icon: 'success'
            });
            this.guardarStorage( id, this.token, this.usuario, resp.menu );
          })
          .catch( resp =>{
            Swal.fire({
              title: 'No se pudo actualizada la imagen',
              text: this.usuario.nombre,
              icon: 'error'
            });
            console.error(resp);
          });
  }

  cargarUsuarios( desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get( url );
  }

  buscarUsuario( termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get( url );
  }

  borrarUsuario ( id : string ) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url )
          .pipe(
            map ( resp => {
              Swal.fire(
                      '¡Borrado!',
                      'El usuario fue borrado correctamente',
                      'success'
                    );
              return true;
            })
            );
  }



}
