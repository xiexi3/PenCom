import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('ToastService', () => {
  let service: ToastService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['open']);
    TestBed.configureTestingModule({
      providers: [ToastService, { provide: MatSnackBar, useValue: spy }],
    });
    service = TestBed.inject(ToastService);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call snackBar.open with correct parameters', () => {
    service.show('Mensaje', 'Cerrar', 4000, 'custom-class');
    expect(snackBarSpy.open).toHaveBeenCalledWith('Mensaje', 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'custom-class',
    });
  });

  it('should use default parameters if not provided', () => {
    service.show('Otro mensaje');
    expect(snackBarSpy.open).toHaveBeenCalledWith('Otro mensaje', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: '',
    });
  });
});
