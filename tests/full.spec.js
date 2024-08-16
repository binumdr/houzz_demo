const { test, expect } = require('@playwright/test');
const {rFName} = require('./link/func_data')
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

test('Login with a Valid User', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/index.html')
    await page.fill('#user-name', rFName())
    await page.fill('#password', 'secret_sauce')
    await page.click('#login-button')
    await expect(page).toHaveURL(/.*\/inventory/)
    await page.waitForTimeout(5000)
    await expect(page.locator('.inventory_list')).toBeVisible()
})

test('Filter Products by Size and Price', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/inventory.html')
    await page.selectOption('.product_sort_container', 'za')
    await page.waitForTimeout(5000)
    await expect(page.locator('.inventory_list')).toBeVisible()
    await page.waitForTimeout(5000)
    await expect(page.locator('#item_3_title_link > .inventory_item_name')).toContainText('Test.allTheThings() T-Shirt (Red)')
    await page.selectOption('.product_sort_container', 'lohi')
    await page.waitForTimeout(5000)
    await expect(page.locator('.inventory_list')).toBeVisible()
    await page.waitForTimeout(1000)
    await expect(page.locator('#item_2_title_link > .inventory_item_name')).toContainText('Sauce Labs Onesie')
})

test('Add Item to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/inventory.html')
    await page.waitForTimeout(3000)
    await page.locator('.inventory_list > :nth-child(4)').hover()
    await page.click('.inventory_list > :nth-child(4) .btn_primary')
    await page.waitForTimeout(3000)
    await page.locator('.inventory_list > :nth-child(2)').hover()
    await page.click('.inventory_list > :nth-child(2) .btn_primary')
    await page.waitForTimeout(1000)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.click('#shopping_cart_container > a > svg > path')
    await page.waitForTimeout(1000)
    await expect(page.locator('#cart_contents_container')).toContainText('Sauce Labs Fleece Jacket')
    await expect(page.locator('#cart_contents_container')).toContainText('Sauce Labs Bike Light')   
})

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
})