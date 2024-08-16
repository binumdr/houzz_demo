const { test, expect } = require('@playwright/test')
const {rName} = require('./link/func_data')

test('Login with an Invalid User', async ({ page }) => {
    await page.goto('https://saucedemo.com/v1/index.html')
    await expect(page).toHaveTitle('Swag Labs')
    await page.fill('#user-name', rName())
    await page.fill('#password', 'invalid_password')
    await page.click('#login-button')
    await expect(page.locator('[data-test="error"]')).toBeVisible()
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service')
})