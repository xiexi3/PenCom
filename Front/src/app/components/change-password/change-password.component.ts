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
// export class ChangePasswordComponent {
//   currentPassword: string = '';
//   newPassword: string = '';
//   confirmPassword: string = '';

//   constructor(
//     private userService: UserService,
//     private toastService: ToastService
//   ) {}

//   changePassword(): void {
//     if (this.newPassword !== this.confirmPassword) {
//       this.toastService.show(
//         'Las contraseñas no coinciden.',
//         'Cerrar',
//         3000,
//         'center',
//         'top'
//       );
//       return;
//     }

//     this.userService
//       .changePassword(this.currentPassword, this.newPassword)
//       .subscribe({
//         next: () => {
//           this.toastService.show(
//             'Contraseña actualizada correctamente.',
//             'Cerrar',
//             3000,
//             'center',
//             'top'
//           );
//           this.currentPassword = '';
//           this.newPassword = '';
//           this.confirmPassword = '';
//         },
//         error: (err) => {
//           console.error('Error al cambiar la contraseña:', err);
//           this.toastService.show(
//             'Hubo un error al cambiar la contraseña.',
//             'Cerrar',
//             3000,
//             'center',
//             'top'
//           );
//         },
//       });
//   }
// }
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

  togglePassword(field: 'showCurrentPassword' | 'showNewPassword' | 'showConfirmPassword'): void {
    this[field] = !this[field];
  }

  changePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.passwordMismatch = true;
      this.toastService.show('Las contraseñas no coinciden.', 'Cerrar', 3000, 'center', 'top');
      return;
    }

    this.passwordMismatch = false;

    this.userService.changePassword(this.currentPassword, this.newPassword).subscribe({
      next: () => {
        this.toastService.show('Contraseña actualizada correctamente.', 'Cerrar', 3000, 'center', 'top');
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error: (err) => {
        console.error('Error al cambiar la contraseña:', err);
        this.toastService.show('Hubo un error al cambiar la contraseña.', 'Cerrar', 3000, 'center', 'top');
      },
    });
  }
}