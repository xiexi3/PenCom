import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api'; // URL de tu API de Laravel

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Devuelve true si hay un token
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Asegúrate de guardar el token aquí después del login
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  login(email: string, password: string): Observable<string> {
    return this.http.post<{ data: { accessToken: string, user: any } }>(`${this.apiUrl}/cuenta`, { email, password })
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

  // signup(name: string, email: string, password: string): Observable<string> {
  //   return this.http.post<{ data: { user: { id: string } } }>(`${this.apiUrl}/register`, { name, email, password })
  //     .pipe(
  //       map(response => {
  //         const id = response.data.user.id;

  //         // Guardamos el token en el localStorage
  //         localStorage.setItem('userId', id);
  //         return id;
  //       }),
  //       catchError(error => {
  //         return throwError(() => error);
  //       })
  //     );
  // }

  signup(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  sendRecoveryCode(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/regenerate/code`, { email });
  }

  recoverPassword(payload: { email: string; token: string; password: string; password_confirmation: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/regenerate/password`, payload);
  }

}
