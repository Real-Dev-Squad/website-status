const withSass = require('@zeit/next-sass');
const withTypescript = require('@zeit/next-typescript');

exports = module.exports = withSass(
  withTypescript({
    distDir: '../dist',
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]___[hash:base64:5]",
    }
  })
);
