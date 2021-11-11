import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import route from './routes';
import Header from 'common/components/Header';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

// 开发用的ts-loader，未按需引入样式，故特殊处理（请忽略开发环境：You are using a whole package of antd-mobile）
if ($DEV) require('antd-mobile/dist/antd-mobile.less');
import 'common/style/index.less';

const Routes = () => useRoutes(route);
const A = () => {
  useEffect(() => {
    // const p = import(/* webpackPreload: true */ './home');
    // p.then((e) => {
    //   const { default: Home } = e;
    //   console.log(e);
    // });
  }, []);

  return (<>
    <Header />
    <Router>
      <Routes/>
    </Router>
  </>);
};

ReactDOM.render(<A/>, document.getElementById('root'));
