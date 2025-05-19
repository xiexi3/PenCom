import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkMode = false;

  constructor() {
    // Leer el estado del tema desde localStorage al inicializar el servicio
    const darkMode = localStorage.getItem('darkMode');
    this.isDarkMode = darkMode === 'true';
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.applyDarkMode();
  }

  applyDarkMode(): void {
    // Elementos individuales
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const scroller = document.querySelector('.scroller__inner');
    const other = document.querySelector('.toggle-container');
    const main = document.querySelector('.main');

    // Elementos múltiples
    const titles = document.querySelectorAll('.title-carousel a');
    const carousels = document.querySelectorAll('.carousel');
    const cards = document.querySelectorAll('.card');

    // Añadir o quitar la clase 'dark-mode' a elementos individuales
    if (themeToggleBtn) themeToggleBtn.classList.toggle('dark-mode', this.isDarkMode);
    if (main) main.classList.toggle('dark-mode', this.isDarkMode);
    if (scroller) scroller.classList.toggle('dark-mode', this.isDarkMode);
    if (other) other.classList.toggle('dark-mode', this.isDarkMode);

    // Añadir o quitar la clase 'dark-mode' a elementos múltiples
    titles.forEach((title) => title.classList.toggle('dark-mode', this.isDarkMode));
    carousels.forEach((carousel) => carousel.classList.toggle('dark-mode', this.isDarkMode));
    cards.forEach((card) => card.classList.toggle('dark-mode', this.isDarkMode));

    // Cambiar el icono del botón de tema
    const icon = document.querySelector('.switch__icon');
    if (icon) {
      if (this.isDarkMode) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
    }

    // Cambiar las imágenes del camion y medalla
    const camionImage = document.querySelector('.small-image-camion') as HTMLImageElement;
    const medallaImage = document.querySelector('.small-image-medalla') as HTMLImageElement;
  
    if (camionImage) {
      camionImage.src = this.isDarkMode
        ? 'assets/images/logos/camion2.png'
        : 'assets/images/logos/camion.png';
    }
  
    if (medallaImage) {
      medallaImage.src = this.isDarkMode
        ? 'assets/images/logos/medalla2.png' 
        : 'assets/images/logos/medalla.png'; 
    }
  }

  isDarkModeEnabled(): boolean {
    return this.isDarkMode;
  }
}