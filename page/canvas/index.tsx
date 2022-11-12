import React, { useEffect, useRef } from 'react';

const CanvasTest = () => {
  const can = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    console.log(can);
    const canvas = can.current;
    const ctx: CanvasRenderingContext2D | null = canvas?.getContext('2d') || null;
    let x = 100;
    setInterval(() => {
      ctx?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
      ctx?.beginPath();
      ctx?.moveTo(100, 100);
      ctx?.lineTo(x, 800);
      ctx?.stroke();
      x++;
    }, 16);
  }, []);

  return (
    <div>
      <canvas width="500" height="800" ref={can} />
    </div>
  );
};

export default CanvasTest;