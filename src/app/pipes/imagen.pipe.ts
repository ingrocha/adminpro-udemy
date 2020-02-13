import { Pipe, PipeTransform } from '@angular/core';

import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {
    
    let url = URL_SERVICIOS + '/img';

    if (!img) {
    	return url + '/usuarios/xxx'
    }

    if ( img.indexOf('https') >= 0 ) {
    	return img;
    }

    if (tipo === 'usuarios' || tipo === 'medicos' || tipo === 'hospitales') {
    	return url + `/${tipo}/` + img;
    } else {
    	console.error ('Solo se aceptan tipos usuarios, medicos y hospitales');
    	return url + '/usuarios/xxx';
    }

    // switch ( tipo ){
    // 	case 'usuario':
    // 		return url + '/usuarios/' + img;
    // 	break;
    // 	case 'usuario':

    // 	break;
    // 	case 'usuario':

    // 	break;
    // }

    return "funciona";
  }

}