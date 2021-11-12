import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';
import routesConfig from './routesConfig';
import Header from 'common/components/Header';

import Home from './home';
import Test from './test';
import Task from './task';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

// 开发用的ts-loader，未按需引入样式，故特殊处理（请忽略开发环境：You are using a whole package of antd-mobile）
if ($DEV) require('antd-mobile/dist/antd-mobile.less');
import 'common/style/index.less';

const RoutesConfig = () => useRoutes(routesConfig);
const Root = () => {
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
      {/* <Routes>
        <Route path="/" element={<Home />}>
          <Route path="test" element={<Test />} />
          <Route path="task" element={<Task />} />
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>There is nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes> */}
      <RoutesConfig />
    </Router>
  </>);
};

ReactDOM.render(<Root/>, document.getElementById('root'));
