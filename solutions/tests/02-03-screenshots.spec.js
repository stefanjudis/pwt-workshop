// @ts-check
const { test, expect } = require("@playwright/test");

const SCREENSHOT_PATH = "./screenshots";

test("screenshot all the things", async ({ page, browserName }) => {
  await page.goto("https://danube-web.shop/");

  // normal page screenshot
  await page.screenshot({ path: `${SCREENSHOT_PATH}/home-${browserName}.png` });

  // full page screenshot
  await page.screenshot({
    path: `${SCREENSHOT_PATH}/home-${browserName}-full.png`,
    fullPage: true,
  });

  // a locator screenshot
  await page
    .locator(".shop-content")
    .screenshot({ path: `${SCREENSHOT_PATH}/list-${browserName}.png` });

  // a masked screenshot
  await page.screenshot({
    path: `./screenshots/list-${browserName}-masked.png`,
    fullPage: true,
    mask: [page.locator(".shop-content .preview")],
  });
});

test("snapshot the page", async ({ page }) => {
  await page.goto("https://danube-web.shop/");

  // snapshot the entire home page
  await expect(page).toHaveScreenshot("home.png");

  // snapshot a particular area
  await expect(page.locator(".shop-content")).toHaveScreenshot("list.png");

  // snapshot a particular area but mask things out
  await expect(page.locator(".shop-content")).toHaveScreenshot(
    "list-mask.png",
    {
      mask: [page.locator(".shop-content .preview")],
    }
  );
});
