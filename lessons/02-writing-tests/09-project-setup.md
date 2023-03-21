# Playwright configuration
> Everything needs to be configurable.

Suppose the number of test grows, how will you structure and group all your tests? Which data shouldn't go into your tests?

There's no one-fits-all solution, but here are some recommendations.

## Sensitive information and preview URLs should be handled by the environment

Credentials and URL configuration don't belong into your test code. Luckily, you can always access `process.env` from within your tests.

```javascript
// example.spec.js
test(`example test`, async ({ page }) => {
  // ...
  await page.getByLabel('User Name').fill(process.env.USERNAME);
  await page.getByLabel('Password').fill(process.env.PASSWORD);
});
```

And configure your tests from the command line.

```bash
USERNAME=me PASSWORD=secret npx playwright test
```

## More granular configuration with projects

After bootstraping a new Playwright project, the `projects` configuration only included projects for different browsers. But it can do way more than configuring browsers!

```javascript
// bootstrap projects
module.exports = defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    //...
  ]
});
```

Projects and fixtures are highly configurable on multiple levels.

### Three levels of test configuration

There are three levels to configure your Playwright tests.

1. Global — `config.use`
2. Project — `config.project.use`
3. Test — `test.use()`

For example, to configure which browser engine, viewport size or user-agent to use, here's a `playwright.config.js` running Chromium by default for all tests in `testDir`, but runs Safari tests defined in a different project.

```javascript
module.exports = defineConfig({
  testDir: "./tests",
  use: {
    // make Chrome the default test browser
    ...devices["Desktop Chrome"],
  },

  projects: [
    {
      name: "base",
    },

    {
      name: "base-webkit",
      // overwrite viewport, user-agent etc for this project
      use: { ...devices["Desktop Safari"] },
    },
});
```

You can run all projects or only project-specific tests.

```
$ npx playwright test                       # all tests run (Chrome & Safari)
$ npx playwright test --project=base        # only "base" tests in default config (Chrome)
$ npx playwright test --project=base-webkit # only "base-webkit" tests with specific settings (Safari)
```

### Configuration via test projects and fixtures

Sometimes it makes sense to group your tests and only run them in certain situations. Some example are:

- smoke vs default tests
- fully parallel vs serial tests
- same but differently configured tests against staging or production environments

There are many possibilities to group your tests and run them with different configuration.

```javascript
// playwright.config.js
// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  projects: [
    {
      name: 'Smoke',
      // only run smoke tests
      testMatch: /.*smoke.spec.ts/,
      retries: 0,
    },
    {
      name: 'Default',
      // don't run smoke tests
      testIgnore: /.*smoke.spec.ts/,
      retries: 2,
    },
  ],
});
```

### Custom project and fixture options

Personally, I like to make my fixtures configurable on a project level.

Here is a configuration to run tests in normal and "strict" mode. In strict mode every `console` message or page exception will lead to a test failure.

```javascript
// playwright.config.js
// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  projects: [
    {
      name: "base",
    },

    {
      name: "strict",
      use: { noJsErrors: true, noJsLogs: true },
    },
  ],
});
```

These projects run the same files, but with different configuration.

```bash
$ npx playwright test                  # all tests run (base & strick)
$ npx playwright test --project=base   # only "base" tests run
$ npx playwright test --project=strict # only "strict" tests run
```

How can you define custom project and fixture parameters? Head over to your setup file (`my-setup.js`) where you defined your `loggedInPage` fixture. You can also define custom options and configuration in there.

```javascript
// ./my-setup.js
const base = require('@playwright/test');

exports.test = base.test.extend({
  // define `false` default value
  noJsErrors: [false, { option: true }],
  // define `false` default value
  noJsLogs: [false, { option: true }],

  // ...
})

exports.expect = base.expect;
```

The `noJsErrors` and `noJsLogs` are then available in your tests and even other fixtures.

```javascript
// example.spec.js
// @ts-check
const { test, expect } = require("./my-setup");

test.describe("danube tests", () => {
  test("add to cart", async ({ page, noJsErrors }) => {
    if (noJsErrors) {
      // ...
    }
  });
});
```

And if you need to, you can even overwrite these option per test file or group.

```javascript
// example.spec.js
// @ts-check
const { test, expect } = require("./my-configurable-setup");

test.describe("danube tests", () => {
  // overwrite project options
  test.use({noJsErrors: false})

  test("add to cart", async ({ page, noJsErrors }) => {
    // ...
  });
});
```

> **Note** If you want to read more about paramterized tests, [find more info in the Playwright docs](https://playwright.dev/docs/test-parameterize).

## 🏗️ Action time with the good old Danube shop (or your own site)

**Tasks**

- [ ] Use environment variables to log into Danube
- [ ] Implement a `base` and `strict` project configuration with `noJsErrors` and `noJsLogs` options

-------

## You made it!

If you have anymore questions, let me know!

Here are some more resources:

- [Checkly Playwright tips](https://www.checklyhq.com/learn/headless/)
- [Checkly weekly Playwright YT tip](https://www.youtube.com/channel/UCJ4R8axyKuPZdJ7lFll3SKQ)
- [The Playwright community](https://playwright.dev/community/welcome#community-discord)

Have run fun and happy end to end testing!
