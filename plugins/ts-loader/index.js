/* eslint-disable no-undef */
module.exports = function () {
  return {
    name: 'loaders',
    configureWebpack() {
      return {
        module: {
          rules: [
            {
              test: /\.tsx?$/,
              exclude: /node_modules/,
              loader: 'ts-loader',
            },
          ],
        },
      };
    },
  };
};
