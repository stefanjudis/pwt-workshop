# How to gather web performance metrics
> Interact with pages directly.

Unfortunately, Playwright doesn't have performance gathering built-in yet, but you can always leverage JavaScript and native browser APIs to implement desired functionality.

## Evaluate custom JavaScript in your page context - `page.evaluate`

If you discover functionality that's not provided by Playwright itself, you can always "go in" and run custom JavaScript in your page context.

```javascript
const result = await page.evaluate(() => {
  console.log(`Hey I'm running in the browser session`);
});
```

### Evaluate performance metrics

## Navigation timing

```javascript
const navigationTimingJson = await page.evaluate(() =>
    JSON.stringify(performance.getEntriesByType('navigation'))
  )
const navigationTiming = JSON.parse(navigationTimingJson)

console.log(navigationTiming)
```

## First contentful paint

```javascript
const paintTimingJson = await page.evaluate(() =>
    JSON.stringify(window.performance.getEntriesByType('paint'))
  )
const paintTiming = JSON.parse(paintTimingJson)

console.log(paintTiming)
```

## Largest contentful paint

```javascript
const largestContentfulPaint = await page.evaluate(() => {
  return new Promise((resolve) => {
    new PerformanceObserver((l) => {
      const entries = l.getEntries()
      // the last entry is the largest contentful paint
      const largestPaintEntry = entries.at(-1)
      resolve(largestPaintEntry.startTime)
    }).observe({
      type: 'largest-contentful-paint',
      buffered: true
    })
  })
})

console.log(parseFloat(largestContentfulPaint))
```

> **Note** Find more infos about these performance APIs in [our Checkly performance guides](https://www.checklyhq.com/learn/headless/basics-performance/).

## 🏗️ Action time with the good old Danube shop (or your own site)

**Tasks**

- [ ] Gather performance metrics and attach them to your test reports as an annotation.
