import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';

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
  passwordTwo: string = '';
  errorMessage = '';

   // Estados para mostrar/ocultar contraseñas
   showPassword: boolean = false; // Para el primer campo de contraseña
   showPassword2: boolean = false; // Para el segundo campo de contraseña
   showPassword3: boolean = false; // Para el tercer campo de contraseña 

   passwordMismatch: boolean = false; // Indica si las contraseñas no coinciden

  constructor(public themeService: ThemeService, private router: Router, private authService: AuthService, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]); // Para que al cargar la página se vaya al inicio del scroll

    const token = localStorage.getItem('token'); // Verifica si hay un token de sesión

    if (token) {
      // Si hay un token, redirige al panel de usuario
      this.router.navigate(['/user-panel']);
    }
  }

  onLogin() {
    // Implement your login logic here
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // Add authentication logic and navigate to the next page upon successful login
    this.authService.login(this.email, this.password).subscribe({
      next: (token) => {
        console.log('Login exitoso. Token:', token);

      // Redirige al panel de usuario
      this.router.navigate(['/user-panel']);
      },
      error: (err) => {
        this.errorMessage = 'Error al iniciar sesión: ' + err.message;
        console.error(err);
      },
    });
  }

  onSignup() {
    // Implement your signup logic here
    // console.log('Name:', this.name);
    // console.log('Email:', this.email);
    // console.log('Password:', this.password);

    // Verifica si las contraseñas coinciden
    if (this.password !== this.passwordTwo) {
      this.passwordMismatch = true; // Activa el error de contraseñas
      return; // Detén el proceso de registro
    }

    this.passwordMismatch = false; // Resetea el error si las contraseñas coinciden
    
    // Add authentication logic and navigate to the next page upon successful signup
    this.authService.signup(this.name, this.email, this.password).subscribe({
      next: (id) => {
        console.log('Registro exitoso. Id de usuario:', id);
        alert('Registro exitoso, ya puede iniciar sesión.'); // Mensaje de éxito
        // Simula un clic en el botón de "Iniciar Sesión"
      const loginButton = document.querySelector('.btn-login') as HTMLButtonElement;
      if (loginButton) {
        loginButton.click();
      }
        // this.router.navigate(['/user-panel']);
      },
      error: (err) => {
        this.errorMessage = 'Error al registrarse: ' + err.message;
        console.error(err);
        alert(this.errorMessage = err.error.message || 'Error desconocido al registrarse.');
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

  togglePassword(field: 'showPassword' | 'showPassword2' | 'showPassword3'): void {
    this[field] = !this[field]; // Cambia el estado del campo correspondiente

    // // Cambiar la imagen según el estado y el tema
    // const isDarkMode = this.themeService.isDarkModeEnabled();
    // const imageId = field === 'showPassword' ? 'image--hide' :
    //                 field === 'showPassword2' ? 'image--hide2' :
    //                 'image--hide3';
    // const imageElement = document.getElementById(imageId) as HTMLImageElement;

    // if (imageElement) {
    //   imageElement.src = this[field]
    //     ? (isDarkMode ? 'assets/images/passimg/hide3.png' : 'assets/images/passimg/hide2.png')
    //     : (isDarkMode ? 'assets/images/passimg/show3.png' : 'assets/images/passimg/show2.png');
    // }
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
