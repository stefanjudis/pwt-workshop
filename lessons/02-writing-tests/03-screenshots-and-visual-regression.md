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

## 🏗️ Example with the good old Danube shop (or your own site)

**Task**:
