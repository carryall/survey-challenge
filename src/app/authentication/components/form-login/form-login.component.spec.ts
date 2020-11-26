import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { FormLoginComponent } from './form-login.component';

describe('FormLoginComponent', () => {
  let component: FormLoginComponent;
  let fixture: ComponentFixture<FormLoginComponent>;
  let baseElement: any;

  const SELECTORS = {
    emailField: '.form-login input[type="email"]',
    passwordField: '.form-login input[type="password"]',
    submitButton: '.form-login button[type="submit"]'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLoginComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLoginComponent);
    component = fixture.componentInstance;
    baseElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders login form', () => {
    expect(baseElement.querySelector(SELECTORS.emailField)).toBeTruthy();
    expect(baseElement.querySelector(SELECTORS.passwordField)).toBeTruthy();
    expect(baseElement.querySelector(SELECTORS.submitButton)).toBeTruthy();
  });
});
