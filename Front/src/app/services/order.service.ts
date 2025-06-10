import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders'; // URL del endpoint de pedidos

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any> {
    const token = localStorage.getItem('token'); // Recupera el token del localStorage
    const headers = { Authorization: `Bearer ${token}` }; // Agrega el encabezado Authorization

    return this.http.get(this.apiUrl, { headers });
  }
}