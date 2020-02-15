import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import {
  LoginGuardGuard,
  SettingsService,
  SharedService,
  SidebarService,
  UsuarioService,
  SubirArchivoService
} from './service.index';
import {
  ModalUploadService,
} from '../components/modal-upload/modal-upload.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService
  ]
})
export class ServiceModule { }
