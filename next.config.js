const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

const isProduction = process.env.NODE_ENV === "production";
const assetPrefix = isProduction ? "" : undefined;

module.exports = {
  ...withNextra(),
  images: {
    unoptimized: true,
  },
  assetPrefix,
  basePath: assetPrefix,
  trailingSlash: true,
};
