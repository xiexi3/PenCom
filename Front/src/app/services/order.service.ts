import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene el listado de órdenes del usuario autenticado.
   * @returns Observable<any> - Observable con la información de las órdenes.
   */
  getOrders(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get(this.apiUrl, { headers });
  }
}
