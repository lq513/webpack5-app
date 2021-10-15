import React, { useState } from 'react';
import reactDom from 'react-dom';
// import 'core-js/stable';
import 'regenerator-runtime/runtime';   

// import 'antd-mobile/dist/antd-mobile.less';
import 'common/style/index.less';
import styles from './index.less';
console.log(styles, 222222);

import { testPromise } from '@/mod';
testPromise();
const testfn = () => {
  console.log(1111);
};
testfn();

const A = (props:object) => {
  return (
    <>
    </>
  );
};

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

reactDom.render(<A />, document.getElementById('root'));
