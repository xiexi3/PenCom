import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from './../../product.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-componentes',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './componentes.component.html',
  styleUrl: './componentes.component.css'
})
export class ComponentesComponent implements OnInit {
  productos: any[] = []; // Array para almacenar los productos

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getComponentes().subscribe(
      (data) => {
        this.productos = data; // Asigna los productos a la variable
      },
      (error) => {
        console.error('Hubo un error al obtener los productos', error);
      }
    );
  }

}