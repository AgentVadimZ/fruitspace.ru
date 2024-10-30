import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js'
})

// const withPWA = require("next-pwa")({
//   dest: "public",
//   disable: process.env.NODE_ENV === "development",
// })

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
  // output: "standalone",
  // transpilePackages: [
  //     '@ant-design',
  //     'antd'
  // ]
}

// module.exports = withPWA(
//     withNextra(nextConfig)
// )

export default withNextra(nextConfig)