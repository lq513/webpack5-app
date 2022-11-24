import React, { useEffect, useRef } from 'react';
import styles from './index.less';

const CanvasTest = () => {
  const can = useRef<HTMLCanvasElement>(null);
  const timer = useRef<number>(0);
  const drawPie = (ctx: CanvasRenderingContext2D, startAng: number, endAng: number, color: string) => {
    ctx.moveTo(300, 250);
    ctx.arc(300, 250, 150, startAng * Math.PI / 180, endAng * Math.PI / 180, false);
    ctx.fillStyle = color;
    ctx.fill();
  };

  useEffect(() => {
    console.log(can);
    const canvas = can.current;
    const ctx: CanvasRenderingContext2D | null = canvas?.getContext('2d') || null;
    let x = 0;
    // setInterval(() => {
    //   ctx?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
    //   ctx?.beginPath();
    //   ctx?.moveTo(100, 100);
    //   ctx?.lineTo(x, 800);
    //   ctx?.stroke();
    //   x++;
    // }, 16);
    let color = 'red';
    timer.current = window.setInterval(() => {
      ctx?.beginPath();
      ctx?.clearRect(0, 0, 600, 500);
      if (ctx) drawPie(ctx, x, 50, color);
      x++;
    }, 100);
    return () => {
      window.clearInterval(timer.current);
    };
  }, []);
  

  return (
    <div className={styles.canvasTest}>
      <canvas width="600" height="500" ref={can} />
    </div>
  );
};

export default CanvasTest;