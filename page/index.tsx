import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd-mobile';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

import 'common/style/index.less';
import styles from './index.less';
console.log(styles, 222222);

import { a } from '@/mod';
a('./static/1.gif');

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
      <Button type="warning" className="common">test</Button>
    </>
    );
  }
}

// document.addEventListener('keydown', (oEvent) => {
//   //获取键盘的keyCode值
//   const KeyCode = oEvent.key;
//   // console.log(oEvent, 11111111);
//   //获取ctrl 键对应的事件属性
//   const bCtrlKeyCode = oEvent.ctrlKey || oEvent.metaKey;
//   if ( KeyCode.toLowerCase() === 'u' && bCtrlKeyCode  ) {
//     oEvent.preventDefault();
//     window.location.href = 'https://github.com/lq513/ab';
//   }
// });

ReactDOM.render(<A/>, document.getElementById('root'));
