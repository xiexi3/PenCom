import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  step: number = 1; // Controla el paso actual (1: Solicitar correo, 2: Ingresar token y nueva contraseña)
  email: string = '';
  recoveryToken: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;
  isLoading: boolean = false; // Indica si hay una operación en curso

  // Propiedades para alternar la visibilidad de las contraseñas
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private router: Router,
    public themeService:ThemeService, 
    private userService: UserService, 
    private toastService: ToastService) {}

  /**
   * Alterna la visibilidad de las contraseñas.
   * @param field Campo que se desea alternar (showNewPassword o showConfirmPassword).
   */
  togglePassword(field: 'showNewPassword' | 'showConfirmPassword'): void {
    this[field] = !this[field];
  }

  /**
   * Envía el código de recuperación al correo electrónico proporcionado.
   */
  sendRecoveryCode(): void {

    this.isLoading = true; // Activa el indicador de carga
    this.userService.sendRecoveryCode(this.email).subscribe({
      next: () => {
        this.toastService.show('Se ha enviado un código de recuperación a tu correo.');
        this.step = 2; // Avanza al siguiente paso
        this.isLoading = false; // Desactiva el indicador de carga
      },
      error: (err) => {
        console.error('Error al enviar el código de recuperación:', err);
        this.toastService.show('No se pudo enviar el código. Verifica el correo ingresado.');
        this.isLoading = false; // Desactiva el indicador de carga
      },
    });
  }

  /**
   * Cambia la contraseña utilizando el token de recuperación.
   */
  changePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.passwordMismatch = true;
      this.toastService.show('Las contraseñas no coinciden.');
      return;
    }

    this.passwordMismatch = false;
    this.isLoading = true; // Activa el indicador de carga

    const payload = {
      email: this.email,
      token: this.recoveryToken,
      password: this.newPassword,
      password_confirmation: this.confirmPassword,
    };

    this.userService.recoverPassword(payload).subscribe({
      next: () => {
        this.toastService.show('Contraseña actualizada correctamente.');
        this.resetForm(); // Limpia el formulario después de un cambio exitoso
        this.isLoading = false; // Desactiva el indicador de carga
        this.router.navigate(['/cuenta']); // Redirige al login
      },
      error: (err) => {
        console.error('Error al recuperar la contraseña:', err);
        this.toastService.show('Error al recuperar la contraseña. Inténtelo de nuevo.');
        this.isLoading = false; // Desactiva el indicador de carga
      },
    });
  }

  /**
   * Limpia los campos del formulario y reinicia el flujo.
   */
  private resetForm(): void {
    this.step = 1;
    this.email = '';
    this.recoveryToken = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.passwordMismatch = false;
  }
}