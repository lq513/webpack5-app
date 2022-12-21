import React, { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routesConfig from './routesConfig';
import Header from 'coms/Header';

// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

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

  return (
  <Suspense fallback="加载中...">
    <Header/>
    <Router>
      <RoutesConfig/>
    </Router>
  </Suspense>);
};

const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(<Root />);
