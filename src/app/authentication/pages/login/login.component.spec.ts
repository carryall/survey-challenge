import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let baseElement: any;

  const SELECTORS = {
    headerLogo: '.header__logo',
    headerTitle: '.header__subtitle'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    baseElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header', () => {
    expect(baseElement.querySelector(SELECTORS.headerLogo).src).toContain('assets/images/logo.svg');
    expect(baseElement.querySelector(SELECTORS.headerTitle).textContent).toContain('Sign in to Nimble');
  });
});
