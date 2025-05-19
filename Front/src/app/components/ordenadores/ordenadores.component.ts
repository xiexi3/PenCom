import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from './../../product.service'; // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ordenadores',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './ordenadores.component.html',
  styleUrl: './ordenadores.component.css'
})
export class OrdenadoresComponent implements OnInit {
  productos: any[] = []; // Array para almacenar los productos
  productosFiltrados: any[] = []; // Lista filtrada de productos
  textoBusqueda: string = ''; // Texto ingresado en la barra de búsqueda

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getOrdenadores().subscribe(
      (data) => {
        this.productos = data; // Asigna los productos a la variable
        this.productosFiltrados = data; // Asigna los productos a la variable
      },
      (error) => {
        console.error('Hubo un error al obtener los productos', error);
      }
    );
  }

  // Método para filtrar los productos
  filtrarProductos(): void {
    const texto = this.textoBusqueda.toLowerCase();
    this.productosFiltrados = this.productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(texto)
    );
  }
}