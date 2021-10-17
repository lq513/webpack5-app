const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: false,
  plugins: [
  ],
});
