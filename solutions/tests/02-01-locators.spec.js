// @ts-check
const { test } = require("@playwright/test");

test("add to cart", async ({ page }) => {
  await page.goto("https://danube-web.shop/");
  await page.getByText("Haben oder haben").click();
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.getByRole("button", { name: "Checkout" }).click();
  await page.getByPlaceholder("Name", { exact: true }).fill("stefan");
  await page.getByPlaceholder("Surname").fill("judis");
  await page.getByPlaceholder("Address").fill("fdsafas");
  await page.getByPlaceholder("Zipcode").fill("12345");
  await page.getByPlaceholder("Zipcode").press("Tab");
  await page.getByPlaceholder("City").fill("berlin");
  await page.getByPlaceholder("City").press("Tab");
  await page.getByPlaceholder("Company (optional)").fill("Jooo");
  await page.getByLabel("as soon as possible").check();
  await page.getByRole("button", { name: "Buy" }).click();
  await page.getByText("All good, order is on the way. Thank you!!");
});
