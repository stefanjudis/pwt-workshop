# Getting started with `@playwright/test` (`PWT`)

Playwright started as an automation library used for web scraping and browser automation. But it quickly evolved to a full test runner and framework that's built to scale.

## Install Playwright Test

The best way to get started is the default `init` command.

```bash
$ npm init playwright@latest
```

Confirm that the installation succeeded by running your first PWT test.

```
$ npx playwright test

Running 6 tests using 5 workers
  6 passed (3.6s)

To open last HTML report run:

  npx playwright show-report
```

## `playwright.config.[ts|js]` — all these options! 🤯

Inspect the provided `playwright.config.[ts|js]` to familiarize yourself with all the possibilities.

During the workshop we'll look at:

- timeouts
- parallelism
- traces
- devices
- and much more.

-----

Let's get started and give you [a headstart by recording your first test](../02-recording-tests/README.md)!
