const withSass = require("@zeit/next-sass");
const withTypescript = require("@zeit/next-typescript");
const withImages = require("next-images");

exports = module.exports = withSass(
  withImages(
    withTypescript({
      distDir: "../dist",
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]___[hash:base64:5]"
      }
    })
  )
);
