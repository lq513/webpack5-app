import React, { useEffect } from 'react';
import { Button } from 'antd-mobile';

// 测试css是否被tree shaking
import './index.css';

// 测试静态文件打包
import text from 'assets/1.txt';
import cat from 'assets/cat.jpg';
// const cat = require('../public/1.gif').default;
console.log(import.meta.url, 2222222);

// import { a } from '@/tools';
// a('./static/1.gif');

const Test = () => {
  useEffect(() => {
    // 测试cros跨域
    fetch('http://localhost:3002/getJsDoc').then(res => {
      console.log(res);
    })
      .catch(e=>console.log(e));
  }, []);

  return (
    <>
      <img src={cat} />
      <p style={{ padding: '10px', lineHeight: '1.1', color: 'var(--grey-9-rgb)' }}>{text.toString()}</p>
      <div className='testcss'>测试css</div>
      <Button type="warning">test antd</Button>
    </>
  );
};

export default Test;