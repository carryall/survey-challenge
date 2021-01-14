import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DefaultComponent } from './default.component';

describe('DefaultComponent', () => {
  let component: DefaultComponent;
  let fixture: ComponentFixture<DefaultComponent>;
  let baseElement: any;

  const SELECTORS = {
    headerLogo: '.app-header__logo',
    headerTitle: '.app-header__page-desc'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultComponent ],
      imports: [RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultComponent);
    component = fixture.componentInstance;
    baseElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders header logo and page description', () => {
    component.pageDescription = 'Page Description';
    fixture.detectChanges();

    expect(baseElement.querySelector(SELECTORS.headerLogo).src).toContain('assets/images/logo.svg');
    expect(baseElement.querySelector(SELECTORS.headerTitle).textContent).toContain('Page Description');
  });
});
