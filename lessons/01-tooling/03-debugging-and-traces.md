# Debug your Playwright tests
> Debugging with super powers.

To understand what your tests are doing, it's essential to be familiar with the provided debugging tools.

## Debug locally and during development

Leverage the command line or the VS Code extension to debug with ease.

### Debugging via the command line

![Debugging session in VS Code](../../assets/01-03-debugging-via-the-terminal.png)

Spin up the Playwright debugger with the `--debug` flag.

```
$ npx playwright test --debug
$ npx playwright test tests/example.spec.js --debug
```

Check all available test options via `npx playwright test --help`.

> **Note**
> To only run a single test in one file from the command line, [leverage `test.only`](https://playwright.dev/docs/api/class-test#test-only).

### Debugging in VS Code

![Debugging session in VS Code](../../assets/01-03-debugging-in-vs-code.png)

Run particular tests from within VS Code. It's more powerful than the terminal because it allows you to inspect variables and the surrounding scope.

Ensure that you have ticked `Show browser` to see what's happening.

![Show browser option](../../assets/01-03-show-browser.png)

## Debug remote tests running in CI/CD with traces

The debugger is a great way to develop your tests, but what about test runs that failed in a remote environment, in CI/CD or on your co-workers machine? Playwright test provides debugging traces for this case!

![Debugging a trace](../../assets/01-03-traces.png)

In default configuration Playwright is not collecting traces. But to learn what they're about, change your `playwright.config.js` to always collect a trace for every test.

```javascript
// playwright.config.js
module.exports = defineConfig({
  use: {
    trace: 'on',
  },
	// ...
});
```

Run your tests.

```
$ npx playwright test
```

This setting will now generate trace files for every single test. A trace file is a detailed recording of every step your test case performed — all debug information is available a `test-results/trace.zip`.

> **Note**
> Trace file generation slows Playwright down. It's recommend to only generate trace files for possibly failed and retried tests (`on-first-retry`).

But that's a `zip` file. What's next?

### Inspect traces via the command line

```
$ npx playwright show-trace test-results/example-has-title-webkit/trace.zip
```

The trace viewer provides all taken steps, a timeline and an HTML snapshot of the page. It's time travel debugging for your end-to-end tests.
### Inspect traces via the online trace viewer

But trace files aren't only accessible via the command line. If you have a trace `zip`, you can also always inspect it at [trace.playwright.dev/](https://trace.playwright.dev/).

------

## 🏗️ Action time with the good old Danube shop (or your own site)

**Task**

- [ ] Start a debug session to inspect what your tests are doing so far
- [ ] Generate and inspect traces for your generated test run

-----

These are the most important things to know about the provided Playwright Test tooling. [Let's have a look at important Playwright Test concepts](../02-writing-tests/01-locators-and-actionability.md).
