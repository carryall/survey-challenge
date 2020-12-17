import { LoginPage } from './login.po';
import { browser, logging, until } from 'protractor';

describe('Login', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  describe('Given valid credentials', () => {
    it('enables the form submit button', async () => {
      await page.navigateTo();
      await page.fillEmail('email@nimblehq.co');
      await page.fillPassword('password');

      expect(await page.getSubmitButton().getAttribute('disabled')).toBeFalsy();
    });

    it('redirects to the root url upon logging in', async () => {
      await page.navigateTo();
      await page.LoginWith('dev@nimblehq.co', '12345678');

      browser.wait(() => {
        return until.urlIs('/');
      });
    });
  });

  describe('Given email and password are blank', () => {
    it('disables the form submit button', async () => {
      await page.navigateTo();

      expect(await page.getSubmitButton().getAttribute('disabled')).toBeTruthy();
    });
  });

  describe('Given email is NOT in correct format', () => {
    it('disables the form submit button', async () => {
      await page.navigateTo();
      await page.fillEmail('email with wrong format');
      await page.fillPassword('password');

      expect(await page.getSubmitButton().getAttribute('disabled')).toBeTruthy();
    });
  });

  describe('Given INVALID credentials', () => {
    it('displays the error message', async () => {
      await page.navigateTo();
      await page.LoginWith('invalid-email@nimblehq.co', '12345678');

      browser.wait(() => {
        return until.elementIsVisible(page.getAlert());
      }).then(() => {
        browser.wait(() => {
          return until.elementTextIs(page.getAlert(), 'Invalid email or password');
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
