import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import {
  ModalUploadService,
} from '../../components/modal-upload/modal-upload.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor( 
    public _usuarioServices: UsuarioService,
    public _modalUploadService: ModalUploadService
    ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
        .subscribe( resp => this.cargarUsuarios() );
  }

  mostrarModal( usuario: Usuario){
    this._modalUploadService.mostrarModal( 'usuarios', usuario._id, usuario.nombre );
  }

  cargarUsuarios(){
    this.cargando = true;
    this._usuarioServices.cargarUsuarios( this.desde )
        .subscribe( (resp: any) =>{
          this.cargando = false;
          this.usuarios = resp.usuarios;
          this.totalRegistros = resp.contador;
        });
  }

    cambiarDesde( valor: number){
      let desde = this.desde + valor;
      if (desde >= this.totalRegistros) {
        return;
      }

      if (desde < 0) {
        return;
      }

      this.desde += valor;
      this.cargarUsuarios();
    }

    buscarUsuario( termino: string) {
      this.cargando = true;
      if (termino.length <= 0) {
        this.cargarUsuarios();
        return;
      }
      this._usuarioServices.buscarUsuario(termino)
              .subscribe((resp: any) => {
                this.cargando = false;
                this.usuarios = resp.usuarios;
              })
    }

    borrarUsuario( usuario: Usuario ) {

      if (usuario._id === this._usuarioServices.usuario._id) {
        Swal.fire({
                  title:'No puede borrar usuario',
                  text: 'No se puede borrar a si mismo',
                  icon: 'error'
                  });
        return;
      }

      Swal.fire({
          title: '¿Estas seguro?',
          text: "Esta a punto de borrar a " + usuario.nombre,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, borralo'
        }).then((result) => {
          if (result.value) {
            this._usuarioServices.borrarUsuario( usuario._id)
                  .subscribe( (resp: any) => {
                    console.log(resp);
                    this.cargarUsuarios();
                  })
          }
        })
    }

    guardarUsuario( usuario: Usuario){
      this._usuarioServices.actualizarUsuario( usuario )
              .subscribe();
    }

}
