import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DonaComponent } from '../components/dona/dona.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { PAGES_ROUTES } from './pages.routes';
import { PagesComponent } from './pages.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import {CommonModule} from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    IncrementadorComponent,
    DonaComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    ModalUploadComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    ProfileComponent,
    // UsuariosComponent,
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    PipesModule,
    CommonModule
  ]
})
export class PagesModule { }
