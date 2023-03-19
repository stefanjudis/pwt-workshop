# Screenshots and visual regression testing

Even though Playwright provides stellar tools to debug your tests sometimes you might want to take screenshots on the way. [Playwright provides screenshot functionality on the page and locator level](https://playwright.dev/docs/screenshots).

## Page screenshots

```javascript
import { test, expect } from "@playwright/test";

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // take a page screenshot
  await page.screenshot({ path: "./home.png" });
});
```

Use `page.screenshot` to capture the state of the page.

## Locator screenshots

If you're only interested in a particular DOM element, locators provide screenshots, too.

```javascript
import { test, expect } from "@playwright/test";

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // take a screenshot of a particular element
  await page
    .getByRole("link", { name: "Docs" })
    .screenshot({ path: "./docs.png" });
```

## How to leverage browser names in your screenshot path

If you're running parallel tests with multiple browsers, including the browser name in the screenshot path avoids that all the screenshots overwrite each other.

```javascript
test("get started link", async ({ page, browserName }) => {
  await page.goto("https://playwright.dev/");
  await page
    .getByRole("link", { name: "Docs" })
    .screenshot({ path: `./docs-${browserName}.png` });
});
```

> **Note** The `page`, `browserName` and other test run variables are called test fixtures. [Playwright provides many fixtures](https://playwright.dev/docs/api/class-fixtures) for different use cases and [we'll look at them later](./05-fixtures.md).

## Visual regression snapshots

Even though screenshots are handy to evaluate what your tests are doing you can level it up a notch and implement visual regression testing with a single assertion — [`toHaveScreenshot()`](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-1)

```javascript
test.only("get started link", async ({ page, browserName }) => {
  await page.goto("https://playwright.dev/");
  // visual regression works on a page level...
  await expect(page).toHaveScreenshot("home.png");
  // but also on a locator level
  await expect(page.getByRole("link", { name: "Docs" })).toHaveScreenshot(
    "docs.png"
  );
});
```

`toHaveScreenshot()` will create page and component screenshots next to your test files and perform visual regression tests in future runs. Additionally, it automatically captures the browser and OS in use to take the screenshot (`[test-name]-[browser]-[os].png`).💪

> **Note**
> Playwright provides functionality to handle animations and transitions when taking screenshots. Static screenshots allow animations where as visual regression snapshot disable animations by default.

## Screenshot configuration

[`screenshot`](https://playwright.dev/docs/api/class-page#page-screenshot) and [`toHaveScreenshot()`](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-1) provide multiple configuration options:

- `mask`
- `maxDiffRatio`
- `scale`
- ...

Familialize yourself with all these options to get the most of your screenshots!

## 🏗️ Action time with the good old Danube shop (or your own site)

**Tasks**

- [ ] Take full page and element screenshots
- [ ] Mask DOM elements in your screenshots
- [ ] Implement visual snapshot testing in a test case

