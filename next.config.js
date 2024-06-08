/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}

const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./i18n/i18n.ts')

module.exports = withNextIntl(nextConfig)
