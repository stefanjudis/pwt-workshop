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

### Two important locator characteristics

**Locators are strict** — a locator throws an exception if it matches multiple DOM elements.

> **Info**
> [Find more info in strictness in this YouTube video](https://www.youtube.com/watch?v=SMFuzmxxy8o&list=PLMZDRUOi3a8NtMq3PUS5iJc2pee38rurc).

**Locators are lazy** — every time a locator is used for an action, an up-to-date DOM element is located on the page.

> **Warning**
> Many people `await` locators. That's unnecessary because they're only holding a locator definition until they're used.

**Locators can be chained** — to narrow down your selection you can always filter and chain locators.

```
// Two different locators
const product = page.getByRole('listitem').filter({ hasText: 'Product 2' });
const button = product.getByRole('button', { name: 'Add to cart' });
```

## Actionability

