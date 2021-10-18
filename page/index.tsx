import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

// import 'antd-mobile/dist/antd-mobile.less';
import 'common/style/index.less';
import styles from './index.less';
console.log(styles, 222222);

import { testPromise } from '@/mod';
testPromise().then(e => {
  console.log(e, 'promise');
});

class A extends React.Component {
  componentDidMount() {
    console.log(this.refs);
  }

  render() {
    return (
      <>
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

ReactDOM.createRoot(document.getElementById('root')).render(<A />);
