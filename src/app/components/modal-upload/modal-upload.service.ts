import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

	public tipo:string;
	public id: string;
	public nombre: string;

	public oculto: string = '';

	public notificacion = new EventEmitter<any>();


  constructor() {
  	console.log('Modal upload listo');
   }

   ocultarmModal(){
   	this.tipo = null;
   	this.id = null;

   }

   mostrarModal( tipo: string, id: string, nombre: string){
   		this.tipo = tipo;
   		this.id = id;
   		this.nombre = nombre;
   }
}
