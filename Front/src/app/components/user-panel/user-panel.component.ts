import { UserService } from './../../services/user.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.css'
})
export class UserPanelComponent implements OnInit {

    // user: any;

  user: any = {}; // Información del usuario
  orders: any[] = []; // Lista de pedidos
  errorMessage: string = '';

  constructor(private orderService: OrderService, private userService: UserService) {}

  ngOnInit(): void {
    // Aquí puedes cargar los datos del usuario desde el backend si es necesario
    // this.user = {
    //   name: 'Usuario Ejemplo',
    //   email: 'usuario@ejemplo.com'
    // };
    this.loadUserData();
    this.loadOrders();
  }

  loadUserData(): void {
    this.userService.getUser().subscribe({
      next: (response) => {
        this.user = response; // Carga los datos del usuario en la variable
      },
      error: (err) => {
        console.error('Error al cargar los datos del usuario:', err);
        this.errorMessage = 'Hubo un error al cargar los datos del usuario.';
      }
    });
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (response) => {
        this.orders = response.data; // Carga los pedidos en la variable
      },
      error: (err) => {
        console.error('Error al cargar los pedidos:', err);
        this.errorMessage = 'Hubo un error al cargar el historial de pedidos.';
      }
    });
  }


  logout(): void {
    localStorage.removeItem('token'); // Elimina el token de sesión
    window.location.href = '/cuenta'; // Redirige al apartado de cuenta
  }

  // constructor(private router: Router) {}

  // ngOnInit(): void {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     // Redirigir al login si no hay token
  //     this.router.navigate(['/']);
  //   }
  // }
}
