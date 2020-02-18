import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import {
  ModalUploadService,
} from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

	hospitales: Hospital[] = [];
	desde: number = 0;

	totalRegistros: number = 0;
	cargando: boolean = true;

  constructor(
  	public _hospitalService: HospitalService,
  	public _modalUploadService: ModalUploadService
  	) { }

  ngOnInit() {
  	this.cargarHospitales();

  	this._modalUploadService.notificacion
        .subscribe( resp => this.cargarHospitales() );
  }

  cargarHospitales() {
  	this.cargando = true;
  	this._hospitalService.cargarHospitales( this.desde )
  			.subscribe( (resp: any) => {
  				this.cargando = false;
          		this.hospitales = resp.hospitales;
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
    	this.cargarHospitales();
    }

  obtenerHospital ( id: string ) {
  	this.cargando = true;
  	this._hospitalService.cargarHospitalesId( id )
  			.subscribe( (resp: any) => {
  				console.log();
  			})
  }

  buscarHospitales( termino: string) {
      this.cargando = true;
      if (termino.length <= 0) {
        this.cargarHospitales();
        return;
      }
      this._hospitalService.buscarHospital(termino)
              .subscribe((resp: any) => {
                this.cargando = false;
                this.hospitales = resp.hospitales;
              });
    }

    agregarHospital() {
  		Swal.fire({
  		  title: 'Nombre del hospital',
  		  input: 'text',
  		  inputAttributes: {
  		    autocapitalize: 'off'
  		  },
  		  showCancelButton: true,
  		  confirmButtonText: 'Guardar',
  		  cancelButtonText: 'Cancelar',
  		  showLoaderOnConfirm: true,
  		  preConfirm: (valor) => {
  		  	console.log(valor);
  		    this._hospitalService.guardarHospital(valor)
  		    	.subscribe( resp => {
  		 			this.cargarHospitales();
  		 			return resp; 
  		    	});
  		  },
  		  allowOutsideClick: false
  		}).then((result) => {
  		 
  		});
    }

    borrarHospital( hospital: Hospital ) {
	   	Swal.fire({
          title: '¿Estas seguro?',
          text: 'Esta a punto de borrar a ' + hospital.nombre,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, borralo'
        }).then((result) => {
          if (result.value) {
            this._hospitalService.borrarHospital( hospital._id)
                  .subscribe( (resp: any) => {
                    console.log(resp);
                    this.cargarHospitales();
                  });
          }
        });
    }

    guardarHospital( hospital: Hospital) {
		  this._hospitalService.actualizarHospital( hospital )
              .subscribe();
    }

    mostrarModal( hospital: Hospital) {
  		this._modalUploadService.mostrarModal( 'hospitales', hospital._id, hospital.nombre );
  	}

}
