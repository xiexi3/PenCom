import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from './../../product.service'; // Asegúrate de que la ruta sea correcta
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-componentes',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './componentes.component.html',
  styleUrl: './componentes.component.css'
})
export class ComponentesComponent implements OnInit {
  productos: any[] = []; // Array para almacenar los productos
  productosFiltrados: any[] = []; // Lista filtrada de productos
  textoBusqueda: string = ''; // Texto ingresado en la barra de búsqueda
  marcas: string[] = ['AMD', 'MSI', 'Corsair', 'WD', 'Tempest']; // Marcas disponibles (hardcodeadas)
  marcaSeleccionada: string = ''; // Marca seleccionada para filtrar
  precioMin: number | null = null; // Precio mínimo para filtrar
  precioMax: number | null = null; // Precio máximo para filtrar

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getComponentes().subscribe(
      (data) => {
        this.productos = data;
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
      const marca = this.marcaSeleccionada.toLowerCase();
  
      this.productosFiltrados = this.productos.filter((producto) => {
        const coincideTexto = producto.nombre.toLowerCase().includes(texto);
        const coincideMarca = marca ? producto.nombre.toLowerCase().includes(marca) : true;
        const coincidePrecioMin = this.precioMin !== null ? producto.precio >= this.precioMin : true;
        const coincidePrecioMax = this.precioMax !== null ? producto.precio <= this.precioMax : true;
  
        return coincideTexto && coincideMarca && coincidePrecioMin && coincidePrecioMax;
      });
    }

}