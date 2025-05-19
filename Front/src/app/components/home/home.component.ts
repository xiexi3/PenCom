import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, ViewChildren, QueryList, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ProductService } from './../../product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChildren('itemlist') itemlists!: QueryList<ElementRef>;
  @ViewChildren('scrollbarThumb') scrollbarThumbs!: QueryList<ElementRef>;
  @ViewChild('scroller') scroller!: ElementRef;

  componentes: any[] = [];
  ordenadores: any[] = [];
  maxScrollLefts: number[] = [];

  constructor(private productService: ProductService, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    // document.body.scrollTop = 0;
    this.viewportScroller.scrollToPosition([0, 0]);
    
    this.productService.getComponentes().subscribe(
      (data) => {
        this.componentes = data;
      },
      (error) => {
        console.error('Hubo un error al obtener los componentes.', error);
      }
    );

    this.productService.getOrdenadores().subscribe(
      (data) => {
        this.ordenadores = data;
      },
      (error) => {
        console.error('Hubo un error al obtener los ordenadores.', error);
      }
    );
  }

  // Modo oscuro y hamburger
  isMenuOpen = false;
  cartItems = 0;
  isDarkMode = false;
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('.switch__icon');
    if (icon) {
      icon.classList.toggle('fa-sun');
      icon.classList.toggle('fa-moon');
    }
  }

  ngAfterViewInit() {
    this.addAnimation();
  }

  addAnimation() {
    if (!this.scroller) {
      console.error('El elemento scroller no se encontró.');
      return;
    }
  
    const scrollerElement = this.scroller.nativeElement as HTMLElement;

    // Add data-animated="true" to the scroller
    scrollerElement.setAttribute('data-animated', 'true');

    // Get the inner container and its children
    const scrollerInner = scrollerElement.querySelector('.scroller__inner') as HTMLElement;
    const scrollerContent = Array.from(scrollerInner.children);

    // Clone each child and append it to the inner container
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true) as HTMLElement;
      duplicatedItem.setAttribute('aria-hidden', 'true');
      scrollerInner.appendChild(duplicatedItem);
    });
  }

  scroll(carouselIndex: number, direction: number): void {
    const itemlist = this.itemlists.toArray()[carouselIndex].nativeElement;
    const scrollAmount = itemlist.clientWidth * direction;

    // Desplaza el carrusel
    itemlist.scrollBy({ left: scrollAmount, behavior: 'smooth' });

    // Espera a que el desplazamiento termine para actualizar los botones y el scrollbar
    setTimeout(() => {
      this.updateScrollThumbPosition(carouselIndex);
      this.handleSlideButtons(carouselIndex);
    }, 300);
  }

  updateScrollThumbPosition(carouselIndex: number): void {
    const itemlist = this.itemlists.toArray()[carouselIndex]?.nativeElement;
    const scrollbarThumb = this.scrollbarThumbs.toArray()[carouselIndex]?.nativeElement;
    const maxScrollLeft = this.maxScrollLefts[carouselIndex];
  
    if (itemlist && scrollbarThumb) {
      const scrollPosition = itemlist.scrollLeft;
      const thumbPosition = (scrollPosition / maxScrollLeft) * (itemlist.clientWidth - scrollbarThumb.offsetWidth);
  
      // Actualiza la posición del scrollbar-thumb
      scrollbarThumb.style.left = `${thumbPosition}px`;
    }
  }

  handleSlideButtons(carouselIndex: number): void {
    const itemlist = this.itemlists.toArray()[carouselIndex].nativeElement;
    const prevButton = document.getElementById(`prev-slide-${carouselIndex + 1}`) as HTMLElement;
    const nextButton = document.getElementById(`next-slide-${carouselIndex + 1}`) as HTMLElement;
    const maxScrollLeft = this.maxScrollLefts[carouselIndex];

    // Muestra u oculta los botones según la posición de desplazamiento
    // if (prevButton && nextButton) {
    //   prevButton.style.display = itemlist.scrollLeft <= 0 ? 'none' : 'flex';
    //   nextButton.style.display = itemlist.scrollLeft >= maxScrollLeft ? 'none' : 'flex';
    // }
  }

}
