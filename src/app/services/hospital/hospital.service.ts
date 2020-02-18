import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Hospital } from '../../models/hospital.model';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

	token: string;

  constructor(
  	public http: HttpClient,
  	public router: Router,
    public _subirArchivoService: SubirArchivoService,
    public _usuarioService: UsuarioService
  	) { }

  cargarHospitales( desde: number = 0) {
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get( url );
  }

  cargarHospitalesId( id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get( url );
  }

  buscarHospital( termino: string) {
	let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get( url );
  }

  guardarHospital( nombre: string, img?: File ) {
  	// let hospital: Hospital = [];
  	// hospital.nombre = nombre;
  	let url = URL_SERVICIOS + '/hospital';
  	url += '?token=' + this._usuarioService.token;

  	// console.log(hospital);
  	return this.http.post( url, { nombre })
  				.pipe(
  					map( resp => {
  						Swal.fire({
  							title: 'Hospital Guardaro',
  							icon: 'success'
  						})
  					})
  					);

  }

  actualizarHospital( hospital: Hospital ) {
  	let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put( url, hospital )
              .pipe(
                map ( (resp: any) => {
                  Swal.fire({
                    title: 'Usuario actualizado',
                    text: hospital.nombre,
                    icon: 'success',
                  });
                  return true;
                }));
  }

  borrarHospital( id: string ) {
  	let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
          .pipe(
            map ( resp => {
              Swal.fire(
                      '¡Borrado!',
                      'El hospital fue borrado correctamente',
                      'success'
                    );
              return true;
            })
            );
  }
}
