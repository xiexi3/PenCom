import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'componentes', loadComponent: () => import('./components/componentes/componentes.component').then(m => m.ComponentesComponent) },
  { path: 'ordenadores', loadComponent: () => import('./components/ordenadores/ordenadores.component').then(m => m.OrdenadoresComponent) },
  { path: 'micuenta', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'micesta', loadComponent: () => import('./components/micesta/micesta.component').then(m => m.MicestaComponent) },
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  // { path: 'signup', loadComponent: () => import('./components/signup/signup.component').then(m => m.SignupComponent) },
  // { path: 'user-panel', loadComponent: () => import('./components/user-panel/user-panel.component').then(m => m.UserPanelComponent) },
  { path: 'producto/:id', loadComponent: () => import('./components/detalles/detalles.component').then(m => m.DetallesComponent) },
]; 