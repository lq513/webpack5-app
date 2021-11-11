import React from 'react';
import styles from './index.less';

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

// es6 api
const arr = [1, 2];
const has2 = arr.includes(2);
console.log(has2, 'includes');



class Home extends React.Component {
  render() {
    return (
      <div className={styles.homeBox}>
        <h1>你好！</h1>
        <p>
          欢迎使用，有问题可以联系这个邮箱：
          <a href="https://mail.google.com">liuqiang513@gmail.com</a>
        </p>
      </div>
    );
  }
}

export default Home;