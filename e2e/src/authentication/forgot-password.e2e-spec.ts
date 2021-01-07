import { ForgotPasswordPage } from './forgot-password.po';
import { browser, logging, until } from 'protractor';

describe('Login', () => {
  let page: ForgotPasswordPage;

  beforeEach(() => {
    page = new ForgotPasswordPage();
  });

  describe('Given valid credentials', () => {
    it('enables the form submit button', async () => {
      await page.navigateTo();
      await page.fillEmail('email@nimblehq.co');

      expect(await page.getSubmitButton().getAttribute('disabled')).toBeFalsy();
    });

    it('displays the alert', async () => {
      await page.navigateTo();
      await page.ResetPasswordFor('dev@nimblehq.co');

      browser.wait(() => {
        return until.elementIsVisible(page.getAlertTitle()) &&
          until.elementIsVisible(page.getAlertMessage());
      }).then(() => {
        browser.wait(() => {
          return until.elementTextIs(page.getAlertTitle(), 'Check your email.') &&
            until.elementTextIs(page.getAlertMessage(), 
                                'If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.');
        });
      });
    });
  });

  describe('Given email is blank', () => {
    it('disables the form submit button', async () => {
      await page.navigateTo();

      expect(await page.getSubmitButton().getAttribute('disabled')).toBeTruthy();
    });
  });

  describe('Given email is NOT in correct format', () => {
    it('disables the form submit button', async () => {
      await page.navigateTo();
      await page.fillEmail('email with wrong format');

      expect(await page.getSubmitButton().getAttribute('disabled')).toBeTruthy();
    });
  });

  describe('Given INVALID credentials', () => {
    it('displays the alert message', async () => {
      await page.navigateTo();
      await page.ResetPasswordFor('invalid-email@nimblehq.co');

      browser.wait(() => {
        return until.elementIsVisible(page.getAlertTitle()) &&
          until.elementIsVisible(page.getAlertMessage());
      }).then(() => {
        browser.wait(() => {
          return until.elementTextIs(page.getAlertTitle(), 'Check your email.') &&
            until.elementTextIs(page.getAlertMessage(), 
                                'If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.');
        });
      });
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
