import React, { useEffect, useRef, MouseEvent } from 'react';
import styles from './index.less';

import { angleToArc } from '@/tools';

const CanvasTest = () => {
  const can = useRef<HTMLCanvasElement>(null!);
  const timerRef = useRef<number>();
  
  const drawSubline = (ctx: CanvasRenderingContext2D, site: number, direction?: 'vertical' | 'horizontal') => {
    const canvas = can.current;
    ctx.save();
    ctx.beginPath();
    let x = 0, y = 0, x1 = 0, y1 = 0;
    if (direction === 'vertical') {
      x = x1 = site;
      y1 = canvas.height;
    } else {
      y = y1 = site;
      x1 = canvas.width;
    }
    ctx.strokeStyle = '#aefef9';
    ctx.fillStyle = '#aefef9';
    ctx.lineWidth = 1;
    ctx.moveTo(x, y);
    ctx.font = '30px serif';
    ctx.fillText(`${site}`, x, y + 25);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.restore();
  };

  /**
   * x, y 指针中心点坐标;
   * w 指针一半的宽度;
   * h 指针长侧长度;
   * ang 指针角度;
   */
  const drawPointer = (
    ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number,
    ang: number,
    color?: string,
  ) => {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(angleToArc(ang));
    // 顶点
    ctx.moveTo(0, - h);
    ctx.lineTo(w, 0);
    ctx.lineTo(0, 0.1 * h);
    ctx.lineTo(- w, 0);
    ctx.fillStyle = color || '#333';
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  const drawClock = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, r1: number) => {
    ctx.clearRect(0, 0, 2 * x, 2 * y);
    // # 盘面
    const gradients = ctx.createRadialGradient(
      x, y, r1,
      x, y, r,
    );
    gradients.addColorStop(0, '#fff');
    gradients.addColorStop(0.1, '#b8b8b8');
    gradients.addColorStop(0.8, '#f4f4f4');
    gradients.addColorStop(1, '#ccc');
    ctx.fillStyle = gradients;
    ctx.shadowColor = '#a4a4a4';
    ctx.shadowOffsetX = 6;
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();

    // # 刻度
    ctx.save();
    ctx.translate(x, y);
    const textSize = 30;
    for (let i = 0; i < 60; i ++) {
      ctx.beginPath();
      ctx.moveTo(0, -r1);
      ctx.strokeStyle = '#333';
      const text = `${i / 5 || 12}`;
      const unit = 360 / 60;

      if (i % 5 === 0) {
        const canvas2 = document.createElement('canvas');
        canvas2.width = 100;
        canvas2.height = 100;
        const ctx2 = canvas2.getContext('2d') as CanvasRenderingContext2D;
        ctx2.textAlign = 'center';
        ctx2.fillStyle = '#333';
        ctx2.translate(50, 50);
        ctx2.rotate(angleToArc(-unit * i));
        ctx2.font = `${textSize}px Helvetica Neue, Helvetica, Arial, sans-serif`;
        ctx2.fillText(text, 0, textSize / 2);
        // document.body.append(canvas2);
        ctx.drawImage(canvas2, 0 - 50, -r1 + 60 - 50);
        ctx.lineWidth = 8;
        ctx.lineTo(0, -r1 + 30);
      } else {
        ctx.lineWidth = 3;
        ctx.lineTo(0, -r1 + 20);
      }

      ctx.stroke();
      ctx.rotate(angleToArc(unit));
    }
    ctx.restore();

    // # 指针
    const hour = new Date().getHours();
    const min = new Date().getMinutes();
    const sec = new Date().getSeconds();
    const mSec = new Date().getMilliseconds();
    const hourPiece = 360 / 12;
    const minOrSecPiece = 360 / 60;
    drawPointer(ctx, x, y, 12, 125, hourPiece * (hour + min / 60), '#ccc');
    drawPointer(ctx, x, y, 8, 195, minOrSecPiece * (min + sec / 60));
    drawPointer(ctx, x, y, 2, 195, minOrSecPiece * (sec + mSec / 1000), 'red');

    // # 中心
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
    timerRef.current = window.requestAnimationFrame(() => {
      drawClock(ctx, x, y, r, r1);
    });
  };
  
  useEffect(() => {
    const canvas = can.current;
    const W = canvas.width;
    const H = canvas.height;
    const w = W / 2;
    const h = H / 2;
    // 外径
    const r = 300;
    // 内径
    const r1 = 260;
    const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D;
    
    timerRef.current = window.requestAnimationFrame(() => {
      drawClock(ctx, w, h, r, r1);
    });

    // drawSubline(ctx, 75, 'vertical');
    // drawSubline(ctx, 115, 'vertical');
    // drawSubline(ctx, 115);
    // drawSubline(ctx, 375, 'vertical');
    // drawSubline(ctx, 375);
    return () => {
      console.log('xi');
      if (timerRef.current) window.cancelAnimationFrame(timerRef.current);
    };
  }, []);
  
  const handleClick = (e: MouseEvent<HTMLCanvasElement>) => {
    console.log(e.clientX, e.clientY - can.current?.offsetTop);
  };

  return (
    <div className={styles.canvasTest}>
      <canvas
        width="750"
        height="750"
        ref={can}
        onClick={handleClick}
      />
    </div>
  );
};

export default CanvasTest;