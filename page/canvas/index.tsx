import React, { useEffect, useState, useRef } from 'react';

import imgSrc from 'assets/patterning.png';

const Test = () => {
  const [text, setText] = useState('计算中...');
  const arrRef = useRef<Array<number[]>>([]);
  const arr = arrRef.current;
  const getArea = (x: number, y: number, num: number) => {
    arr[y][x] = 0;
    num++;

    // 向下
    if (y + 1 < 200 && arr[y + 1][x] === 1) num = getArea(x, y + 1, num);
    // 向右
    if (x + 1 < 350 && arr[y][x + 1] === 1) num = getArea(x + 1, y, num);
    // 向左
    if (x - 1 > 0 && arr[y][x - 1] === 1) num = getArea(x - 1, y, num);
    // 向上
    if (y - 1 > 0 && arr[y - 1][x] === 1) num = getArea(x, y - 1, num);

    return num;
  };

  useEffect(() => {
    const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const img = new Image();
    img.src = imgSrc;
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, 350, 200);
      const data = imgData.data;

      let x = 0, y = 0;
      for (let i = 0; i < data.length; i += 4) {
        if (!arr[y]) arr[y] = [];
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        // const alp = data[i + 3];
        const temp = `${red} ${green} ${blue}` === '211 228 200' ? 0 : 1; 
        arr[y][x] = temp;
        // console.log(y, x);
        x++;
        if (x === 350) {
          x = 0;
          y++;
        }
      }
      // console.log(arr);
      const analyzeData = [];

      for (let y2 = 0; y2 < 200; y2++) {
        for (let x2 = 0; x2 < 350; x2++) {
          // console.log(x, y);
          if (arr[y2][x2] === 1) {
            let num = getArea(x2, y2, 0);
            analyzeData.push(num);
          }
        }
      }
      console.log(analyzeData);
      setText(`共计${analyzeData.length}个图形，面积分别为${analyzeData.join('px,')}px`);
    };
  }, []);
  
  return <>
    <canvas id="myCanvas" width="350" height="200" />
    <br />
    <div style={{ wordBreak: 'break-all', color: 'var(--grey-9-rgb)' }}>{text}</div>
  </>;
};

export default Test;
