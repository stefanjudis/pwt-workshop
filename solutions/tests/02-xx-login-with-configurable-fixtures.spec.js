// @ts-check
const { test, expect } = require("./my-configurable-setup");

test.describe("danube tests", () => {
  test.use({ isLoggedIn: false });

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
