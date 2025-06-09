import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css'],
})
export class DetallesComponent implements OnInit {
  producto: any; // Para almacenar el producto que se seleccionó
  id: number = 0; // ID del producto
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService,
    private toastService: ToastService,
    private viewportScroller: ViewportScroller,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]); // Para que al cargar la página se vaya al inicio del scroll
    
    if (this.authService.isAuthenticated()) {
      this.userService.getUserDetails().subscribe({
        next: (response) => {
          this.isAdmin = response.data.role === 'admin'; // Valida el rol directamente desde el backend
        },
        error: (err) => {
          // console.error('Error al obtener detalles del usuario:', err);
          this.isAdmin = false; // En caso de error, asume que no es administrador
        },
      });
    }
    
    // Obtener el 'id' desde la URL
    this.id = +this.route.snapshot.paramMap.get('id')!;

    // Llamar al servicio para obtener el producto por ID
    this.productService.getProductById(this.id).subscribe(
      (data) => {
        this.producto = data;
      },
      (error) => {
        // console.error('Hubo un error al obtener el producto', error);
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

  addToCart(productId: number): void {
    if (!this.authService.isAuthenticated()) {
      this.toastService.show('Debes iniciar sesión para añadir productos al carrito.');
      this.router.navigate(['/cuenta']);
      return;
    }

    this.cartService.addToCart(productId).subscribe(() => {
      this.toastService.show('Producto añadido al carrito.');    
    });
  }

  editProduct(producto: any): void {
    if (!producto) {
      console.error('Producto no encontrado:', producto);
      return;
    }
  
    // Redirige al formulario de añadir producto con los datos del producto seleccionado
    this.router.navigate(['/producto'], {
      state: { producto }
    });
  }

  deleteProduct(productId: number): void {
    if (!productId) {
      console.error('ID del producto no válido:', productId);
      return;
    }
  
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.toastService.show('Producto eliminado exitosamente.');
          this.router.navigate(['/home']); // Redirige al usuario al home después de eliminar
        },
        error: (err) => {
          // console.error('Error al eliminar el producto:', err);
          this.toastService.show('Hubo un error al eliminar el producto.');
        },
      });
    }
  }
}
