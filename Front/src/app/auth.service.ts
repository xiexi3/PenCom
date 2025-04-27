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
    return this.http.post<{ data: { accessToken: string } }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(response => {
          const accessToken = response.data.accessToken;

          // Guardamos el token en el localStorage
          localStorage.setItem('token', accessToken);
          return accessToken;
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
  }
}
