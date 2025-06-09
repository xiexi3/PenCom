import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule, ViewportScroller  } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ShippingAddressModalComponent } from '../modals/shipping-address-modal/shipping-address-modal.component';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router, 
    private cartService: CartService, 
    private viewportScroller: ViewportScroller, 
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCart();

    this.viewportScroller.scrollToPosition([0, 0]);
  }

  loadCart(): void {
    if (this.authService.isAuthenticated()) {
      this.cartService.getCartItems().subscribe((items) => {
        this.cartItems = items;
      });
    }
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
    this.toastService.show('Carrito vaciado con éxito.');
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.precio * item.quantity), 0);
  }

  checkout(): void {
    const dialogRef = this.dialog.open(ShippingAddressModalComponent, {
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe((address) => {
      if (!address) {
        
        this.toastService.show('La dirección de envío es obligatoria.');
        return;
      }
  
      this.cartService.checkout({ address }).subscribe({
        next: () => {
          this.toastService.show('Compra realizada con éxito.');
          this.cartItems = []; // Vacía el carrito en el frontend
            this.router.navigate(['/user-panel']); // Redirige a la página de pedidos

        },
        error: (err) => {
          // console.error('Error al realizar la compra:', err);
          this.toastService.show('Hubo un error al realizar la compra.');
        },
      });
    });
  }
}