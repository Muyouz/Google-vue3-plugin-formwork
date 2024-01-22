const { merge } = require('webpack-merge');
const baseConfig = require('./vue.config.base.js');
const devConfig = require('./vue.config.dev.js');
const prodConfig = require('./vue.config.prod.js');

module.exports = function () {
  switch (process.env.NODE_ENV) {
    case 'development':
      return merge(baseConfig, devConfig);
    case 'production':
      return merge(baseConfig, prodConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
}