// @ts-check
const { test, expect } = require("./my-setup");

test.describe("danube tests", () => {
  test("block images", async ({ pageWithoutImages }, testInfo) => {
    await pageWithoutImages.getByText("Haben oder haben").click();
    const screenshot = await pageWithoutImages.screenshot();
    await testInfo.attach("screenshot", {
      body: screenshot,
      contentType: "image/png",
    });
  });

  test("mock a request", async ({ page }) => {
    await page.route("**/api/books", (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify([
          {
            id: 1,
            title: "My book!",
            author: "Stefan",
            genre: "joooo",
            price: "9.95",
            rating: "★★★★☆",
            stock: "1",
          },
        ]),
      })
    );
    await page.goto("https://danube-web.shop/");
    await page.screenshot({ path: "home.png" });
  });
});
