import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';
import { AuthService } from './../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ToastService } from '../../services/toast.service';
import { forkJoin } from 'rxjs'; // Importa forkJoin

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChildren('itemlist') itemlists!: QueryList<ElementRef>;
  @ViewChild('scroller') scroller!: ElementRef;

  componentes: any[] = [];
  ordenadores: any[] = [];
  maxScrollLefts: number[] = [];

  constructor(
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private productService: ProductService,
    private viewportScroller: ViewportScroller,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]); // Para que al cargar la página se vaya al inicio del scroll

    // Usamos forkJoin para esperar a que ambos observables se completen
    forkJoin({
      componentes: this.productService.getComponentes(),
      ordenadores: this.productService.getOrdenadores(),
    }).subscribe(
      (data) => {
        this.componentes = data.componentes;
        this.ordenadores = data.ordenadores;
        // console.log('Componentes y ordenadores cargados.');
      },
      (error) => {
        console.error('Hubo un error al obtener los datos.', error);
      }
    );
  }

  ngAfterViewInit() {
    this.addAnimation(); // Añadir la animación después de que la vista se haya inicializado
  }

  // Metodo para animar el scroller de marcas
  addAnimation() {
    if (!this.scroller) {
      console.error('El elemento scroller no se encontró.');
      return;
    }

    const scrollerElement = this.scroller.nativeElement as HTMLElement;

    // Anado data-animated="true" al scroller
    scrollerElement.setAttribute('data-animated', 'true');

    // Get the inner container and its children
    const scrollerInner = scrollerElement.querySelector(
      '.scroller__inner'
    ) as HTMLElement;
    const scrollerContent = Array.from(scrollerInner.children);

    // Clone each child and append it to the inner container
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true) as HTMLElement;
      duplicatedItem.setAttribute('aria-hidden', 'true');
      scrollerInner.appendChild(duplicatedItem);
    });
  }

  // Metodo mover el carrusel con botones
  scroll(carouselIndex: number, direction: number): void {
    const itemlist = this.itemlists.toArray()[carouselIndex].nativeElement;
    const scrollAmount = itemlist.clientWidth * direction;

    // Desplaza el carrusel
    itemlist.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  addToCart(productId: number): void {
    if (!this.authService.isAuthenticated()) {
      this.toastService.show(
        'Debes iniciar sesión para añadir productos al carrito.'
      );
      this.router.navigate(['/cuenta']);
      return;
    }

    this.cartService.addToCart(productId).subscribe(() => {
      this.toastService.show('Producto añadido al carrito.');
    });
  }
}
