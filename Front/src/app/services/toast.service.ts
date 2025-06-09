import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  show(
    message: string,
    action: string = 'Cerrar',
    duration: number = 3000,
    panelClass: string = ''
  ): void {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'center', // Posición horizontal
      verticalPosition: 'top',
      panelClass: panelClass,
    });
  }
}
