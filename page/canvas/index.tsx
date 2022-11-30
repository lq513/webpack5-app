import React, { useEffect, useRef, MouseEvent } from 'react';
import styles from './index.less';

import { angleToArc } from '@/tools';

const CanvasTest = () => {
  const can = useRef<HTMLCanvasElement>(null!);

  const drawSubline = (ctx: CanvasRenderingContext2D, site: number, direction: 'vertical' | 'horizontal') => {
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
    const gradients = ctx.createRadialGradient(
      w, h, r1,
      w, h, r,
    );
    gradients.addColorStop(0, '#fff');
    gradients.addColorStop(0.1, '#b8b8b8');
    gradients.addColorStop(0.8, '#f4f4f4');
    gradients.addColorStop(1, '#ccc');
    ctx.fillStyle = gradients;
    ctx.beginPath();
    ctx.arc(w, h, r, 0, 2 * Math.PI);
    ctx.fill();
    
    // # 钟表刻度
    ctx.save();
    ctx.translate(w, h);
    for (let i = 0; i < 60; i ++) {
      ctx.beginPath();
      ctx.moveTo(0, -r1);
      ctx.strokeStyle = '#333';
      ctx.fillStyle = '#333';
      // ctx.font = '30px serif';
      // ctx.textAlign = 'center';
      const text = `${i / 5 || 12}`;

      if (i % 5 === 0) {
        const canvas2 = document.createElement('canvas');
        canvas2.width = 100;
        canvas2.height = 100;
        // canvas2.style.border = '1px solid red';
        const ctx2 = canvas2.getContext('2d') as CanvasRenderingContext2D;
        ctx2.textAlign = 'center';
        // drawSubline(ctx2, 50, 'vertical');
        // drawSubline(ctx2, 50, 'horizontal');
        ctx2?.translate(50, 50);
        ctx2?.rotate(angleToArc(-6 * i));
        ctx2.font = '30px serif';
        ctx2.fillText(text, 0, 15);
        // document.body.append(canvas2);
        ctx.drawImage(canvas2, 0 - 50, -200 - 50);

        ctx.lineWidth = 8;
        console.log(text);
        ctx.lineTo(0, -230);
      } else {
        ctx.lineWidth = 4;
        ctx.lineTo(0, -240);
      }

      ctx.rotate(angleToArc(6));
      ctx.stroke();
    }
    ctx.restore();


    
    drawSubline(ctx, 75, 'vertical');
    drawSubline(ctx, 115, 'vertical');
    drawSubline(ctx, 115, 'horizontal');
    drawSubline(ctx, 375, 'vertical');
    drawSubline(ctx, 375, 'horizontal');
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