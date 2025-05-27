import { Component } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { ThemeService } from '../../services/ThemeService.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false;
  isDarkMode = false;
  cartItems = 0;

  // Función para el menu hamburguesa en el diseno responsivo
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor(private router: Router, private themeService: ThemeService) {}

  // Función para cambiar el tema
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

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
}
