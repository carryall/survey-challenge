import { browser, by, element, WebElement } from 'protractor';
import { AppPage } from '../app.po';

export class ForgotPasswordPage extends AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get('/auth/forgot-password');
  }

  async ResetPasswordWith(email: string): Promise<void> {
    this.fillEmail(email);
    this.submitForgotPasswordForm();
  }

  async fillEmail(email: string): Promise<void> {
    element(by.css('input[name="email"]')).sendKeys(email);
  }

  async submitForgotPasswordForm(): Promise<void> {
    element(by.buttonText('Send Recovery Email')).click();
  }

  getSubmitButton(): WebElement {
    return element(by.buttonText('Send Recovery Email')).getWebElement();
  }

  getAlert(): WebElement {
    return element(by.className('alert__message')).getWebElement();
  }

  async getErrorMessage(): Promise<string> {
    return element(by.className('alert__message')).getText();
  }
}
