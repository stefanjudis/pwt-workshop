// @ts-check
const { test, expect } = require("./my-setup");

test.describe("danube tests", () => {
  test("largest contentful paint", async ({ page }, testInfo) => {
    const largestContentfulPaint = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((l) => {
          const entries = l.getEntries();
          // the last entry is the largest contentful paint
          const largestPaintEntry = entries.at(-1);
          resolve(largestPaintEntry.startTime);
        }).observe({
          type: "largest-contentful-paint",
          buffered: true,
        });
      });
    });

    testInfo.annotations.push({
      type: "Largest-contentful-paint",
      description: largestContentfulPaint,
    });
  });
});
