import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false;
  cartItems = 0;
  isDarkMode = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // toggleTheme() {
  //   const footer = document.querySelector('footer');
  //   const carousel = document.querySelector('.carousel');

  //   const themeToggleBtn = document.querySelector('.theme-toggle');
  //   const titles = document.querySelectorAll('.title-carousel a');
  //   const titles2 = document.querySelector('.title-carousel');
  //   const carousels = document.querySelectorAll('.carousel');
  //   const cards = document.querySelectorAll('.card');
  //   const scroller = document.querySelector('.scroller__inner');

  //   const other = document.querySelector('.toggle-container');

  //   this.isDarkMode = !this.isDarkMode;
  //   // document.body.classList.toggle('dark-mode');

  //   if (footer) {
  //     footer.classList.toggle('dark-mode');
  //   }

  //   if (carousel) {
  //     carousels.forEach((carousel) => {
  //       carousel.classList.toggle('dark-mode');
  //     }, carousel);
  //     carousel.classList.toggle('dark-mode');
  //     titles.forEach((title) => {
  //       title.classList.toggle('dark-mode');
  //     }, titles);
  //   }

  //   const icon = document.querySelector('.switch__icon');
  //   if (icon) {
  //     icon.classList.toggle('fa-sun');
  //     icon.classList.toggle('fa-moon');
  //   }
  // }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    // document.body.classList.toggle('dark-mode');
  
    // Elementos individuales
    const themeToggleBtn = document.querySelector('.theme-toggle');
    // const titles2 = document.querySelector('.title-carousel');
    const scroller = document.querySelector('.scroller__inner');
    const other = document.querySelector('.toggle-container');
  
    // Elementos múltiples
    const titles = document.querySelectorAll('.title-carousel a');
    const carousels = document.querySelectorAll('.carousel');
    const cards = document.querySelectorAll('.card');
    const main = document.querySelector('.main');

  
    // Añadir o quitar la clase 'dark-mode' a elementos individuales
    if (themeToggleBtn) themeToggleBtn.classList.toggle('dark-mode');
    if (main) main.classList.toggle('dark-mode');
    // if (titles2) titles2.classList.toggle('dark-mode');
    if (scroller) scroller.classList.toggle('dark-mode');
    if (other) other.classList.toggle('dark-mode');
  
    // Añadir o quitar la clase 'dark-mode' a elementos múltiples
    titles.forEach((title) => title.classList.toggle('dark-mode'));
    carousels.forEach((carousel) => carousel.classList.toggle('dark-mode'));
    cards.forEach((card) => card.classList.toggle('dark-mode'));
  
    // Cambiar el icono del botón de tema
    const icon = document.querySelector('.switch__icon');
    if (icon) {
      icon.classList.toggle('fa-sun');
      icon.classList.toggle('fa-moon');
    }
  }
}
