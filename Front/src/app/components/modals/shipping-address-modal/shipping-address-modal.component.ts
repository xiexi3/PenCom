import { UserService } from './../../../services/user.service';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from '../../../services/cart.service';
import { ThemeService } from '../../../services/theme.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-shipping-address-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './shipping-address-modal.component.html',
  styleUrls: ['./shipping-address-modal.component.css'],
})

export class ShippingAddressModalComponent implements OnInit {
  address: string = ''; // Dirección completa actual
  city: string = ''; // Ciudad actual
  postalCode: string = ''; // Código postal actual
  fullAddress: string = ''; // Dirección concatenada final
  isDarkMode: boolean = false; 
  loadingAddress: boolean = true;

  constructor(
    private toastService: ToastService,
    public themeService: ThemeService,
    private userService: UserService,
    public dialogRef: MatDialogRef<ShippingAddressModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { address: string }
  ) {}

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkModeEnabled();
    this.getUserShippingAddress(); // Obtiene la dirección al inicializar el modal
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
        this.loadingAddress = false;
      },
      error: (err) => {
        // console.error('Error al obtener la dirección de envío:', err);
        this.toastService.show('Error al obtener la dirección de envío.');
        this.loadingAddress = false;
      },
    });
  }

  /**
   * Guarda la dirección actualizada concatenando los valores de los inputs.
   */
  saveAddress(): void {
    if (!this.address || !this.city || !this.postalCode) {
      this.toastService.show('Por favor, completa todos los campos.');
      return;
    }

    this.fullAddress = `${this.address}, ${this.city}, ${this.postalCode}`;
    // console.log('Dirección completa actualizada:', this.fullAddress);

    // Aquí puedes enviar la dirección actualizada al backend
    this.userService.updateShippingAddress(this.fullAddress).subscribe({
      next: () => {
        this.toastService.show('Dirección actualizada correctamente.');
        this.dialogRef.close(this.fullAddress); // Cierra el modal y devuelve la dirección actualizada
      },
      error: (err) => {
        // console.error('Error al actualizar la dirección de envío:', err);
        this.toastService.show('Hubo un error al actualizar la dirección de envío.');
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