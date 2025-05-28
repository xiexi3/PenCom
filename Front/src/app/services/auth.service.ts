import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // URL de tu API de Laravel

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<string> {
    return this.http.post<{ data: { accessToken: string, user: any } }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(response => {
          const accessToken = response.data.accessToken;
          const role = response.data.user.role;

          // Guardamos el token en el localStorage
          localStorage.setItem('token', accessToken);
          // localStorage.setItem('role', role);
          return accessToken;
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  signup(name: string, email: string, password: string): Observable<string> {
    return this.http.post<{ data: { user: { id: string } } }>(`${this.apiUrl}/register`, { name, email, password })
      .pipe(
        map(response => {
          const id = response.data.user.id;

          // Guardamos el token en el localStorage
          localStorage.setItem('userId', id);
          return id;
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  // getUserRole(): string {
  //   const token = localStorage.getItem('token');
  //   if (!token) return '';
  
  //   const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el token JWT
  //   return payload.role || ''; // Devuelve el rol del usuario
  // }

  // getUserRole(): string {
  //   return localStorage.getItem('role') || ''; // Recupera el rol del usuario
  // }

  // getUserDetails(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/user-details`); // Endpoint para obtener detalles del usuario
  // }

  getUserDetails(): Observable<any> {
    const token = localStorage.getItem('token'); // Recupera el token del localStorage
  
    const headers = {
      Authorization: `Bearer ${token}` // Agrega el encabezado Authorization
    };
  
    return this.http.get(`${this.apiUrl}/user-details`, { headers });
  }

}
