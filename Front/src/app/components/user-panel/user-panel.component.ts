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
    // Aquí puedes cargar los datos del usuario desde el backend si es necesario
    // this.user = {
    //   name: 'Usuario Ejemplo',
    //   email: 'usuario@ejemplo.com'
    // };
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
        console.error('Error al cargar los datos del usuario:', err);
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
    this.toastService.show('Has cerrado sesión correctamente.'); // Muestra un mensaje de éxito
  }

  // constructor(private router: Router) {}

  // ngOnInit(): void {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     // Redirigir al login si no hay token
  //     this.router.navigate(['/']);
  //   }
  // }

  // updateShippingAddress(newAddress: string): void {
  //   this.userService.updateShippingAddress(newAddress).subscribe({
  //     next: (response) => {
  //       this.user.shipping_address = response.shipping_address; // Actualiza la dirección en el frontend
  //       // alert('Dirección de envío actualizada correctamente.');
  //       this.toastService.show('Dirección de envío actualizada correctamente.');
  //     },
  //     error: (err) => {
  //       console.error('Error al actualizar la dirección de envío:', err);
  //       // alert('Hubo un error al actualizar la dirección de envío.');
  //       this.toastService.show('Hubo un error al actualizar la dirección de envío.');
  //     }
  //   });
  // }

  // uploadProfilePicture(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.userService.updateProfilePicture(file).subscribe({
  //       next: (response) => {
  //         this.user.profile_picture = `http://localhost:8000/storage/profile_pictures/${response.profile_picture}`; // Actualiza la foto en el frontend
  //         alert('Foto de perfil actualizada correctamente.');
  //       },
  //       error: (err) => {
  //         console.error('Error al actualizar la foto de perfil:', err);
  //         alert('Hubo un error al actualizar la foto de perfil.');
  //       }
  //     });
  //   }
  // }

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
          // alert('Foto de perfil actualizada correctamente.');
          this.toastService.show('Foto de perfil actualizada correctamente.');
          window.location.reload(); 
        },
        error: (err) => {
          console.error('Error al actualizar la foto de perfil:', err);
          // alert('Hubo un error al actualizar la foto de perfil.');
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

  // getOrderTotal(order: any): number {
  //   return order.items.reduce((total: number, item: any) => total + item.subtotal, 0);
  // }

  // getOrderTotal(order: any): number {
  //   if (!order.items || order.items.length === 0) {
  //     return 0; // Si no hay productos, el total es 0
  //   }
  
  //   return order.items.reduce((total: number, item: any) => {
  //     return total + (item.quantity * item.unit_price); // Calcula el subtotal de cada producto
  //   }, 0); // Inicializa el total en 0
  // }

  addNewAddress(): void {
    this.editingAddress = true; // Cambia al modo de edición para añadir una nueva dirección
    this.newAddress = ''; // Limpia el campo de entrada
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
        this.toastService.show('Dirección de envío actualizada correctamente.');
      },
      error: (err) => {
        console.error('Error al actualizar la dirección de envío:', err);
        this.toastService.show('Hubo un error al actualizar la dirección de envío.');
      },
    });
  }

}
