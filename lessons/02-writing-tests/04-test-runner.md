# The Playwright Test runner

So far, we've only looked at the internals of a particular test run. But how can you control when and how tests are run?

## `test` / `test.describe`

Suppose your test files grow you can always introduce a cleaner grouping using `test.describe`.

```javascript
import { test, expect } from "@playwright/test";

test.describe("playwright", () => {
  test("has title", async ({ page }) => {
    // ...
  });

  test("get started link", async ({ page, browserName }) => {
    // ...
  });
});
```

## `beforeAll`, `beforeEach`, `afterEach`, `afterAll`

Playwright provides the common test runner methods your might be familiar with.

```javascript
import { test, expect } from "@playwright/test";

test.describe("playwright", () => {
  test.beforeAll(async () => {
    console.log("Before tests");
  });

  test.beforeEach(async () => {
    console.log("Before each");
  });

  test("has title", async ({ page }) => {
    // ...
  });

  test("get started link", async ({ page, browserName }) => {
    // ...
  });

  test.afterEach(async () => {
    console.log("After each");
  });

  test.afterAll(async () => {
    console.log("After tests");
  });
});

```

> **Warning** Suppose you see multiple `beforeAll` and `afterAll` logs, what's happening?
> Playwright tries to run as many tests in parallel as possible. These test runs are executed in different processes so that `beforeAll` and `afterAll` need to be ran multiple times. We'll look into parallelism in a moment.

> **Note** Even though you might be used to `beforeEach` and `afterEach`, custom fixtures are a handy alternative to structure tests and provide similar functionality across files. More on that later....
## Handy testing utility methods

### `test.only`

### `test.skip`

### `test.fixme`

TODO parallelism
TODO fixme, only, etc.
