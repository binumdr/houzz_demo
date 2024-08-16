const { test, expect } = require('@playwright/test');
const {rFName} = require('./link/func_data')

test('Login with a Valid User', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/index.html')
    await page.fill('#user-name', rFName())
    await page.fill('#password', 'secret_sauce')
    await page.click('#login-button')
    await expect(page).toHaveURL(/.*\/inventory/)
    await page.waitForTimeout(5000)
    await expect(page.locator('.inventory_list')).toBeVisible()
})