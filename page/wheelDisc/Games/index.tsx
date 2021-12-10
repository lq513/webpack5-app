import React from 'react';

import styles from './index.less';

interface GamesProps {
  cName: string,
  rewards: any[],
  currentAngle: number,
}

const Games = (props:GamesProps) => {
  const { cName, rewards = [], currentAngle } = props;
  let gridImg = null;
  if (rewards.length !== 4 && rewards.length !== 6) {
    gridImg = require('../img/grid4.png');
  } else {
    gridImg = require(`../img/grid${rewards.length}.png`);
  }
  return (
    <div
      className={`${styles.outBox} ${cName}`}
      // onClick={(e) => console.log(e.clientX, e.clientY)}
      style={{
        transform: `rotate(${currentAngle}deg)`,
        background: `url(${gridImg}) center / 100% no-repeat`,
      }}
    >
      {
        (rewards.length === 4 || rewards.length === 6) && rewards.map((v, k) => {
          const unit = 360 / rewards.length;
          return (
            <div
              key={v.rewardId || k}
              className={styles.rewardsBox}
              style={{
                width: `${200 / rewards.length}%`, // 100 / (l / 2)
                transform: `rotate(${k * unit}deg)`,
              }}
            >
              <div>{v.rewardName}</div>
              <img src={v.pic} alt="奖品" />
            </div>
          );
        })
      }
    </div>
  );
};

export default Games;
