TODO visual regression testing

## Example with the good old Danube shop

```javascript
// 👍
await expect(page.getByText('welcome')).toBeVisible();

// 👎
expect(await page.getByText('welcome').isVisible()).toBe(true);
```

await expect.soft(page.getByTestId('status')).toHaveText('Success');
