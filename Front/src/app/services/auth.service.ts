import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

    /**
   * Verifica si el usuario está autenticado (si existe un token en el localStorage).
   * @returns boolean - True si hay un token, false si no.
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

    /**
   * Obtiene los encabezados de autenticación para las solicitudes HTTP.
   * @returns HttpHeaders - Objeto HttpHeaders con el token de autenticación.
   */
  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

    /**
   * Realiza la autenticación del usuario (login).
   * @param email - Correo electrónico del usuario.
   * @param password - Contraseña del usuario.
   * @returns Observable<string> - Observable con el token de acceso.
   */
  login(email: string, password: string): Observable<string> {
    return this.http.post<{ data: { accessToken: string, user: any } }>(`${this.apiUrl}/cuenta`, { email, password })
    .pipe(
      map(response => {
        const accessToken = response.data.accessToken;
        localStorage.setItem('token', accessToken);
        return accessToken;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

    /**
   * Registra un nuevo usuario.
   * @param name - Nombre del usuario.
   * @param email - Correo electrónico del usuario.
   * @param password - Contraseña del usuario.
   * @returns Observable<any> - Observable con la respuesta del servidor.
   */
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

    /**
   * Envía un código de recuperación de contraseña al correo electrónico del usuario.
   * @param email - Correo electrónico del usuario.
   * @returns Observable<any> - Observable con la respuesta del servidor.
   */
  sendRecoveryCode(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/regenerate/code`, { email });
  }

    /**
   * Recupera la contraseña del usuario utilizando el código de recuperación.
   * @param payload - Objeto con el correo electrónico, el código de recuperación y la nueva contraseña.
   * @returns Observable<any> - Observable con la respuesta del servidor.
   */
  recoverPassword(payload: { email: string; token: string; password: string; password_confirmation: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/regenerate/password`, payload);
  }

}
