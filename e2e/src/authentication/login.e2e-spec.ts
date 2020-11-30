import { LoginPage } from './login.po';
import { browser, logging, until } from 'protractor';

describe('Login', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  describe('Given valid credential', () => {
    it('enables form submit button', async () => {
      await page.navigateTo();
      await page.fillEmail('email@nimblehq.co');
      await page.fillPassword('password');

      expect(await (await page.getSubmitButton()).getAttribute('disabled')).toBeFalsy();
    });

    it('sets access token to local storage', async () => {
      await page.navigateTo();
      await page.LoginWith('dev@nimblehq.co', '12345678');

      expect(localStorage.getItem('USER_ACCESS_TOKEN')).not.toBeNull();
      expect(localStorage.getItem('USER_TOKEN_TOKEN')).not.toBeNull();
    });

    it('redirects to root url when hit login button', async () => {
      await page.navigateTo();
      await page.LoginWith('dev@nimblehq.co', '12345678');

      browser.waitForAngular();
      browser.wait(() => {
        return until.urlIs('/');
      }, 2000);
    });
  });

  describe('Given email and password are blank', () => {
    it('disables form submit button', async () => {
      await page.navigateTo();

      expect(await (await page.getSubmitButton()).getAttribute('disabled')).toBeTruthy();
    });
  });

  describe('Given email is NOT in correct format', () => {
    it('disables form submit button', async () => {
      await page.navigateTo();
      await page.fillEmail('email with wrong format');
      await page.fillPassword('password');

      expect(await (await page.getSubmitButton()).getAttribute('disabled')).toBeTruthy();
    });
  });

  describe('Given INVALID credential', () => {
    it('displays error message', async () => {
      await page.navigateTo();
      await page.LoginWith('invalid-email@nimblehq.co', '12345678');

      browser.waitForAngular();
      browser.wait(() => {
        return until.elementIsVisible(page.getAlert());
      }, 2000).then(() => {
        browser.wait(() => {
          return until.elementTextIs(page.getAlert(), 'Invalid email or password');
        }, 2000);
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
