import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdenadoresComponent } from './ordenadores.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule

describe('OrdenadoresComponent', () => {
  let component: OrdenadoresComponent;
  let fixture: ComponentFixture<OrdenadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenadoresComponent, HttpClientTestingModule] // Usa imports y agrega HttpClientTestingModule
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});