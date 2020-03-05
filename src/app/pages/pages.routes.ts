import { RouterModule, Routes } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AdminGuard, LoginGuardGuard } from '../services/service.index';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicoComponent } from './medicos/medico.component';
import { MedicosComponent } from './medicos/medicos.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'} },
            { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'}  },
            { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}  },
            { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}  },
            { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes del tema'}  },
            { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'}  },
            { path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'}  },
            // Mantenimientos
            { 
                path: 'usuarios',
                component: UsuariosComponent, 
                data: {titulo: 'Mantenimiento usuarios'},
                canActivate: [ AdminGuard ]
            },
            { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento hospitales'}  },
            { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento medicos'}  },
            { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar medico'}  },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( routes );
