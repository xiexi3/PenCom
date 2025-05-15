import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, ViewChildren, QueryList, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  isDragging: boolean = false;
  startX: number = 0;
  startScrollLeft: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
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

    this.itemlists.forEach((itemlist, index) => {
      const maxScrollLeft = itemlist.nativeElement.scrollWidth - itemlist.nativeElement.clientWidth;
      this.maxScrollLefts[index] = maxScrollLeft;

      // Actualiza la posición inicial del scrollbar y los botones
      this.updateScrollThumbPosition(index);
      this.handleSlideButtons(index);

      // Agrega eventos de arrastre al scrollbar-thumb
      const scrollbarThumb = this.scrollbarThumbs.toArray()[index].nativeElement;
      scrollbarThumb.addEventListener('mousedown', (event: MouseEvent) => this.startDrag(event, index));
    });

    // Agrega eventos globales para manejar el arrastre
    document.addEventListener('mousemove', (event: MouseEvent) => this.onDrag(event));
    document.addEventListener('mouseup', () => this.stopDrag());
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

  startDrag(event: MouseEvent, carouselIndex: number): void {
  this.isDragging = true;
  this.startX = event.clientX;

  const itemlist = this.itemlists.toArray()[carouselIndex]?.nativeElement;
  if (itemlist) {
    this.startScrollLeft = itemlist.scrollLeft;
  }
}

  onDrag(event: MouseEvent): void {
    if (!this.isDragging) return;
  
    const deltaX = event.clientX - this.startX;
  
    // Encuentra el carrusel que está siendo arrastrado
    const itemlist = this.itemlists.toArray()[this.startScrollLeft]?.nativeElement;
  
    if (itemlist) {
      itemlist.scrollLeft = this.startScrollLeft - deltaX;
  
      // Actualiza el scrollbar-thumb y los botones
      const carouselIndex = this.itemlists.toArray().indexOf(itemlist);
      if (carouselIndex !== -1) {
        this.updateScrollThumbPosition(carouselIndex);
        this.handleSlideButtons(carouselIndex);
      }
    }
  }

  stopDrag(): void {
    this.isDragging = false;
  }

}
