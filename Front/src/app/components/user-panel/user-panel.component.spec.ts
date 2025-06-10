import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserPanelComponent } from './user-panel.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserPanelComponent', () => {
  let component: UserPanelComponent;
  let fixture: ComponentFixture<UserPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPanelComponent, HttpClientTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
