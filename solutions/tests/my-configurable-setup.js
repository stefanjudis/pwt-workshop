// @ts-check
const base = require("@playwright/test");

// 1. extend the provided `test` method
exports.test = base.test.extend({
  // note that custom fixture can also reuse existing fixtures such as `browser`
  isLoggedIn: [true, { option: true }],

  page: async ({ page, isLoggedIn }, use) => {
    // this is before the fixture is used (similar to `beforeEach`)
    console.log("before custom fixture");

    console.log(isLoggedIn);

    if (isLoggedIn) {
      // the provided object will be accessed from a test case
      await page.goto("https://danube-web.shop/");
      await page.getByRole("button", { name: "Log in" }).click();
      await page.getByPlaceholder("Email").click();
      await page.getByPlaceholder("Email").fill("user@email.com");
      await page.getByPlaceholder("Email").press("Tab");
      await page.getByPlaceholder("Password").fill("supersecure1");
      await page.getByRole("button", { name: "Sign In" }).click();
    }

    // pass fixture to your tests
    await use(page);

    // this is after the fixture was used (similar to `afterEach`)
    console.log("after custom fixture");
  },
});

exports.expect = base.expect;
