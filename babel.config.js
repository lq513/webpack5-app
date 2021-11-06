module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "corejs": "3",
        // "modules": "commonjs",
        "modules": false,
        // "targets": {
        //   "esmodules": true // 不会引用core.js 的polyfill了
        // },
        "useBuiltIns": "usage" // This option configures how @babel/preset-env handles polyfills.
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    [
      "import", {
        "libraryName": "antd-mobile",
        "style": true, // less 体积较小
        // "customStyleName": (name) => {
        //   console.log(name, 1111)
        //   return require('path').resolve(__dirname, './common/style/index.css');
        // }
      } 
    ]
  ]
}