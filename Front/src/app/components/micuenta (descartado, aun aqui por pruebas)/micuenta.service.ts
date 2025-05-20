// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// // import { environment } from '../../../environments/environment';

// interface LoginData {
//   email: string;
//   password: string;
// }

// interface RegisterData {
//   name: string;
//   email: string;
//   password: string;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class MicuentaService {
//   private apiUrl = 'http://localhost:8000/api'; // 'environment.apiUrl; // Definido en environment como 'http://localhost:8000/api'

//   constructor(private http: HttpClient) {}

//   login(data: LoginData): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, data);
//   }

//   register(data: RegisterData): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, data);
//   }

//   forgotPassword(email: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/forgot-password`, { email });
//   }

//   // Método para verificar si el usuario está autenticado
//   checkAuth(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/user`);
//   }

//   // Método para cerrar sesión
//   logout(): Observable<any> {
//     return this.http.post(`${this.apiUrl}/logout`, {});
//   }
// }
