import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})

export class ChangePasswordComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;

  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    public themeService: ThemeService,
    private userService: UserService,
    private toastService: ToastService
  ) {}

  togglePassword(
    field: 'showCurrentPassword' | 'showNewPassword' | 'showConfirmPassword'
  ): void {
    this[field] = !this[field];
  }

  changePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.passwordMismatch = true;
      this.toastService.show('Las contraseñas no coinciden.');
      return;
    }

    this.passwordMismatch = false;

    this.userService
      .changePassword(this.currentPassword, this.newPassword)
      .subscribe({
        next: () => {
          this.toastService.show('Contraseña actualizada correctamente.');
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';
        },
        error: (err) => {
          // console.error('Error al cambiar la contraseña:', err);
          // Si el backend devuelve un array de errores, muestra el primer error
          if (err.error?.errors) {
            const firstError = Object.values(err.error.errors)[0] as string;
            this.toastService.show(firstError);
          } else if (err.error?.message) {
            // Si el backend devuelve un mensaje único
            this.toastService.show(err.error.message);
          } else {
            // Mensaje genérico para otros errores
            this.toastService.show('Hubo un error al cambiar la contraseña.');
          }
        },
      });
  }
}
