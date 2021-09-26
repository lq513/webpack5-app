const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../page/index.js'),
  output: {
    filename: '5.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../utils'), // 要绝对路径
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: 'awesome-typescript-loader',
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            // 编译es6语法 && 编译react
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        exclude: /node_moudles/,
      },
      {
        test: /(png|jpg|gif)/,
        loader: 'file-loader',
      },
    ],
  },
};
