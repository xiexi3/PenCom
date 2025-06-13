import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  private apiUrl = 'http://localhost:8080/api/cart';
  private apiOrdersUrl = 'http://localhost:8080/api/orders';

  constructor(private authService: AuthService, private http: HttpClient) {}

  /**
   * Obtiene los artículos del carrito de compras.
   * @returns Observable<any[]> - Un observable que emite un array de artículos del carrito.
   */
  getCartItems(): Observable<any[]> {
    return this.http
      .get<any[]>(this.apiUrl, { headers: this.authService.getAuthHeaders() })
      .pipe(
        map((response) => {
          // Aplanar el array anidado
          return response.flat();
        })
      );
  }

  /**
   * Obtiene un artículo del carrito por su ID.
   * @param id - El ID del artículo del carrito.
   * @returns Observable<any> - Un observable que emite el artículo del carrito.
   */
  addToCart(productId: number, quantity: number = 1): Observable<any> {
    return this.http.post(
      this.apiUrl,
      { product_id: productId, quantity },
      { headers: this.authService.getAuthHeaders() }
    );
  }

  /**
   * Actualiza la cantidad de un item en el carrito.
   * @param id - ID del item del carrito a actualizar.
   * @param quantity - Nueva cantidad del item.
   * @returns Observable<any> - Observable con la respuesta del servidor.
   */
  updateCartItem(id: number, quantity: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      { quantity },
      { headers: this.authService.getAuthHeaders() }
    );
  }

  /**
   * Elimina un item del carrito.
   * @param id - ID del item del carrito a eliminar.
   * @returns Observable<any> - Observable con la respuesta del servidor.
   */
  removeCartItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  /**
   * Limpia el carrito del usuario (elimina todos los items).
   * @returns Observable<any> - Observable con la respuesta del servidor.
   */
  clearCart(): Observable<any> {
    return this.http.delete(this.apiUrl, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  /**
   * Realiza el checkout del carrito (crea una orden).
   * @param data - Objeto con la dirección de envío y notas opcionales.
   * @returns Observable<any> - Observable con la respuesta del servidor.
   */
  checkout(data: { address: string; notes?: string }): Observable<any> {
    return this.http.post(this.apiOrdersUrl, data, {
      headers: this.authService.getAuthHeaders(),
    });
  }
}
