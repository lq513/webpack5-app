import React, { useEffect, useRef } from 'react';
import styles from './index.less';

const CanvasTest = () => {
  const can = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log(can);
    const canvas = can.current;
    const ctx: CanvasRenderingContext2D | null = canvas?.getContext('2d') || null;
    ctx?.beginPath();
    ctx?.moveTo(0, 0);
    ctx?.lineTo(50, 50);
    ctx?.stroke();
  }, []);
  
  const handleClick = (e) => {
    console.log(e.clientX, e.clientY - can.current?.offsetTop);
  };

  return (
    <div className={styles.canvasTest}>
      <canvas
        width="100"
        height="100"
        ref={can}
        style={{ width: '200px', height: '200px' }}
        onClick={handleClick}
      />
    </div>
  );
};

export default CanvasTest;