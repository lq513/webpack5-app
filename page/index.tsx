import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Test from './test';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

import 'common/style/index.less';
import styles from './index.less';
console.log(styles, 'style');

interface Desc {
  enumerable?: boolean
}
// 类
const enumerable = (_: object, name: string, descriptor: Desc) => {
  descriptor.enumerable = true;
  return descriptor;
};

const add = (target: any) => {
  target.num = 1;
  console.log(target.prototype, 'B');
};
@add
class B {
  @enumerable
  fn() {
    console.log('执行了');
  }
}
const b = new B();
b.fn();

for (let key in b) {
  console.log(key, 'key');
} 

// promise
const p = new Promise((resolve) => {
  setTimeout(() => {
    resolve('finally1');
  }, 5000);
});
p.then(e => { console.log(e); }).finally(() => {console.log('finally'); });

// 新api
const arr = [1, 2];
const has2 = arr.includes(2);
console.log(has2, 'includes');




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
        <Test />
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
//     window.location.href = 'https://github.com/lq513/webpack5-app';
//   }
// });


ReactDOM.render(<A/>, document.getElementById('root'));
