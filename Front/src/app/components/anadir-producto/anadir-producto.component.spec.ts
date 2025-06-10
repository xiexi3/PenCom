import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnadirProductoComponent } from './anadir-producto.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AnadirProductoComponent', () => {
  let component: AnadirProductoComponent;
  let fixture: ComponentFixture<AnadirProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnadirProductoComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnadirProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});