import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormForgotPasswordComponent } from './form-forgot-password.component';

describe('FormForgotPasswordComponent', () => {
  let component: FormForgotPasswordComponent;
  let fixture: ComponentFixture<FormForgotPasswordComponent>;
  let baseElement: any;

  const SELECTORS = {
    emailField: '.form input[type="email"]',
    submitButton: '.form button[type="submit"]'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormForgotPasswordComponent ],
      imports: [
        HttpClientModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormForgotPasswordComponent);
    component = fixture.componentInstance;
    baseElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders login form', () => {
    expect(baseElement.querySelector(SELECTORS.emailField)).toBeTruthy();
    expect(baseElement.querySelector(SELECTORS.submitButton)).toBeTruthy();
  });
});
