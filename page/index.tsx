import React, { useState, useEffect } from 'react';
import reactDom from 'react-dom';
// import { Button } from 'antd-mobile';
import c from '../public/a.jpg';
import './index.less';

import { a} from '@/mod';

const A = (props:object) => {
  const [num, setNum] = useState(1);
  console.log(props, 1111);

  useEffect(() => {
    a('../public/a.jpg');
  }, []);

  return (
    <>
      <img src={c} className="img"/>
      <div onClick={()=>{ setNum(2); }}>{num}</div>
      {/* <Button type="primary">11</Button> */}
    </>
  );
};

document.addEventListener('keydown', (oEvent) => {
  //获取键盘的keyCode值
  const KeyCode = oEvent.key;
  console.log(oEvent, 11111111);
  //获取ctrl 键对应的事件属性
  const bCtrlKeyCode = oEvent.ctrlKey || oEvent.metaKey;
  if ( KeyCode.toLowerCase() === 'u' && bCtrlKeyCode  ) {
    oEvent.preventDefault();
    window.location.href = 'https://github.com/lq513/ab';
  }
});

reactDom.render(<A />, document.getElementById('root'));
