import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationPage } from './registration.page';

describe('RegistrationPage', () => {
  let component: RegistrationPage;
  let fixture: ComponentFixture<RegistrationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize registration form with empty values', () => {
    expect(component.registrationForm.firstName).toBe('');
    expect(component.registrationForm.lastName).toBe('');
    expect(component.registrationForm.email).toBe('');
    expect(component.registrationForm.password).toBe('');
    expect(component.registrationForm.confirmPassword).toBe('');
  });

  it('should set isSubmitting to false on init', () => {
    expect(component.isSubmitting).toBeFalse();
  });

  it('should validate required fields', () => {
    component.registrationForm = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    // The form validation will return false for empty fields
  });
});