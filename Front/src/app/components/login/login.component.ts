import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,  // <-- ESTA línea si quieres standalone
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule], // <-- IMPORTANTE
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    // Implement your login logic here
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // Add authentication logic and navigate to the next page upon successful login
    this.authService.login(this.email, this.password).subscribe({
      next: (token) => {
        console.log('Login exitoso. Token:', token);
      },
      error: (err) => {
        this.errorMessage = 'Error al iniciar sesión: ' + err.message;
        console.error(err);
      },
    });
  }

  // login() {
  //   this.authService.login(this.username, this.password).subscribe({
  //     next: (token) => {
  //       console.log('Login exitoso. Token:', token);
  //     },
  //     error: (err) => {
  //       this.errorMessage = 'Error al iniciar sesión: ' + err.message;
  //       console.error(err);
  //     },
  //   });
  // }

  // loginForm!: FormGroup;
  // errorMessage = '';

  // constructor(
  //   private fb: FormBuilder,
  //   private authService: AuthService,
  //   private router: Router
  // ) {
  //   this.loginForm = this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', Validators.required],
  //   });
  // }

  // onSubmit(): void {
  //   const { email, password } = this.loginForm.value;
  //   if (email && password) {
  //     this.authService.login(email, password).subscribe({
  //       next: (token) => {
  //         console.log('Token recibido:', token);
  //         this.router.navigate(['/dashboard']);
  //       },
  //       error: (error) => {
  //         console.error(error);
  //         this.errorMessage = 'Credenciales incorrectas. Intenta de nuevo.';
  //       }
  //     });
  //   }
  // }
}
