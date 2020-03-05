import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

	usuario: Usuario;

  constructor( public _usuarioService: UsuarioService,
  	public router:Router) { 
	this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  buscar( termino: string){
  	this.router.navigate(['/busqueda',termino]);
  }
}
