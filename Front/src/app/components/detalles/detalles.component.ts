import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css'],
})
export class DetallesComponent implements OnInit {
  producto: any; // Para almacenar el producto que se seleccionó
  id: number = 0; // ID del producto

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Obtener el 'id' desde la URL
    this.id = +this.route.snapshot.paramMap.get('id')!;

    // Llamar al servicio para obtener el producto por ID
    this.productService.getProductoById(this.id).subscribe(
      (data) => {
        this.producto = data;
      },
      (error) => {
        console.error('Hubo un error al obtener el producto', error);
      }
    );
  }

  getImagePath(): string {
    if (!this.producto) {
      return '';
    }

    // Cambia la ruta según el tipo del producto
    const basePath = this.producto.tipo === 'ordenador' ? '/assets/images/ordenadores/' : '/assets/images/componentes/';
    return `${basePath}${this.producto.imagen_url}`;
  }
}
