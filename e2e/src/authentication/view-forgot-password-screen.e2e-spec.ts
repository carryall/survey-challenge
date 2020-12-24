import { ForgotPasswordPage } from './forgot-password.po';
import { browser, logging, until } from 'protractor';

describe('View forgot password screen', () => {
  let page: ForgotPasswordPage;

  beforeEach(() => {
    page = new ForgotPasswordPage();
  });

  describe('Given non logged in user', () => {
    it('does NOT redirect', async () => {
      await page.navigateTo();

      browser.wait(() => {
        return until.urlIs('/auth/forgot-password');
      });
    });
  });

  describe('Given already logged in user', () => {
    it('redirects to the root url', async () => {
      await page.navigateTo();

      browser.wait(() => {
        return until.urlIs('/');
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
