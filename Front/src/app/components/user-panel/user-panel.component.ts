import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.css'
})
export class UserPanelComponent implements OnInit {

  user: any;

  ngOnInit(): void {
    // Aquí puedes cargar los datos del usuario desde el backend si es necesario
    this.user = {
      name: 'Usuario Ejemplo',
      email: 'usuario@ejemplo.com'
    };
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
