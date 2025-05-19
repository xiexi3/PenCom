import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule], // <-- IMPORTANTE
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginFormVisible: boolean = true;
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage = '';

  constructor(private authService: AuthService, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]); // Para que al cargar la página se vaya al inicio del scroll

  }

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

  // Cambia la visibilidad de los formularios
  toggleForms(isLoginForm: boolean) {
    this.loginFormVisible = isLoginForm;
  
    // Cambia el título de la página
    document.title = isLoginForm ? 'Iniciar sesión' : 'Crear cuenta';
  
    // Ajusta las alturas dinámicamente
    const sectLogo = document.querySelector('.section-logo') as HTMLElement;
    const loginForm = document.querySelector('.section-login') as HTMLElement;
    const signupForm = document.querySelector('.section-signup') as HTMLElement;
    const greyline = document.querySelector('.greyline') as HTMLElement;
  
    if (isLoginForm) {
      loginForm.style.display = 'block';
      signupForm.style.display = 'none';
      sectLogo.style.height = '42.5em';
      greyline.style.height = '611px';
    } else {
      loginForm.style.display = 'none';
      signupForm.style.display = 'block';
      sectLogo.style.height = '56.7em';
      greyline.style.height = '730px';

      // Desplaza el botón de registro a la vista
      setTimeout(() => {
        const signupButton = document.getElementById('signupButton');
        if (signupButton) {
          signupButton.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
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
