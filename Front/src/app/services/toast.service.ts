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
	horizontalPosition: 'start' | 'center' | 'end' = 'center',
    verticalPosition: 'top' |'bottom' = 'top'
	): void {
    this.snackBar.open(message, action, {
		duration: duration,
		horizontalPosition: horizontalPosition, // Posición horizontal
		verticalPosition: verticalPosition, 
    });
	}
}
