import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onSignup() {
    // Implement your signup logic here
    console.log('Name:', this.name);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // Add authentication logic and navigate to the next page upon successful signup
    this.authService.signup(this.name, this.email, this.password).subscribe({
      next: (id) => {
        console.log('Registro exitoso. Id de usuario:', id);
      },
      error: (err) => {
        this.errorMessage = 'Error al registrarse: ' + err.message;
        console.error(err);
      },
    });
  }
}
