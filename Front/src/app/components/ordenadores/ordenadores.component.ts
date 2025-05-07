import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from './../../product.service'; // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ordenadores',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './ordenadores.component.html',
  styleUrl: './ordenadores.component.css'
})
export class OrdenadoresComponent implements OnInit {
  productos: any[] = []; // Array para almacenar los productos

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getOrdenadores().subscribe(
      (data) => {
        this.productos = data; // Asigna los productos a la variable
      },
      (error) => {
        console.error('Hubo un error al obtener los productos', error);
      }
    );
  }
}
