import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private apiUrlUser = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Obtiene la información del usuario autenticado.
   * @returns Observable<any> - Un observable que emite la información del usuario.
   */
  getUser(): Observable<any> {
    return this.http.get(this.apiUrlUser, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  /**
   * Obtiene los detalles del usuario autenticado.
   * @returns Observable<any> - Un observable que emite los detalles del usuario.
   */
  getUserDetails(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.get(`${this.apiUrlUser}/details`, { headers });
  }

  /**
   * Actualiza la información del usuario.
   * @param userData - Objeto con los datos del usuario a actualizar.
   * @returns Observable<any> - Un observable que emite la respuesta del servidor.
   */
  getUserShippingAddress(): Observable<any> {
    return this.http.get(`${this.apiUrlUser}/shipping-address`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  /**
   * Actualiza la dirección de envío del usuario.
   * @param address - Nueva dirección de envío.
   * @returns Observable<any> - Observable con la respuesta del servidor.
   */
  updateShippingAddress(address: string): Observable<any> {
    return this.http.put(
      `${this.apiUrlUser}/shipping-address`,
      { shipping_address: address },
      { headers: this.authService.getAuthHeaders() }
    );
  }

  /**
   * Actualiza la foto de perfil del usuario.
   * @param file - Archivo de la imagen de perfil.
   * @returns Observable<any> - Observable con la respuesta del servidor.
   */
  updateProfilePicture(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('profile_picture', file);
    return this.http.post(`${this.apiUrlUser}/profile-picture`, formData, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  /**
   * Cambia la contraseña del usuario.
   * @param currentPassword - Contraseña actual del usuario.
   * @param newPassword - Nueva contraseña del usuario.
   * @returns Observable<any> - Observable con la respuesta del servidor.
   */
  changePassword(
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    const data = {
      current_password: currentPassword,
      new_password: newPassword,
    };
    return this.http.post(`${this.apiUrlUser}/change-password`, data, {
      headers: this.authService.getAuthHeaders(),
    });
  }
}
