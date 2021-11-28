import React from 'react';
import * as rrweb from 'rrweb';

const events = [];
rrweb.record({
  emit(event) {
    // 用任意方式存储 event
    events.push(event);
    console.log(events, 'events');
  },
});

import 'rrweb/dist/rrweb.min.css';
import styles from './index.less';

const Tasks = () => {
  return (
    <div>
      <div
        onClick={() => {
          const stopFn = rrweb.record({
            emit() { },
          });
          if (stopFn) stopFn();
        }}
        className={styles.btn}
      >
        停止记录
      </div>
      <div className={styles.btn} onClick={() => {
        const replayer = new rrweb.Replayer(events);
        replayer.play();
      }}>重播</div>
    </div>
  );
};

export default Tasks;