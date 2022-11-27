import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd-mobile';
import styles from './index.less';

let lastX:number = 0;
let lastY:number = 0;
let ratio: number = 1; // 缩放比例

const Autograph = () => {
  const [selected1, setS1] = useState<number>(1);
  const [selected2, setS2] = useState<string>('blue');
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const ctxRef = useRef<CanvasRenderingContext2D>(null!);
  const mousePressedRef = useRef<boolean>(false);

  let mousePressed = mousePressedRef.current;

  const Draw = (x:number, y:number, isDown:boolean) => {
    const ctx = ctxRef.current;
    const x1 = x / ratio;
    const y1 = y / ratio;
    if (isDown) {
      ctx.beginPath();
      ctx.lineWidth = selected1;
      // console.log(selected1, 11111222);
      ctx.strokeStyle = selected2;
      ctx.lineJoin = 'round';
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x1, y1);
      ctx.closePath();
      ctx.stroke();
    }
    lastX = x1;
    lastY = y1;
  };

  useEffect(() => {
    const c = canvasRef.current;
    ctxRef.current = c.getContext('2d') as CanvasRenderingContext2D;
    ratio = window.innerWidth / c.width;
    /*c.addEventListener('touchcancel', function (event) {
        console.log(4)
        mousePressed = false;
    },false);*/
  }, []);

  // 鼠标
  const handleMousedown = (event: MouseEvent) => {
    const c = canvasRef.current;
    mousePressed = true;
    Draw(event.pageX - c.offsetLeft, event.pageY - c.offsetTop, false);
  };

  const handleMousemove = (event: MouseEvent) => {
    const c = canvasRef.current;
    if (mousePressed) {
      Draw(event.pageX - c.offsetLeft, event.pageY - c.offsetTop, true);
    }
  };

  const handleMouseup = () => {
    mousePressed = false;
  };

  // 触摸屏
  const handleStart = (event: TouchEvent) => {
    const c = canvasRef.current;
    console.log(1);
    if (event.targetTouches.length == 1) {
      event.preventDefault(); // 阻止浏览器默认事件，重要
      var touch = event.targetTouches[0];
      mousePressed = true;
      Draw(touch.pageX - c.offsetLeft, touch.pageY - c.offsetTop, false);
    }
  };

  const handleMove = (event: TouchEvent) => {
    const c = canvasRef.current;
    console.log(2);
    if (event.targetTouches.length == 1) {
      event.preventDefault(); // 阻止浏览器默认事件，重要
      var touch = event.targetTouches[0];
      if (mousePressed) {
        Draw(touch.pageX - c.offsetLeft, touch.pageY - c.offsetTop, true);
      }
    }

  };

  const handleEne = (event: TouchEvent) => {
    console.log(3);
    if (event.targetTouches.length === 1) {
      event.preventDefault(); // 阻止浏览器默认事件，防止手写的时候拖动屏幕，重要
      // var touch = event.targetTouches[0];
      mousePressed = false;
    }
  };

  const clear = () => {
    const ctx = ctxRef.current;
    const c = canvasRef.current;
    ctx.clearRect(0, 0, c.width, c.height);
  };

  return (
    <div className={styles.paperBox}>
      <canvas
        ref={canvasRef}
        width="750"
        height="812"
        style={{ border: '1px solid #6699cc' }}
        className={styles.paper}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEne}
        onMouseDown={handleMousedown}
        onMouseUp={handleMouseup}
        onMouseMove={handleMousemove}
      />
      <Button type="primary" className={styles.btn} onClick={clear}>清空画板</Button>
      <div>
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
      <div className="saveimgs" />
    </div>
  );
};
export default Autograph;
