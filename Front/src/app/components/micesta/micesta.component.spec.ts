import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicestaComponent } from './micesta.component';

describe('MicestaComponent', () => {
  let component: MicestaComponent;
  let fixture: ComponentFixture<MicestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MicestaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
