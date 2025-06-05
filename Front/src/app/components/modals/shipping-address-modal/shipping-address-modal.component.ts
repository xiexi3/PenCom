import { UserService } from './../../../services/user.service';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from '../../../services/cart.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-shipping-address-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './shipping-address-modal.component.html',
  styleUrls: ['./shipping-address-modal.component.css'],
})
// export class ShippingAddressModalComponent implements OnInit {
//   address: string = '';
//   city: string = '';
//   postalCode: string = '';
//   fullAddress: string = '';


//   constructor(
//     private cartService: CartService,
//     public dialogRef: MatDialogRef<ShippingAddressModalComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: { address: string }
//   ) {}

//   ngOnInit(): void {
//     this.getUserShippingAddress(); // Obtiene la dirección al inicializar el modal
//   }

//   onCancel(): void {
//     this.dialogRef.close();
//   }

//   // onConfirm(): void {
//   //   this.dialogRef.close(this.data.address);
//   // }

//   onConfirm(): void {
//     if (!this.address || this.address.trim() === '') {
//       alert('La dirección de envío no puede estar vacía.');
//       return;
//     }
  
//     this.dialogRef.close(this.address); // Devuelve la dirección actualizada al componente padre
//   }

//   saveAddress(): void {
//     if (!this.address || !this.city || !this.postalCode) {
//       alert('Por favor, completa todos los campos.');
//       return;
//     }

//     this.fullAddress = `${this.address}, ${this.city}, ${this.postalCode}`;
//     console.log('Dirección completa:', this.fullAddress);

//     // Aquí puedes enviar la dirección completa al backend o almacenarla en el estado de la aplicación.
//     this.dialogRef.close(this.address);
//   }

//   getUserShippingAddress(): void {
//     this.cartService.getUserShippingAddress().subscribe({
//       next: (response) => {
//         this.address = response.shipping_address || ''; // Asigna la dirección obtenida
//       },
//       error: (err) => {
//         console.error('Error al obtener la dirección de envío:', err);
//         alert('Hubo un error al obtener la dirección de envío.');
//       },
//     });
//   }

//   closeModal(): void {
//     // Lógica para cerrar el modal (puedes usar un servicio o cambiar una variable de estado).
//     console.log('Modal cerrado');
//   }
// }

export class ShippingAddressModalComponent implements OnInit {
  address: string = ''; // Dirección completa actual
  city: string = ''; // Ciudad actual
  postalCode: string = ''; // Código postal actual
  fullAddress: string = ''; // Dirección concatenada final
  isDarkMode: boolean = false; 

  constructor(
    public themeService: ThemeService,
    private userService: UserService,
    public dialogRef: MatDialogRef<ShippingAddressModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { address: string }
  ) {}

  ngOnInit(): void {
    this.getUserShippingAddress(); // Obtiene la dirección al inicializar el modal
    this.isDarkMode = this.themeService.isDarkModeEnabled();
  }

  /**
   * Obtiene la dirección actual del usuario y la separa en los campos.
   */
  getUserShippingAddress(): void {
    this.userService.getUserShippingAddress().subscribe({
      next: (response) => {
        this.fullAddress = response.shipping_address || ''; // Dirección completa
        const [address, city, postalCode] = this.fullAddress.split(',').map((part) => part.trim());
        this.address = address || '';
        this.city = city || '';
        this.postalCode = postalCode || '';
        this.updateFullAddress();
      },
      error: (err) => {
        console.error('Error al obtener la dirección de envío:', err);
        alert('Hubo un error al obtener la dirección de envío.');
      },
    });
  }

  /**
   * Guarda la dirección actualizada concatenando los valores de los inputs.
   */
  saveAddress(): void {
    if (!this.address || !this.city || !this.postalCode) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    this.fullAddress = `${this.address}, ${this.city}, ${this.postalCode}`;
    console.log('Dirección completa actualizada:', this.fullAddress);

    // Aquí puedes enviar la dirección actualizada al backend
    this.userService.updateShippingAddress(this.fullAddress).subscribe({
      next: () => {
        alert('Dirección actualizada correctamente.');
        this.dialogRef.close(this.fullAddress); // Cierra el modal y devuelve la dirección actualizada
      },
      error: (err) => {
        console.error('Error al actualizar la dirección de envío:', err);
        alert('Hubo un error al actualizar la dirección de envío.');
      },
    });
  }

  /**
   * Cierra el modal sin guardar cambios.
   */
  closeModal(): void {
    this.dialogRef.close();
  }

  updateFullAddress(): void {
    this.fullAddress = `${this.address}, ${this.city}, ${this.postalCode}`;
  }
}