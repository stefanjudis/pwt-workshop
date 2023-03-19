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
    console.log("Before each");
  });
  test.afterAll(async () => {
    console.log("After tests");
  });
});

```

> **Warning** There are multiple `beforeAll` and `afterLogs` logs — what's up?
> Playwright tries to run as many tests in parallel as possible. This can be configured on a project or test level. We'll look into this in a moment.

TODO parallelism
TODO fixme, only, etc.
