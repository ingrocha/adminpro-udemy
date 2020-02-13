import { Component, OnInit } from '@angular/core';

import { SidebarService } from 'src/app/services/service.index';

import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

	usuario:Usuario;

  constructor( public _sidebar: SidebarService, public _usuarioService: UsuarioService) { }

  ngOnInit() {
  	this.usuario = this._usuarioService.usuario;
  }

  logout(){
  	this._usuarioService.logout();
  }

}
