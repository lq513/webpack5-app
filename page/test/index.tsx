import React, { useEffect, useState, useRef } from 'react';
import { Button, Collapse } from 'antd-mobile';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';

// 测试css是否被tree shaking
import './index.css';

// 测试静态文件打包
import text from 'assets/1.txt';
// import cat from 'assets/cat.jpg';
// const cat = require('/public/1.gif');
// console.log(import.meta.url, 2222222);

// import { a } from '@/tools';
// a('./static/1.gif');

const Test = () => {
  const [time, setTime] = useState(new Date().toLocaleString());
  const [ip, setIP] = useState('loading...');
  const [timeZone, setTimeZone] = useState('loading...');
  const timer = useRef<number>();
  useEffect(() => {
    try {
      setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    } catch (error) {
      console.warn('The browser does not support timezone detection. Using default timezone.');
    }
    
    axios('https://api.ipify.org')
      // .then(response => response.text())
      .then(res => {
        setIP(res.data);
        console.log('Public IP Address:', res.data);
      }).catch(e => console.log(e));
    // 测试cros跨域
    // fetch('http://localhost:3002/getJsDoc').then(res => {
    //   console.log(res);
    // })
    //   .catch(e=>console.log(e));
    timer.current = window.setInterval(() => setTime(new Date().toLocaleString()), 1000);
    return () => {
      // console.log('清除定时器', timer.current);
      window.clearInterval(timer.current);
    };
  }, []);

  return (
    <>
      {/* <img src={cat} /> */}
      <h2 className="title">
        <FormattedMessage id="title" />
      </h2>
      <p className="paragraph">
        {text.toString()}
        <br />
        时区：{timeZone}
        <br />
        ip：{ip}
      </p>
      <Collapse>
          <Collapse.Panel key='1' title='test'>
            <div id="ignore" style={{ padding: '10px', lineHeight: '1.1', color: 'var(--grey-9-rgb)' }}>测试css</div>
            <Button color="warning" className="btn">test antd</Button>
          </Collapse.Panel>
      </Collapse>
      <div className="footer">
        <div>{time}</div>
        {/* <a id="ignore1">webpack | </a>
        <a id="ignore2">babel | </a>
        <a id="ignore3">postcss | </a>
        <a id="ignore4">typescript | </a>
        <a id="ignore5">react-router</a> */}
      </div>
    </>
  );
};

export default Test;