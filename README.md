# notice
1. 除了 './common/style' 下的样式文件和所有的.css文件均会被tree-shaking;
2. 生产环境css的sourceMap生成取决于devtool选项
3. npm 安装依赖

# aim
2. 生产环境提取css文件，并压缩
4. 选用ts-loader还是babel处理ts
5. 修改ant-design默认样式
6. 生产环境关闭react-dev-tools

# feature
1. react-router v6
2. 基于路由dynamic
3. react-refrech
4. 

# issue

# 
-|size
---|:--:
未esmodules,未引入regenerator-runtime|1361
未esmodules,引入regenerator-runtime|1387
esmodules,引入regenerator-runtime|1302
esmodules,未引入regenerator-runtime|1276

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

