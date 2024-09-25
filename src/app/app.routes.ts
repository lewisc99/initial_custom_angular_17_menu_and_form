import { Routes } from '@angular/router';
import { AuthGuard } from './services/configuration/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./base/base.component').then((m) => m.BaseComponent),
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        title: 'Home',
        loadComponent: () =>
          import('./home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'forms',
        title: 'Custom Forms',
        loadComponent: () =>
          import('./forms/forms.component').then((m) => m.FormsComponent),
      },
      {
        path: '404',
        title: 'Página Não Encontrada',
        loadComponent: () =>
          import('./not-found/not-found.component').then(
            (m) => m.NotFoundComponent
          ),
      },
    ],
  },

  {
    path: 'nao-autorizado',
    title: 'Usuário Não Autenticado',
    loadComponent: () =>
      import('./nao-autorizado/nao-autorizado.component').then(
        (m) => m.NaoAutorizadoComponent
      ),
  },

  {
    path: '**',
    redirectTo: '404',
  },
];
