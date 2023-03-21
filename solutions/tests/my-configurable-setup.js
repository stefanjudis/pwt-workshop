// @ts-check
const base = require("@playwright/test");

// 1. extend the provided `test` method
exports.test = base.test.extend({
  noJsErrors: [false, { option: true }],
  noJsLogs: [false, { option: true }],

  page: async ({ page, noJsErrors, noJsLogs }, use) => {
    const consoleLogs = [];
    page.on("console", async (msg) => {
      for (const arg of msg.args()) consoleLogs.push(await arg.jsonValue());
    });

    const pageExceptions = [];
    page.on("pageerror", ({ name, message }) => {
      pageExceptions.push({ name, message });
    });

    await page.goto(process.env.URL || "https://danube-web.shop/");

    // -------

    await use(page);

    // -------

    if (noJsLogs) {
      base.expect(consoleLogs).toHaveLength(0);
    }

    if (noJsErrors) {
      base.expect(pageExceptions).toHaveLength(0);
    }
  },
});

exports.expect = base.expect;
