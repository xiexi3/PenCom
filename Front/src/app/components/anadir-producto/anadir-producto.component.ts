import { Router } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-anadir-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './anadir-producto.component.html',
  styleUrls: ['./anadir-producto.component.css']
})

export class AnadirProductoComponent implements OnInit {
  productForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  characterCount: number = 0; 
  productId: number | null = null; 
  isEditing: boolean = false;
  

  constructor(
    private viewportScroller: ViewportScroller,
    private router: Router,
    private fb: FormBuilder, 
    private productService: ProductService) {
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      tipo: ['', [Validators.required]],
      imagen_url: ['', [Validators.required]]
    });

    interface NavigationState {
      producto?: any; // Define el tipo de producto según tus necesidades
    }

    // Cargar datos del producto si se está editando
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as NavigationState;
    const producto = state?.producto;

    if (producto) {
      this.productId = producto.id; // Guarda el ID del producto
      this.productForm.patchValue(producto); // Carga los datos en el formulario
      this.isEditing = true; // Cambia a modo edición
    }
  }

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  addProduct(): void {
    if (this.productForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }
  
    const token = localStorage.getItem('token'); // Recupera el token del localStorage
    const headers = { Authorization: `Bearer ${token}` }; // Agrega el encabezado Authorization
  
    const productData = {
      ...this.productForm.value,
      categoria_id: this.productForm.value.tipo === 'componente' ? 1 : 2 // Asigna categoria_id según el tipo
    };
  
    // Editar producto existente
    if (this.isEditing && this.productId) {
      this.productService.updateProduct(this.productId, productData, headers).subscribe({
        next: () => {
          this.successMessage = 'Producto editado exitosamente.';
          this.productForm.reset();
        },
        error: (err) => {
          this.errorMessage = 'Error al editar el producto: ' + (err.error.message || 'Error desconocido.');
        }
      });
    } else {
      // Añadir nuevo producto
      this.productService.addProduct(productData, headers).subscribe({
        next: () => {
          this.successMessage = 'Producto añadido exitosamente.';
          this.productForm.reset();
        },
        error: (err) => {
          this.errorMessage = 'Error al añadir el producto: ' + (err.error.message || 'Error desconocido.');
        }
      });
    }
  }

  // Método para manejar el numero de caracteres en el campo de descripción
  updateCharacterCount(): void {
    const descripcionControl = this.productForm.get('descripcion');
    this.characterCount = descripcionControl?.value?.length || 0; // Actualiza el contador de caracteres
  }

  editProduct(product: any): void {
    this.productForm.patchValue({
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      tipo: product.tipo,
      imagen_url: product.imagen_url
    });
  
    this.productId = product.id; 
  }
}