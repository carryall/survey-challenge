import { browser, by, element, WebElement } from 'protractor';
import { AppPage } from '../app.po';

export class LoginPage extends AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get('/auth/login');
  }

  async LoginWith(email: string, password: string): Promise<void> {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submitLoginForm();
  }

  async fillEmail(email: string): Promise<void> {
    element(by.css('input[name="email"]')).sendKeys(email);
  }

  async fillPassword(password: string): Promise<void> {
    element(by.css('input[name="password"]')).sendKeys(password);
  }

  async submitLoginForm(): Promise<void> {
    element(by.buttonText('Sign in')).click();
  }

  getSubmitButton(): WebElement {
    return element(by.buttonText('Sign in')).getWebElement();
  }

  getAlertTitle(): WebElement {
    return element(by.className('alert__heading')).getWebElement();
  }

  getAlertMessage(): WebElement {
    return element(by.className('alert__message')).getWebElement();
  }
}
