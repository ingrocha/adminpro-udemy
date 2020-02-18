import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UsuarioService} from '../usuario/usuario.service';
import {SubirArchivoService} from '../subir-archivo/subir-archivo.service';
import {URL_SERVICIOS} from '../../config/config';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Medico} from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
  	public http: HttpClient,
  	public router: Router,
  	public _usuarioService: UsuarioService,
  	public _subirArchivoService:SubirArchivoService
  	) { }

  cargarMedicos(){
  	let url = URL_SERVICIOS + '/medico';

  	return this.http.get( url );
  }

  buscarMedico( termino: string) {
	  let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get( url );
  }

  buscarMedicoId ( id: string ){
    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get( url )
          .pipe(
            map ( (resp: any) => resp.medico )
            )
  }

  guardarMedico( medico: Medico ) {
  	// let hospital: Hospital = [];
  	// hospital.nombre = nombre;
  	let url = URL_SERVICIOS + '/medico';

    if (medico._id) {
      //console.log(medico._id);
      let id = medico._id;
      url += '/' + id;
      url += '?token=' + this._usuarioService.token;
    return this.http.put( url, medico)
          .pipe(
            map( ( resp: any ) => {
              Swal.fire({
                title: 'Medico Actualizado',
                icon: 'success'
              })
              return resp.medicoGuardado;
            })
            );

    } else {
      // console.log(hospital);
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, medico)
          .pipe(
            map( ( resp: any ) => {
              Swal.fire({
                title: 'Medico Guardaro',
                icon: 'success'
              })
              return resp.medico;
            })
            );


    }
  }

  actualizarMedico( medico: Medico ) {
  	let url = URL_SERVICIOS + '/medico/' + medico._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put( url, medico )
              .pipe(
                map ( (resp: any) => {
                  Swal.fire({
                    title: 'Usuario actualizado',
                    text: medico.nombre,
                    icon: 'success',
                  });
                  return true;
                }));
  }

  borrarMedico( id: string ) {
  	let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
          .pipe(
            map ( resp => {
              Swal.fire(
                      '¡Borrado!',
                      'El medico fue borrado correctamente',
                      'success'
                    );
              return true;
            })
            );
  }



}
