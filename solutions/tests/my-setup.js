// @ts-check
const base = require("@playwright/test");

exports.test = base.test.extend({
  // @ts-ignore
  page: async ({ page }, use) => {
    const exceptions = [];

    // listen for page errors
    page.on("pageerror", (exception) => {
      exceptions.push(exception);
    });

    await page.goto("https://danube-web.shop/");

    await use(page);

    base.expect(exceptions, "There shouldn't be JS exceptions").toHaveLength(0);
  },

  // @ts-ignore
  loggedInPage: async ({ page }, use) => {
    // this is before the fixture is used (similar to `beforeEach`)
    console.log("before custom fixture");

    // the provided object will be accessed from a test case
    await page.goto("https://danube-web.shop/");
    await page.getByRole("button", { name: "Log in" }).click();
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill("user@email.com");
    await page.getByPlaceholder("Email").press("Tab");
    await page.getByPlaceholder("Password").fill("supersecure1");
    await page.getByRole("button", { name: "Sign In" }).click();

    // pass fixture to your tests
    await use(page);

    // this is after the fixture was used (similar to `afterEach`)
    console.log("after custom fixture");
  },

  // @ts-ignore
  pageWithoutImages: async ({ page }, use) => {
    // block all image requests
    await page.route("**/*.{png,jpg,jpeg}", (route) => route.abort());
    await page.goto("https://danube-web.shop/");
    await use(page);
  },
});

exports.expect = base.expect;
