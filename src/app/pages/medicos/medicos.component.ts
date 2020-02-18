import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { MedicoService } from '../../services/service.index';
import {Medico} from '../../models/medico.model';
import {
  ModalUploadService,
} from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

	medicos: Medico[] = [];
	desde: number = 0;

	totalRegistros: number = 0;
	cargando: boolean = true;

  constructor(
  	public _medicoService: MedicoService,
  	public _modalUploadService: ModalUploadService
  	) { }

  ngOnInit() {
  	this.cargarMedicos();
  	this._modalUploadService.notificacion
        .subscribe( resp => this.cargarMedicos() );
  }

  cargarMedicos() {
  	this.cargando = true;
  	this._medicoService.cargarMedicos()
  		.subscribe( (resp: any ) => {
  			this.cargando = false;
          		this.medicos = resp.medicos;
          		this.totalRegistros = resp.contador;
  		});
  }

  cambiarDesde( valor: number) {
		let desde = this.desde + valor;
		if (desde >= this.totalRegistros) {
			return;
		}

		if (desde < 0) {
			return;
    	}

    	this.desde += valor;
    	this.cargarMedicos();
    }

    buscarMedicos( termino: string) {
     	this.cargando = true;
     	if (termino.length <= 0) {
    		this.cargarMedicos();
        	return;
    	}
    	this._medicoService.buscarMedico(termino)
              .subscribe((resp: any) => {
                this.cargando = false;
                this.medicos = resp.medicos;
              });
    }

    agregarMedico() {
		
    }

    editarMedico(){

    }

    borrarMedico( medico: Medico ) {
	   	Swal.fire({
          title: '¿Estas seguro?',
          text: 'Esta a punto de borrar a ' + medico.nombre,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, borralo'
        }).then((result) => {
          if (result.value) {
            this._medicoService.borrarMedico( medico._id)
                  .subscribe( (resp: any) => {
                    this.cargarMedicos();
                  });
          }
        });
    }

    guardarMedico( medico: Medico) {
		this._medicoService.actualizarMedico( medico )
              .subscribe();
    }

    mostrarModal( medico: Medico) {
		this._modalUploadService.mostrarModal( 'medicos', medico._id, medico.nombre );
	}

}
