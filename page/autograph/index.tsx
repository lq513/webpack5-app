import React, { useState, useEffect, useRef, useMemo } from 'react';

import styles from './index.less';

const lastX:number | undefined = undefined;
const lastY:number | undefined = undefined;

const Autograph = () => {
  const [selected1, setS1] = useState();
  const [selected2, setS2] = useState();
  const canvas = useRef();
  const c = canvas.current;
  console.log(c, 'c')
  var ctx = useMemo(() => {
    if (!c) return;
    c.getContext('2d');
  }, [c]);

  const Draw = (x:number, y:number, isDown:boolean) => {
    if (isDown) {
      ctx.beginPath();
      ctx.strokeStyle = selected2;
      ctx.lineWidth = selected1;
      ctx.lineJoin = "round";
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();
    }
    lastX = x;
    lastY = y;
  };

  useEffect(() => {
    let mousePressed:boolean = false;
    if (!c) return;
    // 触摸屏
    c.addEventListener('touchstart', function(event) {
      console.log(1);
      if (event.targetTouches.length == 1) {
        event.preventDefault(); // 阻止浏览器默认事件，重要
        var touch = event.targetTouches[0];
        mousePressed = true;
        Draw(touch.pageX - this.offsetLeft, touch.pageY - this.offsetTop, false);
      }

    }, false);

    c.addEventListener('touchmove', function(event) {
      console.log(2);
      if (event.targetTouches.length == 1) {
        event.preventDefault(); // 阻止浏览器默认事件，重要
        var touch = event.targetTouches[0];
        if (mousePressed) {
          Draw(touch.pageX - this.offsetLeft, touch.pageY - this.offsetTop, true);
        }
      }

    }, false);

    c.addEventListener('touchend', function(event) {
      console.log(3);
      if (event.targetTouches.length == 1) {
        event.preventDefault(); // 阻止浏览器默认事件，防止手写的时候拖动屏幕，重要
        //                  var touch = event.targetTouches[0];
        mousePressed = false;
      }
    }, false);
    /*c.addEventListener('touchcancel', function (event) {
        console.log(4)
        mousePressed = false;
    },false);*/



    // 鼠标
    c.onmousedown = function(event) {
      mousePressed = true;
      Draw(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, false);
    };

    c.onmousemove = function(event) {
      if (mousePressed) {
        Draw(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, true);
      }
    };

    c.onmouseup = function(event) {
      mousePressed = false;
    };
  }, []);

  const aaa = () => {

  };

  const aaa2 = () => {

  };

  return (
    <>
      <div>
        <canvas ref={c} width="500" height="500" style={{ border: '1px solid #6699cc' }} />
        <div className="control-ops control">
          <div className={styles.btn}>清空画板</div>
          Line width : 
          <select id="selWidth" onChange={aaa}>
            <option value="1">1</option>
            <option value="3">3</option>
            <option value="5" selected>5</option>
            <option value="7">7</option>
            <option value="9">9</option>
            <option value="11">11</option>
          </select>
          Color : 
          <select id="selColor" onChange={aaa2} className={styles.colorSelect}>
            <option value="black" selected>balck</option>
            <option value="blue">blue</option>
            <option value="red">red</option>
            <option value="green">green</option>
            <option value="yellow">yellow</option>
            <option value="gray">gray</option>
          </select>
          <div className="saveimg">保存</div>
        </div>
        <div className="saveimgs"></div>
    </div>

    </>
  );
};
export default Autograph;