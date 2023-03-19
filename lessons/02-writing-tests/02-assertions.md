# Check that your site works correctly

Due to auto-waiting mechanisms, a recorded test case tests many web functionality and critical user flows already. To nail down implementation details and test for data correctness, you need to add assertions.
## Generic vs async assertions (web-first assertions)

Playwright Test provides an assertion library out of the box.

```javascript
import { test, expect } from '@playwright/test';
```

`expect` produces generic and async assertions.

[Generic matchers are synchronous](https://playwright.dev/docs/api/class-genericassertions) and are valuable for simple comparisons such as comparing two numbers.

```javascript
// a synchronous generic assertion
expect(number).toBe(2)
```

But to test, web functionality async assertions come as a handy alternative. Playwright's web-first assertions are tailored to the web and asynchronous. They're based on similar auto-waiting principles and wait / retry until a condition is met or the time out is reached.

```javascript
// an asynchronous web-first assertion
// this assertion waits / retries until the located element becomes visible
await expect(page.getByText('welcome')).toBeVisible();
```

If you're testing websites, web-first assertions are more convenient to write and leverage PWT's core functionality.

```javascript
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // 👎
  // test a condition at a single moment in time
  expect(await page.getByText('welcome').isVisible()).toBe(true);

  // 👍
  // wait for a condition to become truthy over time
  await expect(page.getByText('welcome')).toBeVisible();
});
```

## Assertion essentials

There are some core things to know about assertions.
### Configurable timeouts

Web-first assertions have a timeout config option if things take longer.

```javascript
await expect(page.getByText('welcome')).toBeVisible({timeout: 10_000})
```

> **Note**
> The default timeout is 5s and can be changed on a project basis in your Playwright config under `expect.timeout`.

### Soft assertions

[Soft assertions (`expect.soft`)](https://playwright.dev/docs/test-assertions#soft-assertions) are a handy way to fail your test case but don't stop it.

```javascript
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // If this assertion fails the test case will be marked as failed
  await expect.soft(page.getByTestId('status')).toHaveText('Success');

  // But all the following actions will still be executed and tested
  // ...
})
```
![Soft assertion example in the HTML report](../../assets/02-02-soft-assertions.png)

### Custom assertion messages

To make your assertions more readable you can also define a custom message.

```javascript
await expect.soft(page, 'should have an awesome title').toHaveTitle('wrong title');
```

![Custom assertion message](../../assets/02-02-assertion-message.png)

## ❗ Auto-waiting is the most important core principle in Playwright Test

With the built-in auto-waiting mechanisms you rarely have to implement manual `waitFor` statements.

```javascript
// click() waits for the element to be actionable
// click() waits for a triggered navigation to complete
await locator.click();

// wait for the assertion to become truthy or time out
await expect(anotherLocator).toBeVisible();
```

> **Note**
> Unless you want to explicitely wait for a particular URL to be loaded after a navigation there's little benefit in calling `page.waitForUrl` or similar methods.

## 🏗️ Action time with the good old Danube shop (or your own site)

**Task**


