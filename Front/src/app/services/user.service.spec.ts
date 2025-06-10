import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['getAuthHeaders']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: AuthService, useValue: spy }
      ]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    authServiceSpy.getAuthHeaders.and.returnValue(new HttpHeaders({ Authorization: 'Bearer test-token' }));
    localStorage.setItem('token', 'test-token');
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user', () => {
    const mockResponse = { name: 'Test User' };
    service.getUser().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/user');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush(mockResponse);
  });

  it('should get user details', () => {
    const mockResponse = { details: 'info' };
    service.getUserDetails().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/user/details');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush(mockResponse);
  });

  it('should get user shipping address', () => {
    const mockResponse = { address: 'Calle 1' };
    service.getUserShippingAddress().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/user/shipping-address');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush(mockResponse);
  });

  it('should update shipping address', () => {
    const mockResponse = { success: true };
    service.updateShippingAddress('Nueva Calle').subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/user/shipping-address');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ shipping_address: 'Nueva Calle' });
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush(mockResponse);
  });

  it('should update profile picture', () => {
    const mockResponse = { success: true };
    const file = new File([''], 'foto.png', { type: 'image/png' });
    service.updateProfilePicture(file).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/user/profile-picture');
    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush(mockResponse);
  });

  it('should change password', () => {
    const mockResponse = { success: true };
    service.changePassword('old', 'new').subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/user/change-password');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ current_password: 'old', new_password: 'new' });
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush(mockResponse);
  });
});