# Interfere with the network
> Take the network into consideration.

Playwright allows you to monitor and alter HTTP requests easily.

```javascript
// Subscribe to and log 'request' and 'response' events
page.on('request', request => console.log('>>', request.method(), request.url()));
page.on('response', response => console.log('<<', response.status(), response.url()));

await page.goto('https://example.com');
```

If you want to wait for a request to finish before continuing with your tests, [use `page.waitForResponse()`](https://playwright.dev/docs/api/class-page#page-wait-for-response).

```javascript
// Wait for a JPEG to be requested after a button click
const responsePromise = page.waitForResponse(/\.jpeg$/);
await page.getByText('Update').click();
const response = await responsePromise;
```

## Mock APIs and cancel requests

Suppose you want to only test your frontend, mocking APIs can speed up your tests tremendously. The [`page.route()`](https://playwright.dev/docs/api/class-page#page-route) method enables you inject yourself into the network layer and respond with test data.

```javascript
// Mock an API request
await page.route('**/api/fetch_data', route => route.fulfill({
  status: 200,
  body: {},
}));
await page.goto('https://example.com');
```

Additionally, if you're running many end-to-end tests it might be valuable to avoid loading images or block analytics requests. [`page.route()` can do that](https://playwright.dev/docs/api/class-page#page-route), too.

```javascript
// Block and abort all image requests
await page.route('**/*.{png,jpg,jpeg}', route => route.abort());
await page.goto('https://example.com');
await browser.close();
```

> **Note** Network handling has to be defined early in the `page` lifecycle. That's why you should place them in `beforeEach` or a custom fixture.

## 🏗️ Action time with the good old Danube shop (or your own site)

**Tasks**

- [ ] Implement a `pageWithoutImages` fixture to speed up your tests and block imags from loading and take a screenshot.
- [ ] Implement request mocking and put your name into the store by changing the `/api/books` request.


> **Note** Find more information on [how to handle network requests in the Playwright docs](https://playwright.dev/docs/network).
