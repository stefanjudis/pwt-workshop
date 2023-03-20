// @ts-check
const { test, expect } = require("@playwright/test");

test("test", async ({ page }) => {
  await page.goto("https://danube-web.shop/");
  await page.getByText("Haben oder haben").click();

  const detailContainer = page.locator(".detail-content");
  const productHeading = detailContainer.getByRole("heading", { level: 2 });
  const productName = await productHeading.first().innerText();

  await page.getByRole("button", { name: "Add to cart" }).click();

  const cartContainer = page.locator(".cart");
  await expect(cartContainer.getByText(`1x, ${productName}`)).toBeVisible();
});
