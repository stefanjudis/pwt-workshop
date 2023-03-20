// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("danube tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://danube-web.shop/");
    await page.getByRole("button", { name: "Log in" }).click();
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill("user@email.com");
    await page.getByPlaceholder("Email").press("Tab");
    await page.getByPlaceholder("Password").fill("supersecure1");
    await page.getByRole("button", { name: "Sign In" }).click();
  });

  test("attach stuff to your test reports", async ({ page }, testInfo) => {
    let productName;

    await test.step("Add to cart", async () => {
      await page.getByText("Haben oder haben").click();

      const detailContainer = page.locator(".detail-content");
      const productHeading = detailContainer.getByRole("heading", { level: 2 });
      productName = await productHeading.first().innerText();

      await page.getByRole("button", { name: "Add to cart" }).click();
    });

    await test.step("Cart assertions", async () => {
      const cartContainer = page.locator(".cart");
      await expect(cartContainer.getByText(`1x, ${productName}`)).toBeVisible();

      const screenshot = await page.screenshot();
      await testInfo.attach("screenshot", {
        body: screenshot,
        contentType: "image/png",
      });

      testInfo.annotations.push({
        type: "A test with an attached image!",
        description: "Nothing more to add.",
      });
    });
  });
});
