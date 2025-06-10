import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    // Limpia localStorage antes de cada test
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [ThemeService]
    });
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with darkMode false by default', () => {
    expect(service.isDarkModeEnabled()).toBeFalse();
  });

  it('should initialize with darkMode true if set in localStorage', () => {
    localStorage.setItem('darkMode', 'true');
    const newService = new ThemeService();
    expect(newService.isDarkModeEnabled()).toBeTrue();
  });

  it('should toggle theme and update localStorage', () => {
    spyOn(service, 'applyDarkMode');
    service.toggleTheme();
    expect(service.isDarkModeEnabled()).toBeTrue();
    expect(localStorage.getItem('darkMode')).toBe('true');
    expect(service.applyDarkMode).toHaveBeenCalled();
    service.toggleTheme();
    expect(service.isDarkModeEnabled()).toBeFalse();
    expect(localStorage.getItem('darkMode')).toBe('false');
  });

it('should call DOM methods in applyDarkMode without errors', () => {
  spyOn(document, 'querySelector').and.returnValue({ classList: { toggle: () => {}, add: () => {}, remove: () => {} } } as any);
  spyOn(document, 'querySelectorAll').and.returnValue([
    { classList: { toggle: () => {} }, remove: () => {} }
  ] as any);
  spyOn(document, 'getElementById').and.returnValue({ src: '' } as any);

  expect(() => service.applyDarkMode()).not.toThrow();
});
});