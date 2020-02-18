import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import {Hospital} from '../../models/hospital.model';
import {MedicoService, HospitalService} from '../../services/service.index';
import {Medico} from '../../models/medico.model';
import {Router, ActivatedRoute} from '@angular/router';
import {ModalUploadService} from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})

export class MedicoComponent implements OnInit {

	hospitales: Hospital[] = [];
	medico: Medico = new Medico('','','','','');
	hospital: Hospital = new Hospital('');

  constructor(
  	public _medicoService: MedicoService,
  	public _hospitalService: HospitalService,
  	public router: Router,
  	public activatedRoute: ActivatedRoute,
  	public _modalUploadService:ModalUploadService
  	) { 
  	activatedRoute.params.subscribe( params =>{
  		let id = params['id'];
  		if (id !== 'nuevo') {
  			this.buscarMedico( id );
  		}
  	});
  	this._modalUploadService.notificacion
  			.subscribe( resp => this.medico = resp.medico );
  }

  ngOnInit() {
  	this._hospitalService.cargarHospitales()
  		.subscribe( (resp: any) => this.hospitales = resp.hospitales);
  }

  guardarMedico( f: NgForm) {
  	if ( f.invalid ) {
  		return;
  	}
  	this._medicoService.guardarMedico( this.medico )
  			.subscribe( (medico: Medico) => {
  				this.medico._id = medico._id;
  				this.router.navigate(['/medico',medico._id]);
  			});
  }

  cambioHospita( id: string ) {
  	if (!id) {
  		return;
  	}

  	this._hospitalService.cargarHospitalesId( id )
  		.subscribe( (resp: any) => {
  			this.hospital = resp.hospital;
  		});
  }

  buscarMedico( id: string ){
  	this._medicoService.buscarMedicoId( id )
  			.subscribe( resp => {
  				this.medico = resp;
  				this.medico.hospital = resp.hospital._id;
  				this.cambioHospita( this.medico.hospital );
  			});
  }

  cambiarFoto( medico: Medico ){
  	this._modalUploadService.mostrarModal( 'medicos', medico._id, medico.nombre );
  }

}
