import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

	constructor(public _usuarioService: UsuarioService, public router:Router){}

	canActivate() {
		if (!this._usuarioService.estaLogueado()) {
			this.router.navigate(['/login']);
		}

		return this._usuarioService.estaLogueado();
	};
}
