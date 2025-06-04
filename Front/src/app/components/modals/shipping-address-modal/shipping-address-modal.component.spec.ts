import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingAddressModalComponent } from './shipping-address-modal.component';

describe('ShippingAddressModalComponent', () => {
  let component: ShippingAddressModalComponent;
  let fixture: ComponentFixture<ShippingAddressModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingAddressModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingAddressModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
