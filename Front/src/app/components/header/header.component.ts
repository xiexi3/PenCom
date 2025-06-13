import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMenuOpen = false;
  constructor(private router: Router, private themeService: ThemeService) {}

  ngOnInit(): void {
    // Aplicar el tema oscuro al cargar la aplicación
    this.themeService.applyDarkMode();

    // Escuchar cambios de ruta y aplicar el tema
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.themeService.applyDarkMode();
      }
    });
  }

  // Función para el menu hamburguesa en el diseno responsivo
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Función para cambiar el tema
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
