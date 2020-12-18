import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormForgotPasswordComponent } from './form-forgot-password.component';

describe('FormForgotPasswordComponent', () => {
  let component: FormForgotPasswordComponent;
  let fixture: ComponentFixture<FormForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormForgotPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });
});
