import { ToastService } from '../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.css',
})

export class CuentaComponent implements OnInit {
  loginFormVisible: boolean = true;
  name: string = '';
  email: string = '';
  password: string = '';
  passwordTwo: string = '';
  passwordMismatch: boolean = false; // Indica si las contraseñas no coinciden
  errorMessage = '';

  // Estados para mostrar/ocultar contraseñas
  showPassword: boolean = false;
  showPassword2: boolean = false;
  showPassword3: boolean = false;

  constructor(
    public toastService: ToastService,
    public themeService: ThemeService,
    private router: Router,
    private authService: AuthService,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]); // Para que al cargar la página se vaya al inicio del scroll

    const token = localStorage.getItem('token'); // Verifica si hay un token de sesión

    if (token) {
      // Si hay un token, redirige al panel de usuario
      this.router.navigate(['/user-panel']);
    }
  }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        // console.log('Login exitoso. Token:', token);
        this.toastService.show('Inicio de sesion exitoso.');
        this.router.navigate(['/user-panel']);
      },
      error: (err) => {
        // console.error(err);
        if (err.status === 404 && err.error?.error === 'El correo no existe.') {
          this.toastService.show('El correo ingresado no está registrado.');
        } else if (err.status === 401) {
          this.toastService.show('La contraseña es incorrecta.');
        } else if (err.error?.message) {
          // Si el backend devuelve un mensaje genérico
          this.toastService.show(err.error.message);
        } else {
          // Mensaje genérico para otros errores
          this.toastService.show(
            'Hubo un error al iniciar sesión. Inténtelo de nuevo más tarde.'
          );
        }
      },
    });
  }

  onSignup() {
    // Verifica si las contraseñas coinciden
    if (this.password !== this.passwordTwo) {
      this.passwordMismatch = true; // Activa el error de contraseñas
      return; // Detén el proceso de registro
    }

    this.passwordMismatch = false; // Resetea el error si las contraseñas coinciden

    // Add authentication logic and navigate to the next page upon successful signup
    this.authService.signup(this.name, this.email, this.password).subscribe({
      next: () => {
        // console.log('Registro exitoso. Id de usuario:', id);

        this.toastService.show('Registro exitoso, ya puede iniciar sesión.');

        // Simula un clic en el botón de "Iniciar Sesión"
        const loginButton = document.querySelector(
          '.btn-login'
        ) as HTMLButtonElement;
        if (loginButton) {
          loginButton.click();
        }
        // this.router.navigate(['/user-panel']);
      },
      error: (err) => {
        if (err.error?.errors) {
          // Muestra el primer error devuelto por el backend
          const firstError = Object.values(err.error.errors)[0] as string;
          this.toastService.show(firstError);
        } else {
          this.toastService.show(
            'Hubo un error al registrarse. Inténtelo de nuevo más tarde.'
          );
        }
        // this.toastService.show('Error al registrarse.');
        // console.error('Error al registrarse:', err);
      },
    });
  }

  // Alterna la visibilidad de los formularios
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
      // loginForm.style.display = 'block';
      signupForm.style.display = 'none';
      sectLogo.style.height = '42.5em';
      greyline.style.height = '611px';
    } else {
      loginForm.style.display = 'none';
      // signupForm.style.display = 'block';
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

  togglePassword(
    field: 'showPassword' | 'showPassword2' | 'showPassword3'
  ): void {
    this[field] = !this[field]; // Cambia el estado del campo correspondiente
  }

  isEmailValid(): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(this.email);
  }

  goToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
