import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-shipping-address-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './shipping-address-modal.component.html',
  styleUrls: ['./shipping-address-modal.component.css'],
})
export class ShippingAddressModalComponent implements OnInit {
  address: string = ''; 

  constructor(
    private cartService: CartService,
    public dialogRef: MatDialogRef<ShippingAddressModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { address: string }
  ) {}

  ngOnInit(): void {
    this.getUserShippingAddress(); // Obtiene la dirección al inicializar el modal
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  // onConfirm(): void {
  //   this.dialogRef.close(this.data.address);
  // }

  onConfirm(): void {
    if (!this.address || this.address.trim() === '') {
      alert('La dirección de envío no puede estar vacía.');
      return;
    }
  
    this.dialogRef.close(this.address); // Devuelve la dirección actualizada al componente padre
  }

  getUserShippingAddress(): void {
    this.cartService.getUserShippingAddress().subscribe({
      next: (response) => {
        this.address = response.shipping_address || ''; // Asigna la dirección obtenida
      },
      error: (err) => {
        console.error('Error al obtener la dirección de envío:', err);
        alert('Hubo un error al obtener la dirección de envío.');
      },
    });
  }
}