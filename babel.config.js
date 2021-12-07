module.exports = api => {
  const dev = api.env('development'); // node -> mode
  // This caches the Babel config by environment.
  api.cache.using(() => process.env.NODE_ENV);
  console.log(dev, 'babel-api');
  return {
    'presets': [
      [
        '@babel/preset-env',
        {
          'corejs': '3',
          // "modules": "commonjs",
          'modules': false,
          // "targets": {
          //   "esmodules": true // 不会引用core.js 的polyfill了
          // },
          'useBuiltIns': 'usage', // This option configures how @babel/preset-env handles polyfills.
        },
      ],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    'plugins': [
      ...dev ? [require.resolve('react-refresh/babel')] : [],
      ['@babel/plugin-proposal-decorators', { 'legacy': true }],
      [
        'import', {
          'libraryName': 'antd-mobile',
          'style': true, // less 体积较小
          // "customStyleName": (name) => {
          //   console.log(name, 1111)
          //   return require('path').resolve(__dirname, './common/style/index.css');
          // }
        }, 
      ],
    ],
  };
};
