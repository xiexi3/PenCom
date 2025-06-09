import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ToastService } from '../../services/toast.service';

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
  marcas: string[] = ['ASUS', 'MSI', 'Medion', 'Acer', 'HP']; // Marcas disponibles (hardcodeadas)
  marcaSeleccionada: string = ''; // Marca seleccionada para filtrar
  precioMin: number | null = null; // Precio mínimo para filtrar
  precioMax: number | null = null; // Precio máximo para filtrar
  isAdmin: boolean = false; 

  constructor(
    private router: Router, 
    private productService: ProductService, 
    private viewportScroller: ViewportScroller, 
    private authService: AuthService,
    private cartService: CartService, 
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]); // Para que al cargar la página se vaya al inicio del scroll

    if (this.authService.isAuthenticated()) {
      
      this.authService.getUserDetails().subscribe({
        next: (response) => {
          this.isAdmin = response.data.role === 'admin'; // Valida el rol directamente desde el backend
        },
        error: (err) => {
          // console.error('Error al obtener detalles del usuario:', err);
          this.isAdmin = false; // En caso de error, asume que no es administrador
        },
      });
    }
      
    // Obtenemos los ordenadores
    this.productService.getOrdenadores().subscribe(
      (data) => {
        this.productos = data; 
        this.productosFiltrados = data; 
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

  addProduct(): void {
    this.router.navigate(['/producto']);
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
          // Actualiza la lista de productos después de eliminar
          this.productos = this.productos.filter((producto) => producto.id !== productId);
          this.productosFiltrados = this.productosFiltrados.filter((producto) => producto.id !== productId);
        },
        error: (err) => {
          console.error('Error al eliminar el producto:', err);
          this.toastService.show('Hubo un error al eliminar el producto.');
        }
      });
    }
  }
}