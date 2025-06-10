import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProductos = [
    {
      id: 1,
      nombre: 'Componente 1',
      descripcion: 'desc',
      precio: '100',
      tipo: 'tipo',
      imagen_url: 'url',
      categoria: { id: 1, nombre: 'Componentes', descripcion: 'desc' }
    },
    {
      id: 2,
      nombre: 'Ordenador 1',
      descripcion: 'desc',
      precio: '200',
      tipo: 'tipo',
      imagen_url: 'url',
      categoria: { id: 2, nombre: 'Ordenadores', descripcion: 'desc' }
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch componentes', () => {
    service.getComponentes().subscribe(productos => {
      expect(productos.length).toBe(1);
      expect(productos[0].categoria.nombre).toBe('Componentes');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/productos');
    expect(req.request.method).toBe('GET');
    req.flush(mockProductos);
  });

  it('should fetch ordenadores', () => {
    service.getOrdenadores().subscribe(productos => {
      expect(productos.length).toBe(1);
      expect(productos[0].categoria.nombre).toBe('Ordenadores');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/productos');
    expect(req.request.method).toBe('GET');
    req.flush(mockProductos);
  });

  it('should fetch product by id', () => {
    const mockProduct = mockProductos[0];
    service.getProductById(1).subscribe(producto => {
      expect(producto).toEqual(mockProduct);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/productos/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should add a product', () => {
    const newProduct = { nombre: 'Nuevo', categoria: { id: 1, nombre: 'Componentes', descripcion: '' } };
    const headers = { Authorization: 'Bearer token' };

    service.addProduct(newProduct, headers).subscribe(response => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne('http://localhost:8080/api/productos');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    req.flush({ success: true });
  });

  it('should update a product', () => {
    const updatedProduct = { nombre: 'Actualizado', categoria: { id: 1, nombre: 'Componentes', descripcion: '' } };
    const headers = { Authorization: 'Bearer token' };

    service.updateProduct(1, updatedProduct, headers).subscribe(response => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne('http://localhost:8080/api/productos/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    req.flush({ success: true });
  });

  it('should delete a product', () => {
    spyOn(localStorage, 'getItem').and.returnValue('token');
    service.deleteProduct(1).subscribe(response => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne('http://localhost:8080/api/productos/1');
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    req.flush({ success: true });
  });
});