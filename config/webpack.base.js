const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../page/index.tsx'),
  output: {
    filename: 'ab[id].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
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
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
      },
    ],
  },
  // plugin: [
  //   new CopyWebpackPlugin(),
  // ],
};
