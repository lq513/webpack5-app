1. 配置postcss
2. 代码分离
3. 样式文件未解析
4. 配置css modules
5. 配置路由
6. 动态导入
7. tree shaking
8. 建立静态文件夹
9. 选用ts-loader还是babel处理ts

# babel 是否开启babel
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


