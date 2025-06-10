import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from './cart.service';
import { HttpHeaders } from '@angular/common/http';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService]
    });
    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.setItem('token', 'test-token');
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get cart items and flatten response', () => {
    const mockResponse = [[{ id: 1 }, { id: 2 }], [{ id: 3 }]];
    service.getCartItems().subscribe(items => {
      expect(items).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/cart');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush(mockResponse);
  });

  it('should add item to cart', () => {
    const mockResponse = { success: true };
    service.addToCart(5, 2).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/cart');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ product_id: 5, quantity: 2 });
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush(mockResponse);
  });

  it('should update cart item', () => {
    const mockResponse = { success: true };
    service.updateCartItem(7, 4).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/cart/7');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ quantity: 4 });
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush(mockResponse);
  });

  it('should remove cart item', () => {
    const mockResponse = { success: true };
    service.removeCartItem(3).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/cart/3');
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush(mockResponse);
  });

  it('should clear cart', () => {
    const mockResponse = { success: true };
    service.clearCart().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/cart');
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush(mockResponse);
  });

  it('should checkout', () => {
    const mockResponse = { orderId: 1 };
    const data = { address: 'Calle 1', notes: 'Ninguna' };
    service.checkout(data).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/orders');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush(mockResponse);
  });
});