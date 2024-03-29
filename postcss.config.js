const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer,
    [
      // https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md
      'postcss-px-to-viewport',
      {
        viewportWidth: 375,
        fontViewportUnit: 'vmin', // 字体使用的视口单位
        viewportUnit: 'vmin',
        // propList: ['*', '!line-height'],
        // landscape: true, // 横屏未生效
        // landscapeUnit: 'vw',
        // landscapeWidth: 375,
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