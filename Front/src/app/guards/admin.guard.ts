import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  /**
   * Método que determina si la ruta puede ser activada.
   * @param route - Información sobre la ruta que se va a activar.
   * @param state - Estado del enrutador.
   * @returns Observable<boolean> - Observable que indica si la ruta puede ser activada.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/cuenta']);
      return of(false); // No está autenticado, deniega el acceso
    }

    return this.userService.getUserDetails().pipe(
      map(response => {
        // Verifica si el usuario tiene el rol de administrador
        if (response.data.role === 'admin') {
          return true; 
        } else {
          // Redirige a una página de error o a la página principal si no es administrador
          this.router.navigate(['/']); 
          return false; 
        }
      }),
      catchError(err => {
        // console.error('Error al obtener detalles del usuario:', err);
        this.router.navigate(['/']);
        return of(false); 
      })
    );
  }
}