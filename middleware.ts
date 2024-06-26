import createMiddleware from 'next-intl/middleware'
import { locales, localePrefix } from './i18n/navigation'

export default createMiddleware({
  defaultLocale: 'ro',
  localePrefix,
  locales,
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ro|en)/:path*'],
}
