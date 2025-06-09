import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'componentes', loadComponent: () => import('./components/componentes/componentes.component').then(m => m.ComponentesComponent) },
  { path: 'ordenadores', loadComponent: () => import('./components/ordenadores/ordenadores.component').then(m => m.OrdenadoresComponent) },
  { path: 'micuenta', loadComponent: () => import('./components/cuenta/cuenta.component').then(m => m.LoginComponent) },
  { path: 'carro', loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent) },
  { path: 'cuenta', loadComponent: () => import('./components/cuenta/cuenta.component').then(m => m.LoginComponent) },
  // { path: 'signup', loadComponent: () => import('./components/signup/signup.component').then(m => m.SignupComponent) },
  { path: 'user-panel', loadComponent: () => import('./components/user-panel/user-panel.component').then(m => m.UserPanelComponent), canActivate: [AuthGuard] },
  { path: 'producto/:id', loadComponent: () => import('./components/detalles/detalles.component').then(m => m.DetallesComponent) },
  { path: 'producto', loadComponent: () => import('./components/anadir-producto/anadir-producto.component').then(m => m.AnadirProductoComponent) },
  { path: 'change-password', loadComponent: () => import('./components/change-password/change-password.component').then(m => m.ChangePasswordComponent) },
  { path: 'forgot-password', loadComponent: () => import('./components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
  { path: '**', loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent) },
]; 