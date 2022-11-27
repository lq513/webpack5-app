const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseConfig = require('./webpack.base');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// 执行路径
console.log(
  '\x1b[91m',
  '\n路径：', path.resolve('./'),
  '\nNODE_ENV：', process.env.NODE_ENV,
);
module.exports = (env) => {
  console.log(
    '\nwebpack-env：', env,
    '\n', process.argv,
    '\n___________________________________________________',
  );

  return merge(baseConfig, {
    mode: 'development',
    target: 'web', // 提高开发构建速度
    devtool: 'eval-cheap-module-source-map',
    output: {
      publicPath: '/',
    },
    module: {
      rules: [
        // {
        //   test: /\.tsx?$/,
        //   use: {
        //     loader: path.resolve(__dirname, './extension/loader.js'),
        //   },
        //   include: path.resolve(__dirname, '../page/index.tsx'),
        // },
        {
          test: /\.(t|j)sx?/,
          use: {
            loader: 'babel-loader',
            // options: { transpileOnly: true },
          },
          exclude: /node_modules/,
        },
      ],
    },
    devServer: {
      port: 9000,
      hot: true, // v4后不用引入webpack.HotModuleReplacementPlugin
      open: true,
      // When using the HTML5 History API, the index.html page will likely have to be served in place of any 404 responses.
      historyApiFallback: true,
      client: {
        progress: true,
      },
      // contentBase 被static替换，默认public，作用：修改serve路径
      // static: './',
      // host: 'local-ip', // 域名
      onListening: (devServer) => {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }
        devServer.app.get('/activity/lottery', (req, res) => {
          const id = Math.floor(Math.random() * 6) + 1;
          res.json({
            code: '200',
            chance: 100,
            reward: {
              rewardName: `奖品${id}`,
              rewardId: id,
              pic: '',
              jumpUrl: '',
            },
          });
        });
        const port = devServer.server.address().port;
        console.log('Listening on port:', port);
      },
    },
    plugins: [
      // new BundleAnalyzerPlugin(),

      // https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/481
      new ReactRefreshWebpackPlugin({
        // overlay: false,
        // overlay: {
        //   sockHost: '172.20.10.5',
        //   sockHost: '172.20.10.5',
        // },
      }),
      new webpack.DefinePlugin({
        $DEV: 'true',
      }),
    ],
    optimization: {
    },
  });
};
