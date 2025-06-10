import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/user'; // URL del endpoint para obtener los datos del usuario
  private apiShippingUrl = 'http://localhost:8080/api/user/shipping-address';

  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    const token = localStorage.getItem('token'); // Recupera el token del localStorage
    const headers = { Authorization: `Bearer ${token}` }; // Agrega el encabezado Authorization

    return this.http.get(this.apiUrl, { headers });
  }

  getUserShippingAddress(): Observable<any> {
    const token = localStorage.getItem('token'); // Recupera el token del localStorage
    const headers = { Authorization: `Bearer ${token}` }; // Agrega el encabezado Authorization

    return this.http.get(this.apiShippingUrl, { headers });
  }

  updateShippingAddress(address: string): Observable<any> {
	const token = localStorage.getItem('token'); // Recupera el token del localStorage
	const headers = { Authorization: `Bearer ${token}` }; // Agrega el encabezado Authorization
  
	return this.http.put('http://localhost:8080/api/user/shipping-address', { shipping_address: address }, { headers });
  }

  updateProfilePicture(file: File): Observable<any> {
	const formData = new FormData();
	formData.append('profile_picture', file);
  
	const token = localStorage.getItem('token'); // Recupera el token del localStorage
	const headers = { Authorization: `Bearer ${token}` }; // Agrega el encabezado Authorization
  
	return this.http.post('http://localhost:8080/api/user/profile-picture', formData, { headers });
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    const data = { current_password: currentPassword, new_password: newPassword };
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
  
    return this.http.post('http://localhost:8080/api/change-password', data, { headers });
  }

  // recoverPassword(token: string, newPassword: string): Observable<any> {
  //   return this.http.post('/api/recover-password', { token, password: newPassword });
  // }

    /**
   * Envía un código de recuperación al correo electrónico proporcionado.
   * @param email Correo electrónico del usuario.
   * @returns Observable con la respuesta del servidor.
   */
    sendRecoveryCode(email: string): Observable<any> {
      return this.http.post('http://localhost:8080/api/regenerate/code', { email });
    }
  
    /**
     * Cambia la contraseña utilizando el token de recuperación.
     * @param token Token de recuperación enviado al correo.
     * @param newPassword Nueva contraseña del usuario.
     * @returns Observable con la respuesta del servidor.
     */
    // recoverPassword(token: string, newPassword: string): Observable<any> {
    //   return this.http.post('http://localhost:8080/api/regenerate/password', { token, password: newPassword });
    // }

    recoverPassword(payload: { email: string; token: string; password: string; password_confirmation: string }): Observable<any> {
      return this.http.post('http://localhost:8080/api/regenerate/password', payload);
    }
  
}
