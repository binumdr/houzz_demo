const { test, expect } = require('@playwright/test');

test.describe('Checkout Tests', () => {
  test('Perform Checkout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/inventory.html')
    await page.locator('.inventory_list > :nth-child(4)').hover()
    await page.click('.inventory_list > :nth-child(4) .btn_primary')
    await page.locator('.inventory_list > :nth-child(2)').hover()
    await page.click('.inventory_list > :nth-child(2) .btn_primary')
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.click('#shopping_cart_container > a > svg > path')
    await page.waitForTimeout(1000)
    await expect(page.locator('#cart_contents_container')).toContainText('Sauce Labs Fleece Jacket')
    await expect(page.locator('#cart_contents_container')).toContainText('Sauce Labs Bike Light')
    await page.locator('.cart_footer').hover()
    await page.click('.btn_action')
    await page.fill('[data-test="firstName"]', 'Binu')
    await page.fill('[data-test="lastName"]', 'Manandhar')
    await page.fill('[data-test="postalCode"]', '44811')
    await page.locator('.checkout_buttons').hover()
    await page.click('.btn_primary')
    await page.waitForTimeout(800)
    await expect(page).toHaveURL(/.*\/checkout-step-two/)
    await page.locator('.cart_footer').hover()
    await page.click('.btn_action')
    await expect(page).toHaveURL(/.*\/checkout-complete/)
    await expect(page.locator('.complete-header')).toBeVisible()
    await expect(page.locator('.complete-header')).toContainText('THANK YOU FOR YOUR ORDER')
  });
});