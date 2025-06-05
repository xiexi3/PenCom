import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:8000/api/cart';
  private apiOrdersUrl = 'http://localhost:8000/api/orders';

  constructor(private http: HttpClient) {}

  // getCartItems(): Observable<any> {
  //   return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  // }

  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      map((response) => {
        // Aplanar el array anidado
        return response.flat();
      })
    );
  }

  addToCart(productId: number, quantity: number = 1): Observable<any> {
    return this.http.post(
      this.apiUrl,
      { product_id: productId, quantity },
      { headers: this.getAuthHeaders() }
    );
  }

  updateCartItem(id: number, quantity: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      { quantity },
      { headers: this.getAuthHeaders() }
    );
  }

  removeCartItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  clearCart(): Observable<any> {
    return this.http.delete(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Asegúrate de guardar el token aquí después del login
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  checkout(data: { address: string; notes?: string }): Observable<any> {
    return this.http.post(this.apiOrdersUrl, data, { headers: this.getAuthHeaders() });
  }

  // getUserShippingAddress(): Observable<any> {
  //   const token = localStorage.getItem('token'); // Recupera el token del localStorage
  //   const headers = { Authorization: `Bearer ${token}` }; // Agrega el encabezado Authorization

  //   return this.http.get(this.apiShippingUrl, { headers });
  // }

}