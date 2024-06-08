import { test, expect } from '@playwright/test'

// Tests suite for checking the availability of the pages
// than can be accessed by an authenticated user

// Test the main admin page
test('should navigate to the admin page', async ({ page }) => {
  await page.goto('/en/admin')
  await expect(page.locator('h1')).toContainText('Administration dashboard')
})

// Test the admin subpages

const subpages = [
  'faculties',
  'groups',
  'specializations',
  'students',
  'subjects',
  'users',
]

subpages.forEach((subpage) => {
  test(`should navigate to the admin ${subpage} page`, async ({ page }) => {
    const response = await page.goto(`/en/admin/${subpage}`)
    expect(response?.status()).toBe(200)
  })
})
