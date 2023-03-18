# Record your first PWT test

## Record tests via the `playwright` command

```bash
$ npx playwright codegen https://danube-web.shop/
```

Click around and have fun. An example result could look as follows:

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
