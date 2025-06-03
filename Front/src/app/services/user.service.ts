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
}
