import React, { useEffect } from 'react';

// import { Button } from 'antd-mobile';

// 测试静态文件打包
import text from 'common/assets/1.txt';
import cat from 'common/assets/cat.jpg';
// const cat = require('../public/1.gif').default;
console.log(import.meta.url, 2222222);

import { a } from '@/mod';
a('../common/assets/cat.jpg');

const Test = () => {
  useEffect(() => {
    fetch('http://localhost:3002/test').then(res => {
      console.log(res);
    })
      .catch(e=>console.log(e));
  }, []);

  return (
    <>
      {/* <Button type="warning">11</Button> */}
      <img src={cat} />
      {text.toString()}
    </>
  );
};

export default Test;