import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

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

  constructor(private router: Router, private productService: ProductService, private viewportScroller: ViewportScroller, private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]); // Para que al cargar la página se vaya al inicio del scroll

    this.authService.getUserDetails().subscribe({
      next: (response) => {
        this.isAdmin = response.data.role === 'admin'; // Valida el rol directamente desde el backend
      },
      error: (err) => {
        console.error('Error al obtener detalles del usuario:', err);
        this.isAdmin = false; // En caso de error, asume que no es administrador
      },
    });

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
    this.cartService.addToCart(productId).subscribe(() => {
      alert('Producto añadido al carrito');
    });
  }

  addProduct(): void {
    this.router.navigate(['/producto']);
  }

  // editProduct(productId: number): void {
  //   console.log('Editar producto:', productId);
  // }

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
          alert('Producto eliminado exitosamente.');
          // Actualiza la lista de productos después de eliminar
          this.productos = this.productos.filter((producto) => producto.id !== productId);
          this.productosFiltrados = this.productosFiltrados.filter((producto) => producto.id !== productId);
        },
        error: (err) => {
          console.error('Error al eliminar el producto:', err);
          alert('Hubo un error al eliminar el producto.');
        }
      });
    }
  }
}