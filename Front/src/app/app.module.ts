import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
// import { ChangePasswordComponent } from './components/change-password/change-password.component';
// import { AnadirProductoComponent } from './components/anadir-producto/anadir-producto.component';
// import { SignupComponent } from './components/signup/signup.component';
// import { DetallesComponent } from './components/detalles/detalles.component';
// import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    // RouterModule.forRoot(routes, {
    //   scrollPositionRestoration: 'enabled' // Habilita el scroll al inicio de la página
    // }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
