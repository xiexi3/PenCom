import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/user'; // URL del endpoint para obtener los datos del usuario

  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    const token = localStorage.getItem('token'); // Recupera el token del localStorage
    const headers = { Authorization: `Bearer ${token}` }; // Agrega el encabezado Authorization

    return this.http.get(this.apiUrl, { headers });
  }

  updateShippingAddress(address: string): Observable<any> {
	const token = localStorage.getItem('token'); // Recupera el token del localStorage
	const headers = { Authorization: `Bearer ${token}` }; // Agrega el encabezado Authorization
  
	return this.http.put('http://localhost:8000/api/user/shipping-address', { shipping_address: address }, { headers });
  }

  updateProfilePicture(file: File): Observable<any> {
	const formData = new FormData();
	formData.append('profile_picture', file);
  
	const token = localStorage.getItem('token'); // Recupera el token del localStorage
	const headers = { Authorization: `Bearer ${token}` }; // Agrega el encabezado Authorization
  
	return this.http.post('http://localhost:8000/api/user/profile-picture', formData, { headers });
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    const data = { current_password: currentPassword, new_password: newPassword };
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
  
    return this.http.post('http://localhost:8000/api/change-password', data, { headers });
  }
  
}
