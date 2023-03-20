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
});
