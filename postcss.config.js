module.exports = {
  plugins: [
    require('autoprefixer'),
    [
      'postcss-preset-env',
      {
        // 其他选项
      },
    ],
  ],
};