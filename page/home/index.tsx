import React from 'react';
import styles from './index.less';
import { Outlet, Link } from 'react-router-dom';

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
  // console.log(target.prototype, 'B');
};
@add
class B {
  private _value = 13;

  set value(v) {
    console.log(11111);
    this._value = v;
  }

  get value() {
    return this._value;
  }

  @enumerable
  fn() {
    // console.log('执行了');
  }
  
}
const b = new B();
b.fn();
// console.log(b.value, 'value');

for (let key in b) {
  // console.log(key, 'key');
} 

// promise
// const p = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve('finally1');
//   }, 5000);
// });
// p.then(e => { console.log(e); }).finally(() => {console.log('finally'); });

// es6 api
const arr = [1, 2];
const has2 = arr.includes(2);
// console.log(has2, 'includes');



class Home extends React.Component {
  render() {
    return (
      <div className={styles.homeBox}>
        <p>
          联系我：
          <a href="https://mail.google.com">liuqiang513@gmail.com</a>
        </p>
        <Link to="/test">test | </Link>
        <Link to="/task">task | </Link>
        <Link to="/autograph">autograph | </Link>
        <Link to="/wheeldisc">wheeldisc | </Link>
        <Link to="/tree">tree | </Link>
        <Link to="/canvas">canvas | </Link>
        <Link to="/nothing">404</Link>
        <Outlet />
      </div>
    );
  }
}

export default Home;