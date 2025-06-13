import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})

export class NotFoundComponent {
  constructor(private router: Router, private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.show('La ruta solicitada no existe.');
    this.router.navigate(['/home']);
  }
}
