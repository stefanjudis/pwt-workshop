# Project structure

To configure you tests the global configuration file is `playwright.config.js` but you can configure and parameterize your tests on multiple levels:

- global config
- project config
- test file config

## Different tests for different use cases

Leverage projects to run different tests.

```javascript
// playwright.config.js
// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 60000, // Timeout is shared between all tests.
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

These projects are then available to run via the command line:

```bash
$ npx playwright test                     # all projects
$ npx playwright test --project=Smoke   # "Smoke" project tests
$ npx playwright test --project=Default # "Default" project tests
```

## Custom project parameters

Do you remember your `my-setup` file. This setup file can be used to parameterize your tests.

Go ahead and define a new `myConfigParam`.

```javascript
// my-setup.js

const base = require('@playwright/test');

exports.test = base.extend({
  // register a new parameter
  myConfigParam: [42, {option: true}]
});

exports.expect = base.expect;
```

Now you can redefine and configure your custom parameter in your `playwright.config.js`.

```javascript
// playwright.config.js

module.exports = defineConfig({
  projects: [
    {
      name: 'default',
    },
    {
      name: 'different',
      use: { myConfigParam: 100 },
    },
  ]
});
```

After you've registered a new option, use your parameter in your tests by running different projects.

```
$ npx playwright test                     # all projects
$ npx playwright test --project=default   # "default" project tests
$ npx playwright test --project=different # "different" project tests
```

```javascript
test("without errors", async ({ myConfigParam }) => {
  // 42 or 100 depending on which project you run
  console.log(myConfigParam);
});
```
