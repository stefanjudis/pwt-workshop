# Check that your site works correctly

After recording your test case, you're already testing that the site works properly. To nail down details you need to add assertions.
## Generic vs async assertions (web-first assertions)

The auto-waiting concept also applies when you start adding assertions to your tests.

[Generic matchers a synchronous](https://playwright.dev/docs/api/class-genericassertions). Async assertions come as a handy alternative.

Web-first assertions wait and retry until the condition is met or the time out is reached.

```javascript
await expect(page.getByText('welcome')).toBeVisible();
```
In general, web-first assertions are more convenient to write and leverage PWT's core functionality.

```javascript
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // 👎
  expect(await page.getByText('welcome').isVisible()).toBe(true);

  // 👍
  await expect(page.getByText('welcome')).toBeVisible();
});
```

### How to adjust timeouts

Async matchers have a timeout config option.

```javascript
await expect(page.getByText('welcome')).toBeVisible({timeout: 10_000})
```

> **Note**
> The default timeout is 5s and can be changed in your Playwright config under `expect.timeout`.

### Tweak assertions

Soft assertions (`expect.soft`) are a handy way to fail your test case but don't stop it.

```javascript

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // If this assertion fails the test case will be marked as failed
  await expect.soft(page.getByTestId('status')).toHaveText('Success');

  // But all the following actions will still be executed and tested
  // ...
})
```


## Auto-waiting is the most important core principle in PWT

With the built-in auto-waiting mechanisms you rarely have to implement manual `waitFor` statements.

```javascript
// waits and retries until this locator is actionable
// waits for possible navigations
await locator.click();

// waits for for this element to become visible
await expect(anotherLocator).toBeVisible();
```

## Example with the good old Danube shop


