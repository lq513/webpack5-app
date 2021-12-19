const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer,
    [
      // https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md
      'postcss-px-to-viewport',
      {
        viewportWidth: 375,
        viewportUnit: 'vmin',
      },
    ],
    [
      'postcss-preset-env',
      {
        // 其他选项
      },
    ],
  ],
};