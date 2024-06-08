import { test as setup } from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ page }) => {
  await page.context().addCookies([
    {
      name: 'next-auth.session-token',
      value: process.env.TESTING_SESSION_COOKIES!,
      domain: 'localhost',
      path: '/',
    },
  ])

  await page.context().storageState({ path: authFile })
})
