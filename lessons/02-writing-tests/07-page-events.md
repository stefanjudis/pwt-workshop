# Page events

The `page` fixture provides multiple events to monitor what's happening. These can be valuable to confirm alerts, catch log messages or monitor JavaScript excpetions.

## [`page.on('dialog')`](https://playwright.dev/docs/api/class-page#page-event-dialog)

Confirm dialogs.

```javascript
page.on('dialog', dialog => {
  dialog.accept();
});
```

## [`page.on('console'`](https://playwright.dev/docs/api/class-page#page-event-console)

Capture JavaScript `console.log` messages.

```javascript
page.on('console', async msg => {
  const values = [];
  for (const arg of msg.args())
    values.push(await arg.jsonValue());
  console.log(...values);
});
await page.evaluate(() => console.log('hello', 5, {foo: 'bar'}));
```
## [`page.on('pageerror')`](https://playwright.dev/docs/api/class-page#page-event-page-error)

Log all uncaugt errors to the terminal.

```javascript
page.on('pageerror', exception => {
  console.log(`Uncaught exception: "${exception}"`);
});

await page.goto('data:text/html,<script>throw new Error("Test")</script>');
```

> **Note** There are way more page events to react to. [Find more events in the Playwright documentation](https://playwright.dev/docs/api/class-page#page-event-page-error).
## 🏗️ Action time with the good old Danube shop (or your own site)

**Tasks**

- [ ] Implement a fixture that logs console logs and page errors
