import { test, expect } from '@playwright/test'

// Tests suite for checking the availability of the pages

// Homepage
test('should navigate to the homepage', async ({ page }) => {
  // Go to the homepage
  await page.goto('/')

  // Check if the title is visible
  await expect(page.locator('h1')).toContainText('Optional subjects UVT')
})

// Subjects page
test('should navigate to the subjects page', async ({ page }) => {
  // Go to the subjects page
  await page.goto('/subjects')

  // Check if the title is visible
  await expect(page.locator('h1')).toContainText(
    'Check out all of our UVT optional subjects:',
  )
})

// Feedback page
test('should navigate to the feedback page', async ({ page }) => {
  // Go to the feedback page
  await page.goto('/feedback')

  // Check if the title is visible
  await expect(page.locator('h1')).toContainText(
    'Let us know about your experience with MO-UVT',
  )
})
