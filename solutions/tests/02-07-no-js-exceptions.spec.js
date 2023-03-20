// @ts-check
const { test, expect } = require("./my-setup");

test.describe("danube tests", () => {
  test("block images", async ({ page }, testInfo) => {
    await page.goto('data:text/html,<script>throw new Error("Test")</script>');
  });
});
