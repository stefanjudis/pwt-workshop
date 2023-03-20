// @ts-check
const { test, expect } = require("./my-setup");

test.describe("danube tests", () => {
  test("attach stuff to your test reports", async ({
    loggedInPage,
  }, testInfo) => {
    let productName;

    await test.step("Add to cart", async () => {
      await loggedInPage.getByText("Haben oder haben").click();

      const detailContainer = loggedInPage.locator(".detail-content");
      const productHeading = detailContainer.getByRole("heading", { level: 2 });
      productName = await productHeading.first().innerText();

      await loggedInPage.getByRole("button", { name: "Add to cart" }).click();
    });

    await test.step("Cart assertions", async () => {
      const cartContainer = loggedInPage.locator(".cart");
      await expect(cartContainer.getByText(`1x, ${productName}`)).toBeVisible();

      const screenshot = await loggedInPage.screenshot();
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
