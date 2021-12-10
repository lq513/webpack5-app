# start
> npm install
> npm run dev

# routes
├─page                   # 活动页面
│  ├─autograph           # 签名（未完成）
│  ├─home                # 主页面
│  ├─task                # 录屏测试
│  ├─test                # 测试功能
│  ├─tree                # 树组件
│  ├─wheelDisc           # 转盘抽奖
│  └─routesConfig        # 路由配置
├─public                 # 静态资源
├─dps.config.js          # 骨架配置

# notice
1. 除了 './common/style' 下的样式文件和所有的.css文件均会被tree-shaking;
2. 生产环境css的sourceMap生成取决于devtool选项

# aim
5. 修改ant-design默认样式
6. 生产环境关闭react-dev-tools

# feature
1. react-router v6
2. 基于路由dynamic
3. react-refrech
4. 
