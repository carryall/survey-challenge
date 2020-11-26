import { LoginPage } from './login.po';
import { browser, logging, until } from 'protractor';

describe('Login', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('disables form submit button when email and password are blank', async () => {
    await page.navigateTo();

    expect(await (await page.getSubmitButton()).getAttribute('disabled')).toBeTruthy();
  });

  it('disables form submit button when email is not in correct format', async () => {
    await page.navigateTo();
    await page.fillEmail('email with wrong format');
    await page.fillPassword('password');

    expect(await (await page.getSubmitButton()).getAttribute('disabled')).toBeTruthy();
  });

  it('enables form submit button when email and password are NOT blank', async () => {
    await page.navigateTo();
    await page.fillEmail('email@nimblehq.co');
    await page.fillPassword('password');

    expect(await (await page.getSubmitButton()).getAttribute('disabled')).toBeFalsy();
  });

  it('redirects to root url when login with valid credential', async () => {
    await page.navigateTo();
    await page.LoginWith('dev@nimblehq.co', '12345678');

    browser.waitForAngular();
    browser.wait(() => {
      return until.urlIs('/');
    }, 2000);
  });

  it('displays error message when login with INVALID credential', async () => {
    await page.navigateTo();
    await page.LoginWith('invalid-email@nimblehq.co', '12345678');

    browser.waitForAngular();
    browser.wait(() => {
      return until.elementIsVisible(page.getAlert());
    }, 2000);
    browser.wait(() => {
      return until.elementTextIs(page.getAlert(), 'Invalid email or password');
    }, 2000);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
