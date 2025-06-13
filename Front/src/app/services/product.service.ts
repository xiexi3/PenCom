import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  tipo: string;
  imagen_url: string;
  categoria: Categoria;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/productos'; // URL de tu API de Laravel

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los productos.
   * @returns Observable<Producto[]> - Observable con un array de productos.
   */
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  /**
   * Obtiene los componentes.
   * @returns Observable<Producto[]> - Observable con un array de productos filtrados por la categoría 'Componentes'.
   */
  getComponentes(): Observable<Producto[]> {
    return this.http
      .get<Producto[]>(this.apiUrl)
      .pipe(
        map((productos) =>
          productos.filter(
            (producto) => producto.categoria.nombre === 'Componentes'
          )
        )
      );
  }

  /**
   * Obtiene los ordenadores.
   * @returns Observable<Producto[]> - Observable con un array de productos filtrados por la categoría 'Ordenadores'.
   */
  getOrdenadores(): Observable<Producto[]> {
    return this.http
      .get<Producto[]>(this.apiUrl)
      .pipe(
        map((productos) =>
          productos.filter(
            (producto) => producto.categoria.nombre === 'Ordenadores'
          )
        )
      );
  }

  /**
   * Obtiene un producto por su ID.
   * @param id - ID del producto a obtener.
   * @returns Observable<Producto> - Observable con el producto encontrado.
   */
  getProductById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  /**
   * Añade un nuevo producto.
   * @param product - Objeto con la información del producto a añadir.
   * @returns Observable<any> - Observable con la respuesta del servidor.
   */
  addProduct(product: any, headers: any): Observable<any> {
    return this.http.post(this.apiUrl, product, { headers });
  }

  /**
   * Actualiza un producto existente.
   * @param productId - ID del producto a actualizar.
   * @param product - Objeto con la información del producto a actualizar.
   * @returns Observable<any> - Observable con la respuesta del servidor.
   */
  updateProduct(
    productId: number,
    product: any,
    headers: any
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productId}`, product, { headers });
  }

  /**
   * Elimina un producto.
   * @param productId - ID del producto a eliminar.
   * @returns Observable<any> - Observable con la respuesta del servidor.
   */
  deleteProduct(productId: number): Observable<any> {
    const token = localStorage.getItem('token'); // Recupera el token del localStorage
    const headers = { Authorization: `Bearer ${token}` }; // Agrega el encabezado Authorization

    return this.http.delete(`${this.apiUrl}/${productId}`, { headers });
  }
}
