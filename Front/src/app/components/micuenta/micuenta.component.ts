
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MicuentaService } from './micuenta.service';



@Component({
  selector: 'app-micuenta',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './micuenta.component.html',
  styleUrl: './micuenta.component.css'
})

export class MicuentaComponent {
  
}
// export class MicuentaComponent implements OnInit {
//   isLoginForm = true;
//   showPassword = false;
//   showPasswordSignup = false;
//   showPasswordConfirm = false;
//   loginForm!: FormGroup;
//   signupForm!: FormGroup;
//   darkMode = false;

//   constructor(
//     private fb: FormBuilder,
//     private micuentaService: MicuentaService
//   ) {}

//   ngOnInit(): void {
//     this.initForms();
//     this.loadTheme();
//   }

//   initForms(): void {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });

//     this.signupForm = this.fb.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       passwordConfirm: ['', Validators.required]
//     }, {
//       validators: this.passwordMatchValidator
//     });
//   }

//   passwordMatchValidator(formGroup: FormGroup): {[key: string]: any} | null {
//     const password = formGroup.get('password')?.value;
//     const passwordConfirm = formGroup.get('passwordConfirm')?.value;
    
//     return password === passwordConfirm ? null : { 'passwordMismatch': true };
//   }

//   toggleForms(isLoginForm: boolean): void {
//     this.isLoginForm = isLoginForm;
    
//     // Reset forms when toggling
//     if (isLoginForm) {
//       this.signupForm.reset();
//     } else {
//       this.loginForm.reset();
//       // Scroll to bottom after a short delay to ensure the DOM is updated
//       setTimeout(() => {
//         const element = document.getElementById('signupButton');
//         element?.scrollIntoView({ behavior: 'smooth' });
//       }, 50);
//     }
//   }

//   togglePassword(field: string): void {
//     switch(field) {
//       case 'login':
//         this.showPassword = !this.showPassword;
//         break;
//       case 'signup':
//         this.showPasswordSignup = !this.showPasswordSignup;
//         break;
//       case 'confirm':
//         this.showPasswordConfirm = !this.showPasswordConfirm;
//         break;
//     }
//   }

//   toggleDarkMode(): void {
//     this.darkMode = !this.darkMode;
//     document.body.classList.toggle('dark-mode');
//     localStorage.setItem('theme', this.darkMode ? 'dark-mode' : 'false');
//   }

//   loadTheme(): void {
//     const theme = localStorage.getItem('theme');
//     if (theme === 'dark-mode') {
//       this.darkMode = true;
//       document.body.classList.add('dark-mode');
//     }
//   }

//   onSubmitLogin(): void {
//     if (this.loginForm.valid) {
//       this.micuentaService.login(this.loginForm.value).subscribe({
//         next: (response) => {
//           console.log('Login successful', response);
//           // Handle successful login (redirect, store token, etc.)
//         },
//         error: (error) => {
//           console.error('Login failed', error);
//           // Handle error (show message, etc.)
//         }
//       });
//     }
//   }

//   onSubmitSignup(): void {
//     if (this.signupForm.valid) {
//       this.micuentaService.register(this.signupForm.value).subscribe({
//         next: (response) => {
//           console.log('Registration successful', response);
//           // Handle successful registration
//         },
//         error: (error) => {
//           console.error('Registration failed', error);
//           // Handle error
//         }
//       });
//     }
//   }
// }