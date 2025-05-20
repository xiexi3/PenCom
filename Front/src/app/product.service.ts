import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
  providedIn: 'root'
})

export class ProductService {
  private apiUrl = 'http://localhost:8000/api/productos'; // URL de tu API de Laravel

  constructor(private http: HttpClient) {}

  // Función que retorna un observable con tdos los productos
  // getProductos(): Observable<Producto[]> {
  //   return this.http.get<Producto[]>(this.apiUrl);
  // }

  // Fetch de los componentes específicamente
  getComponentes(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl).pipe(
      map((productos) => productos.filter(producto => producto.categoria.nombre === 'Componentes'))
    );
  }

  // Fetch de los ordenadores específicamente
  getOrdenadores(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl).pipe(
      map((productos) => productos.filter(producto => producto.categoria.nombre === 'Ordenadores'))
    );
  }

  // Fetch de los productos por id
  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

}
