import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule, ViewportScroller  } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private router: Router, private cartService: CartService, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.loadCart();

    this.viewportScroller.scrollToPosition([0, 0]);
  }

  loadCart(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
  }

  updateQuantity(itemId: number, quantity: number): void {
    this.cartService.updateCartItem(itemId, quantity).subscribe(() => {
      this.loadCart();
    });
  }

  removeItem(itemId: number): void {
    this.cartService.removeCartItem(itemId).subscribe(() => {
      this.loadCart();
    });
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe(() => {
      this.cartItems = [];
    });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.precio * item.quantity), 0);
  }

  checkout(): void {
    const address = prompt('Por favor, ingresa tu dirección de envío:');
    if (!address) {
      alert('La dirección de envío es obligatoria.');
      return;
    }
  
    this.cartService.checkout({ address }).subscribe({
      next: (response) => {
        alert('Compra realizada con éxito.');
        this.cartItems = []; // Vacía el carrito en el frontend
        this.router.navigate(['/orders']); // Redirige a la página de pedidos
      },
      error: (err) => {
        console.error('Error al realizar la compra:', err);
        alert('Hubo un error al realizar la compra.');
      }
    });
  }
}