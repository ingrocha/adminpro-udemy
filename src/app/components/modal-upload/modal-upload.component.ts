import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { ModalUploadService } from './modal-upload.service';
import { SubirArchivoService } from '../../services/service.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

	oculto: string = '';

	imagenSubir: File;
	imagenTemp: any;

  constructor(
  	public _subirArchivoService: SubirArchivoService,
  	public _modalUploadService: ModalUploadService
  	) {
  	console.log('Modal listo');
   }

  ngOnInit() {
  }

  subirImagen() {
    console.log('Subir imagen');
  	this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
  			.then( resp => {
  				console.log( resp );
  				this._modalUploadService.notificacion.emit( resp );
  				this.cerrarModal();
  			})
  			.catch( err => {
  				console.error('Error en la carga');
  			})

  }

  cerrarModal() {
  	this.imagenSubir = null;
  	this.imagenTemp = null;
  	this._modalUploadService.ocultarmModal();
  	console.log('modal cerrado');

  }

  selccionImagen( archivo: File ) {
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

}
