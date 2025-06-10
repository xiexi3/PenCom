import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if token exists (isAuthenticated)', () => {
    localStorage.setItem('token', '123');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false if token does not exist (isAuthenticated)', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should login and store token', () => {
    const mockResponse = {
      data: {
        accessToken: 'abc123',
        user: { role: 'admin' },
      },
    };

    service.login('test@mail.com', 'pass').subscribe((token) => {
      expect(token).toBe('abc123');
      expect(localStorage.getItem('token')).toBe('abc123');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/cuenta');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should signup a user', () => {
    const mockResponse = { success: true };
    service.signup('Test', 'test@mail.com', 'pass').subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      name: 'Test',
      email: 'test@mail.com',
      password: 'pass',
    });
    req.flush(mockResponse);
  });

  it('should send recovery code', () => {
    const mockResponse = { message: 'Code sent' };
    service.sendRecoveryCode('test@mail.com').subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/regenerate/code');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'test@mail.com' });
    req.flush(mockResponse);
  });

  it('should recover password', () => {
    const payload = {
      email: 'test@mail.com',
      token: 'token',
      password: 'newpass',
      password_confirmation: 'newpass',
    };
    const mockResponse = { message: 'Password changed' };

    service.recoverPassword(payload).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      'http://localhost:8080/api/regenerate/password'
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(mockResponse);
  });
});
