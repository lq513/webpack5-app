import React, { useState, useEffect } from 'react';
import reactDom from 'react-dom';

import { a } from '@/mod';

const A = (props:object) => {
  const [num, setNum] = useState(1);
  console.log(props, 1111);

  useEffect(() => {
    a('../public/a.jpg');
  }, []);

  return (
    <div onClick={()=>{ setNum(2); }}>{num}</div>
  );
};

reactDom.render(<A />, document.getElementById('root'));
