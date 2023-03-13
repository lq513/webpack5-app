export default (() => {
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
  console.log(has2, 'includes');
})();
