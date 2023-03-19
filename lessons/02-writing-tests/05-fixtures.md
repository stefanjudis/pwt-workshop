# Restructure and tidy up your code with custom fixtures

If you finished the previous exercide you should have a login step in a test case's `beforeEach` hook. But here's a question, how can you reuse this login step for tests living in other test files?

```javascript
test.describe("Danube", () => {
  test.beforeEach(async ({ page }) => {
    await test.step("login", async () => {
      // login logic
    });
  });

  test("has title", async ({ page, browserName }) => {
    // additional test logic with a logged-in session
  });

  // more tests....
});
```

This is where custom fixtures come into play. This might sound complicated but you used built-in fixtures the entire time.

> **Note** If you want to learn how fixtures work, [here's a YouTube explainer](https://www.youtube.com/watch?v=2O7dyz6XO2s&t=15s).

## Built-in fixtures

Playwright uses fixtures to provide you with everything you need to control a browser in your tests.

| Fixture       | Description                                                                                    |
|---------------|------------------------------------------------------------------------------------------------|
| `page`        | Isolated page for this test run.                                                               |
| `context`     | Isolated context for this test run. The  `page` fixture belongs to this context as well.       |
| `browser`     | Browsers are shared across tests to optimize resources.                                        |
| `browserName` | The name of the browser currently running the test. Either  `chromium`, `firefox` or `webkit`. |

Whenever you've defined the `page` oject in your test cases you've been using the provided `page` fixture.

```javascript
// this test case uses the pre-defined `page` and `browserName` fixture
test("has title", async ({ page, browserName }) => {
  // your test case
});
```

## Create a custom fixture

When I comes to Playwright Test there are always multiple ways to do things, but let's assume you want to provide a page object that emulates dark mode. How could you do this with a fixture that's available in all your tests.

```javascript
import { test as base, expect, Page } from "@playwright/test";

type MyFixtures = {
  darkPage: Page;
};

// 1. extend the provided `test` method
const test = base.extend({
  darkPage: async ({ browser }, use) => {
    console.log("before custom fixture");
    // this is `beforeEach`
    use(
      await browser.newPage({
        colorScheme: "dark",
      })
    );
    // this is `afterEach`
    console.log("after custom fixture");
  },
});

// 2. use your extended `test` runner
test.describe("A light and dark mode page", () => {
  // 3. access your newly defined `darkPage` fixture
  test("has title", async ({ darkPage }) => {
    await darkPage.goto("https://playwright.dev");
    await darkPage.screenshot({ path: "dark-home.png" });
  });
});
```

> **Note** dark color scheme emulation is configurable in multiple place. I only took it as an understandable example.
