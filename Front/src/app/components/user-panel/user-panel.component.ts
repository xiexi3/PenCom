import { ToastService } from './../../services/toast.service';
import { UserService } from './../../services/user.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ShippingAddressModalComponent } from '../modals/shipping-address-modal/shipping-address-modal.component';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.css'
})
export class UserPanelComponent implements OnInit {

    // user: any;

  user: any = {}; // Información del usuario
  orders: any[] = []; // Lista de pedidos

  errorMessage: string = '';
  editingAddress: boolean = false; // Estado para editar la dirección de envío
  newAddress: string = ''; // Nueva dirección de envío
  shipping_address: string = ''; // Dirección de envío actual

  hovering: boolean = false; // Estado para mostrar el texto de hover
  editingPicture: boolean = false; // Estado para editar la foto de perfil
  selectedPicture: File | null = null; // Archivo seleccionado para la nueva foto
  loading: boolean = true;
  loadingOrders: boolean = true; 

  constructor(
    private dialog: MatDialog,
    private toastService: ToastService, 
    private orderService: OrderService, 
    private userService: UserService) {}

  ngOnInit(): void {
    this.loading = true;
    this.loadUserData();
    this.loadOrders();
  }

  loadUserData(): void {
    this.userService.getUser().subscribe({
      next: (response) => {
        this.user = response; // Carga los datos del usuario en la variable
        this.checkLoadingComplete();
      },
      error: (err) => {
        // console.error('Error al cargar los datos del usuario:', err);
        this.errorMessage = 'Hubo un error al cargar los datos del usuario.';
        this.checkLoadingComplete();
      }
    });
  }

  loadOrders(): void {
    this.loadingOrders = true; // Activa el estado de carga
    this.orderService.getOrders().subscribe({
      next: (response) => {
        this.orders = response.data; // Carga los pedidos en la variable
        this.checkLoadingComplete();
        this.loadingOrders = false; // Desactiva el estado de carga
      },
      error: (err) => {
        console.error('Error al cargar los pedidos:', err);
        this.errorMessage = 'Hubo un error al cargar el historial de pedidos.';
        this.checkLoadingComplete();
        this.loadingOrders = false; // Desactiva el estado de carga
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token'); // Elimina el token de sesión
    window.location.href = '/'; // Redirige al apartado de cuenta
  }

  onPictureSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedPicture = file;
    }
  }

  saveProfilePicture(): void {
    if (this.selectedPicture) {
      this.userService.updateProfilePicture(this.selectedPicture).subscribe({
        next: (response) => {
          this.user.profile_picture = response.profile_picture; // Actualiza la foto en el frontend
          this.editingPicture = false; // Salir del modo de edición
          this.selectedPicture = null; // Limpiar la selección
          this.toastService.show('Foto de perfil actualizada correctamente.');
          window.location.reload(); 
        },
        error: (err) => {
          // console.error('Error al actualizar la foto de perfil:', err);
          this.toastService.show('Hubo un error al actualizar la foto de perfil.');
        },
      });
    }
  }

  cancelProfilePicture(): void {
    this.editingPicture = false; // Salir del modo de edición
    this.selectedPicture = null; // Limpiar la selección
    this.hovering = false; // Desactivar el estado de hover
  }

  checkLoadingComplete(): void {
    if (this.user && this.orders) {
      this.loading = false; // Desactiva el indicador de carga
    }
  }

  openAddressModal(): void {
    const dialogRef = this.dialog.open(ShippingAddressModalComponent, {
      width: '400px',
      data: { address: this.user.shipping_address },
    });

    dialogRef.afterClosed().subscribe((updatedAddress) => {
      if (updatedAddress) {
        this.updateShippingAddress(updatedAddress);
      }
    });
  }

  updateShippingAddress(newAddress: string): void {
    this.userService.updateShippingAddress(newAddress).subscribe({
      next: (response) => {
        this.user.shipping_address = response.shipping_address; // Actualiza la dirección en el frontend
      },
      error: (err) => {
        // console.error('Error al actualizar la dirección de envío:', err);
      },
    });
  }

}
