# Start interacting with websites

So far, you've only recorded tests. It's time to understand how PWT handles interactions.

[Playwright's core is based on locators](https://playwright.dev/docs/locators).

## Locators

The Playwright team highly encourages the usage of "user-first" locators to be as close to the end-user experience as possible. The recommended locators are:

- `page.getByRole()` (user first)
- `page.getByText()` (user first)
- `page.getByLabel()` (user first)
- `page.getByPlaceholder()` (user first)
- `page.getByAltText()` (user first)
- `page.getByTitle()` (user first)
- `page.getByTestId()` ("qa first")

> **Note**
> Use the code generation tools to create locators and tweak them as needed.

If these don't fit your need, [check other locators](https://playwright.dev/docs/other-locators).

### Important locator characteristics

#### Locators are strict

A locator throws an exception if it matches multiple DOM elements.

> **Note**
> [Find more info in strictness in this YouTube video](https://www.youtube.com/watch?v=SMFuzmxxy8o&list=PLMZDRUOi3a8NtMq3PUS5iJc2pee38rurc).

#### Locators are lazy

Every time a locator is used for an action, an up-to-date DOM element is located on the page.

> **Warning**
> Many people `await` locators. That's unnecessary because they're only holding a locator definition until they're used.

#### Locators can be chained

To narrow down your selection you can always filter and chain locators.

```javascript
// The `button` locator reuses the `product` locator
const product = page.getByRole('listitem').filter({ hasText: 'Product 2' });
const button = product.getByRole('button', { name: 'Add to cart' });
```

## Actionability

[Playwright provides action methods for all common user interactions](https://playwright.dev/docs/input). But the most important concept when it comes to PWT is that actions auto-wait.

`await locator.click()` waits until:

- element is attached to the DOM
- element is visible
- element is stable, as in not animating
- element is able to receive events (not obscured by other elements)
- element is enabled (no `disabled attribute)

Additionally, when an action is performed it'll wait until possible navigations are completed.

```javascript
// Concept 1:
// Click will auto-wait for a triggered navigation to complete
await page.getByText('Login').click();

// Concept 2:
// Fill will auto-wait for element to be actionable
await page.getByLabel('User Name').fill('John Doe');
```
> **Note**
> These concepts allow you to drop many manual `waitFor` statements and make your tests more resilient.

## Example with the good old Danube shop

TODO
