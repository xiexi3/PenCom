import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule, ViewportScroller  } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ShippingAddressModalComponent } from '../modals/shipping-address-modal/shipping-address-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private snackBar: MatSnackBar, private router: Router, private cartService: CartService, private viewportScroller: ViewportScroller, private dialog: MatDialog) {}

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

  // checkout(): void {
  //   const address = prompt('Por favor, ingresa tu dirección de envío:');
  //   if (!address) {
  //     alert('La dirección de envío es obligatoria.');
  //     return;
  //   }
  
  //   this.cartService.checkout({ address }).subscribe({
  //     next: (response) => {
  //       alert('Compra realizada con éxito.');
  //       this.cartItems = []; // Vacía el carrito en el frontend
  //       this.router.navigate(['/orders']); // Redirige a la página de pedidos
  //     },
  //     error: (err) => {
  //       console.error('Error al realizar la compra:', err);
  //       alert('Hubo un error al realizar la compra.');
  //     }
  //   });
  // }

  // checkout(): void {
  //   const dialogRef = this.dialog.open(ShippingAddressModalComponent, {
  //     width: '400px',
  //     data: { address: this.getUserShippingAddress() },
  //   });

  //   dialogRef.afterClosed().subscribe((address) => {
  //     if (!address) {
  //       alert('La dirección de envío es obligatoria.');
  //       return;
  //     }

  //     this.cartService.checkout({ address }).subscribe({
  //       next: (response) => {
  //         alert('Compra realizada con éxito.');
  //         this.cartItems = []; // Vacía el carrito en el frontend
  //         this.router.navigate(['/orders']); // Redirige a la página de pedidos
  //       },
  //       error: (err) => {
  //         console.error('Error al realizar la compra:', err);
  //         alert('Hubo un error al realizar la compra.');
  //       },
  //     });
  //   });
  // }

  // checkout(): void {
  //   const dialogRef = this.dialog.open(ShippingAddressModalComponent, {
  //     width: '400px',
  //     data: { address: this.getUserShippingAddress() },
  //   });

  //   dialogRef.afterClosed().subscribe((address) => {
  //     if (!address) {
  //       alert('La dirección de envío es obligatoria.');
  //       return;
  //     }

  //     this.cartService.checkout({ address }).subscribe({
  //       next: (response) => {
  //         alert('Compra realizada con éxito.');
  //         this.cartItems = []; // Vacía el carrito en el frontend
  //         this.router.navigate(['/orders']); // Redirige a la página de pedidos
  //       },
  //       error: (err) => {
  //         console.error('Error al realizar la compra:', err);
  //         alert('Hubo un error al realizar la compra.');
  //       },
  //     });
  //   });
  // }

  checkout(): void {
    const dialogRef = this.dialog.open(ShippingAddressModalComponent, {
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe((address) => {
      if (!address) {
        // alert('La dirección de envío es obligatoria.');
        this.snackBar.open('La dirección de envío es obligatoria.', 'Cerrar', {
          duration: 3000, // Duración en milisegundos
        });
        return;
      }
  
      this.cartService.checkout({ address }).subscribe({
        next: (response) => {
          // alert('Compra realizada con éxito.');
          this.snackBar.open('Compra realizada con éxito.', 'Cerrar', {
            duration: 3000,
          });
          this.cartItems = []; // Vacía el carrito en el frontend
          this.router.navigate(['/orders']); // Redirige a la página de pedidos
        },
        error: (err) => {
          console.error('Error al realizar la compra:', err);
          // alert('Hubo un error al realizar la compra.');
          this.snackBar.open('Hubo un error al realizar la compra.', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    });
  }

  // getUserShippingAddress(): void {
  //   this.cartService.getUserShippingAddress().subscribe({
  //     next: (response) => {
  //       this.openShippingAddressModal(response.shipping_address); // Pasa la dirección al modal
  //     },
  //     error: (err) => {
  //       console.error('Error al obtener la dirección de envío:', err);
  //       alert('Hubo un error al obtener la dirección de envío.');
  //     },
  //   });
  // }

  // getUserShippingAddress(): string {
  //   let shippingAddress = ''; // Variable para almacenar la dirección
  
  //   this.cartService.getUserShippingAddress().subscribe({
  //     next: (response) => {
  //       shippingAddress = response.shipping_address; // Asigna la dirección obtenida desde el backend
  //     },
  //     error: (err) => {
  //       console.error('Error al obtener la dirección de envío:', err);
  //       alert('Hubo un error al obtener la dirección de envío.');
  //     },
  //   });
  
  //   return shippingAddress; // Devuelve la dirección obtenida
  // }

  // openShippingAddressModal(address: string): void {
  //   const dialogRef = this.dialog.open(ShippingAddressModalComponent, {
  //     width: '400px',
  //     data: { address: address || '' }, // Pasa la dirección actual o una cadena vacía
  //   });
  
  //   dialogRef.afterClosed().subscribe((updatedAddress) => {
  //     if (!updatedAddress) {
  //       alert('La dirección de envío es obligatoria.');
  //       return;
  //     }
  
  //     this.cartService.checkout({ address: updatedAddress }).subscribe({
  //       next: (response) => {
  //         alert('Compra realizada con éxito.');
  //         this.cartItems = []; // Vacía el carrito en el frontend
  //         this.router.navigate(['/orders']); // Redirige a la página de pedidos
  //       },
  //       error: (err) => {
  //         console.error('Error al realizar la compra:', err);
  //         alert('Hubo un error al realizar la compra.');
  //       },
  //     });
  //   });
  // }
}