import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShippingAddressModalComponent } from './shipping-address-modal.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ShippingAddressModalComponent', () => {
  let component: ShippingAddressModalComponent;
  let fixture: ComponentFixture<ShippingAddressModalComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ShippingAddressModalComponent>>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockUserService = jasmine.createSpyObj('UserService', ['updateShippingAddress', 'getUserShippingAddress']); // Agrega getUserShippingAddress al mock

    await TestBed.configureTestingModule({
      imports: [ShippingAddressModalComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: UserService, useValue: mockUserService },
        { provide: MAT_DIALOG_DATA, useValue: {} } // Puedes mockear datos de entrada si es necesario
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShippingAddressModalComponent);
    component = fixture.componentInstance;
    mockUserService.getUserShippingAddress.and.returnValue(of({ shipping_address: 'Test Address' })); // Simula el valor de retorno
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});