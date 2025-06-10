import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrlUser = 'http://localhost:8080/api/user'; // URL base para los endpoints del usuario

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUser(): Observable<any> {
    return this.http.get(this.apiUrlUser, { headers: this.authService.getAuthHeaders() });
  }

  getUserDetails(): Observable<any> {
    const token = localStorage.getItem('token'); // Recupera el token del localStorage
  
    const headers = {
      Authorization: `Bearer ${token}` // Agrega el encabezado Authorization
    };
  
    return this.http.get(`${this.apiUrlUser}/details`, { headers });
  }

  getUserShippingAddress(): Observable<any> {
    return this.http.get(`${this.apiUrlUser}/shipping-address`, { headers: this.authService.getAuthHeaders() });
  }

  updateShippingAddress(address: string): Observable<any> {
    return this.http.put(`${this.apiUrlUser}/shipping-address`, { shipping_address: address }, { headers: this.authService.getAuthHeaders() });
  }

  updateProfilePicture(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('profile_picture', file);
    return this.http.post(`${this.apiUrlUser}/profile-picture`, formData, { headers: this.authService.getAuthHeaders() });
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    const data = { current_password: currentPassword, new_password: newPassword };
    return this.http.post(`${this.apiUrlUser}/change-password`, data, { headers: this.authService.getAuthHeaders() });
  }

}