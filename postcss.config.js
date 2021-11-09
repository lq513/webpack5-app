const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer,
    [
      'postcss-preset-env',
      {
        // 其他选项
      },
    ],
  ],
};