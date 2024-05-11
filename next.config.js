const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config)=>{
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    })
    return config
  },
  headers: async ()=>[
    {
      source: '/:path*{/}?',
      headers: [
        {
          key: 'Referrer-Policy',
          value: 'no-referrer',
        },
      ],
    },
  ],
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'ru',
    localeDetection: false,

    domains: [
      {
        domain: 'fruitspace.ru',
        defaultLocale: 'ru',
      },
      {
        domain: 'fruitspace.one',
        defaultLocale: 'en'
      }
    ]
  },
  output: "standalone",
  // transpilePackages: [
  //     '@ant-design',
  //     'antd'
  // ]
}

module.exports = withNextra(nextConfig)
