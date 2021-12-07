import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routesConfig from './routesConfig';
import Header from 'coms/Header';

// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

// 开发用的ts-loader，未按需引入样式，故特殊处理（请忽略开发环境：You are using a whole package of antd-mobile）
if ($DEV) require('antd-mobile/dist/antd-mobile.less');
import 'style/index.less';

const RoutesConfig = () => useRoutes(routesConfig);
const Root = () => {
  useEffect(() => {
    // console.trace('1111');
    // const p = import(/* webpackPreload: true */ './home');
    // p.then((e) => {
    //   const { default: Home } = e;
    //   console.log(e);
    // });
  }, []);

  return (<>
    <Header/>
    <Router>
      <RoutesConfig/>
    </Router>
  </>);
};

ReactDOM.render(<Root/>, document.getElementById('root'));

// if (module.hot) {
//   module.hot.accept('./test', () => {
//     console.log(11111);
//   });
// }
