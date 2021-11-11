import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home';
import Header from 'common/components/Header';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

// 开发用的ts-loader，未按需引入样式，故特殊处理（请忽略开发环境：You are using a whole package of antd-mobile）
if ($DEV) require('antd-mobile/dist/antd-mobile.less');
import 'common/style/index.less';
class A extends React.Component {
  componentDidMount() {
    const p = import(/* webpackPreload: true */ './home');
    p.then((e) => {
      const { default: Home } = e;
      console.log(e);
    });
  }

  render() {
    return (
      <>
        <Header />
        <Home />
    </>
    );
  }
}

ReactDOM.render(<A/>, document.getElementById('root'));
