# Restructure and tidy up your code with custom fixtures

If you finished the previous exercise, you should have a login step in a test case's `beforeEach` hook. But here's a question, how can you reuse this login step for tests living in other test files?

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

> **Note** Each `page` object is isolated to this particular test run.

## Create a custom fixture

When I comes to Playwright Test there are always multiple ways to do things, but let's assume you want to provide a page object that emulates dark mode. How could you do this with a fixture that's available in all your tests.

```javascript
// example.spec.ts
import { test as base, expect, Page } from "@playwright/test";

type MyFixtures = {
  darkPage: Page;
};

// 1. extend the provided `test` method
const test = base.extend({
  // note that custom fixture can also reuse existing fixtures such as `browser`
  darkPage: async ({ browser }, use) => {
    // this is before the fixture is used (similar to `beforeEach`)
    console.log("before custom fixture");
    // the provided object will be accessed from a test case
    use(
      await browser.newPage({
        colorScheme: "dark",
      })
    );
    // this is after the fixture was used (similar to `afterEach`)
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

> **Note** Dark color scheme emulation is configurable in multiple place (project and test configuration). I only took it it as a fixture example.

But now your fixture still lives in the same file as your test. It's time to restructure things.

```
tests
  |_ my-setup.ts
  |_ example.spec.ts
```

Create a new `my-setup.ts` file and export your extended `test` object and also `expect`.

```typescript
import { test as base, Page } from "@playwright/test";

type MyFixtures = {
  darkPage: Page;
};

export const test = base.extend({
  darkPage: async ({ browser }, use) => {
    // your fixture logic
  },
});

export { expect } from "@playwright/test";
```

And import `test` and `expect` from your spec files.

```javascript
import { test, expect } from './my-setup'

// all your test logic
test.describe("A light and dark mode page", () => {
  // `darkPage` is now available here
  test("has title", async ({ darkPage }) => {
    // ...
  });
});
```

And you made it! You now have a `my-setup` file that can be reused across tests and is able to hold all your custom logic.

## 🏗️ Action time with the good old Danube shop (or your own site)

**Tasks**

- [ ] Restructure your existing tests to implement a `loggedInPage` fixture that is automatically logged in and logs itself out after it was used in a test.

> **Note** If you want to share login state across test runs, [check the Playwright docs](https://playwright.dev/docs/auth).
