import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

	usuario: Usuario;

	imagenSubir: File;
	imagenTemp: any;

  constructor(
  	public _usuarioService: UsuarioService
  	) { }

  ngOnInit() {
  	this.usuario = this._usuarioService.usuario;
  }

  guardar ( form ){
  	this.usuario.nombre = form.nombre;
  	if (!this.usuario.google) {
  		this.usuario.email = form.email;
  	}

  	this._usuarioService.actualizarUsuario( this.usuario )
  				.subscribe( resp =>{
  					console.log(resp);
  				})
  }

  selccionImagen( archivo: File ){
  	if (!archivo) {
  		this.imagenSubir = null;
  		return;
  	}

  	if (archivo.type.indexOf('image') < 0) {
  		Swal.fire({
  			title: 'Solo imagenes',
  			text:'El archivo seleccionado no es una imgen',
  			icon: 'error'
  		});
  		this.imagenSubir = null;
  		return;
  		// code...
  	}
  	this.imagenSubir = archivo;
  	let reader = new FileReader();
  	let urlImagenTemp = reader.readAsDataURL( archivo );
  	reader.onloadend = () => this.imagenTemp = reader.result;
  }

  cargarImagen(){
  	this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );

  }

}
