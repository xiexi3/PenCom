import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicuentaComponent } from './micuenta.component';

describe('MicuentaComponent', () => {
  let component: MicuentaComponent;
  let fixture: ComponentFixture<MicuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MicuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
