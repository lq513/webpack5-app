# start
> npm install

> npm run dev

> npm run build

# routes
├─page                   # 活动页面 <br />
│  ├─autograph           # 签名 <br />
│  ├─home                # 主页面 <br />
│  ├─task                # 录屏测试 <br />
│  ├─test                # 测试功能 <br />
│  ├─tree                # 树组件（适用于pc端） <br />
│  ├─wheelDisc           # 转盘抽奖 <br />
│  └─routesConfig        # 路由配置 <br />
├─public                 # 静态资源 <br />
├─dps.config.js          # 骨架配置 <br />

# notice
1. 除了 './common/style' 下的样式文件和所有的.css文件均会被tree-shaking;
2. 生产环境css的sourceMap生成取决于devtool选项
3. 打包后如有报错（Uncaught ReferenceError: $RefreshSig$ is not defined）删除configcache文件后重试

# aim
6. 生产环境关闭react-dev-tools

# feature
1. react-router v6
2. 基于路由 dynamic
3. react-refresh
4. 友好的换肤功能
5. tree shaking

# babel配置对应打包体积
babel配置|size
---|:--:
esmodules,不引入regenerator-runtime|1361
未esmodules,引入regenerator-runtime|1387
esmodules,引入regenerator-runtime|1302
esmodules,不引入regenerator-runtime|1276

# tree shaking

> -: 未配置

modules|usedExports|sideEffects|生产|测试
---|:--:|:--:|:--:|---:
commonjs|true|false|❌|❌
commonjs|-|false|❌|❌
false|true|false|✔|✔
false|-|false|✔|❌
false|true|-|✔|✔

# babel-loader/ts-loader

loader|es6-es5|class|类装饰器|api
---|:--:|:--:|:--:|---:
babel|preset-env|preset-env||plugin
ts|target:es5|target:es5|✔|❌
