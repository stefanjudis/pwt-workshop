# Record your first PWT test

To give you a headstart PWT provides "test recording" functionality.
## Record tests via the `playwright` command

```bash
$ npx playwright codegen https://danube-web.shop/
```

Click around and see how your PWT script develops automatically.

![Record tests via codegen](../../../assets/01-02-recording-with-codegen.png)

## Record tests via the Playwright VS Code extension

Most of the CLI functionality is also available via [the official VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright).

Run and record your tests from within VS Code.

![Record tests in VS Code](../../../assets/01-02-recording-vs-code.png)

## Result

After a recorded session you should have the first test available and it should look as follows.

```javascript
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://danube-web.shop/');
  await page.locator('a').filter({ hasText: 'Crime & Thrillers' }).click();
  await page.locator('a').filter({ hasText: 'Sci-Fi' }).click();
  await page.locator('a').filter({ hasText: 'Fantasy' }).click();
});
```

> **Note**
> `codegen` can only record PWT actions. It's an invaluable tool to get started but to make your tests valuable you have to add assertions manually. **Playwright can't know what you want to test.**

-----

But how do you debug tests in a headless world? [Let's look at debugging and tracing](../03-debugging-and-traces/README.md).
