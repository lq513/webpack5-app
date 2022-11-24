import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd-mobile';
import styles from './index.less';

let lastX:number = 0;
let lastY:number = 0;

const Autograph = () => {
  const [selected1, setS1] = useState<number>(1);
  const [selected2, setS2] = useState<string>('blue');
  const cs = useRef<HTMLCanvasElement>(null!);
  const ctxRef = useRef<CanvasRenderingContext2D>(null!);
  console.log(selected1, 11111);

  const Draw = (x:number, y:number, isDown:boolean) => {
    const ctx = ctxRef.current;
    if (isDown) {
      ctx.beginPath();
      ctx.lineWidth = selected1;
      // console.log(selected1, 11111222);
      ctx.strokeStyle = selected2;
      ctx.lineJoin = 'round';
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();
    }
    lastX = x;
    lastY = y;
  };

  useEffect(() => {
    const c = cs.current;
    ctxRef.current = c.getContext('2d') as CanvasRenderingContext2D;
    let mousePressed:boolean = false;
    // 触摸屏
    c.addEventListener('touchstart', (event) => {
      console.log(1);
      if (event.targetTouches.length == 1) {
        event.preventDefault(); // 阻止浏览器默认事件，重要
        var touch = event.targetTouches[0];
        mousePressed = true;
        Draw(touch.pageX - c.offsetLeft, touch.pageY - c.offsetTop, false);
      }
    }, false);

    c.addEventListener('touchmove', (event) => {
      console.log(2);
      if (event.targetTouches.length == 1) {
        event.preventDefault(); // 阻止浏览器默认事件，重要
        var touch = event.targetTouches[0];
        if (mousePressed) {
          Draw(touch.pageX - c.offsetLeft, touch.pageY - c.offsetTop, true);
        }
      }

    }, false);

    c.addEventListener('touchend', (event) => {
      console.log(3);
      if (event.targetTouches.length === 1) {
        event.preventDefault(); // 阻止浏览器默认事件，防止手写的时候拖动屏幕，重要
        // var touch = event.targetTouches[0];
        mousePressed = false;
      }
    }, false);

    /*c.addEventListener('touchcancel', function (event) {
        console.log(4)
        mousePressed = false;
    },false);*/

    // 鼠标
    c.onmousedown = (event) => {
      mousePressed = true;
      Draw(event.pageX - c.offsetLeft, event.pageY - c.offsetTop, false);
    };

    c.onmousemove = (event) => {
      if (mousePressed) {
        Draw(event.pageX - c.offsetLeft, event.pageY - c.offsetTop, true);
      }
    };

    c.onmouseup = () => {
      mousePressed = false;
    };
  }, []);

  return (
    <>
      <canvas
        ref={cs}
        width="373"
        height="500"
        style={{ border: '1px solid #6699cc' }}
        className={styles.paper}
      />
      <div className="control-ops control">
        <Button type="primary" className={styles.btn}>清空画板</Button>
        <b>Line width : </b>
        <select defaultValue={selected1} onChange={(e) => { setS1(+e.target.value); }}>
          <option value={1}>1</option>
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={7}>7</option>
          <option value={9}>9</option>
          <option value={11}>11</option>
        </select>
        <b>Color : </b>
        <select defaultValue="black" onChange={(e) => { setS2(e.target.value); }} className={styles.colorSelect}>
          <option value="black">balck</option>
          <option value="blue">blue</option>
          <option value="red">red</option>
          <option value="green">green</option>
          <option value="yellow">yellow</option>
          <option value="gray">gray</option>
        </select>
        <div className="saveimg">保存</div>
      </div>
      <div className="saveimgs"></div>
    </>
  );
};
export default Autograph;
