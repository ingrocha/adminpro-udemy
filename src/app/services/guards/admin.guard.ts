import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router,
    ){}

  canActivate(){
    if (this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    }else{
      // this.router.navigate(['/login']);
      // this._usuarioService.logout();
      // return false;
      return true;
    }
  }
  
}
