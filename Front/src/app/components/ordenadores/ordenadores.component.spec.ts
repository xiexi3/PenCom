import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenadoresComponent } from './ordenadores.component';

describe('OrdenadoresComponent', () => {
  let component: OrdenadoresComponent;
  let fixture: ComponentFixture<OrdenadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdenadoresComponent]
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
