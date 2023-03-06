import React, { useState, useEffect } from 'react';
import { Toast, Swiper } from 'antd-mobile';
import axios from 'axios';
import Modal from '../Modal';

import Games from '../Games';

import styles from './index.less';

let timer:number;
let runnig = false;

const testData = {
  showLantern: 1,
  enableTask: 1,
  activityStatus: 2,
  extraInfo: { },
  rewards: [{
    rewardName: '奖品1',
    pic: require('../img/award.png'),
    rewardId: 1,
  }, {
    rewardName: '奖品2',
    pic: require('../img/award.png'),
    rewardId: 2,
  }, {
    rewardName: '奖品3',
    pic: require('../img/award.png'),
    rewardId: 3,
  }, {
    rewardName: '奖品4',
    pic: require('../img/award.png'),
    rewardId: 4,
  },
  {
    rewardName: '奖品5',
    pic: require('../img/award.png'),
    rewardId: 5,

  }, {
    rewardName: '奖品6',
    pic: require('../img/award.png'),
    rewardId: 6,
  }],
};

const testData1 = [
  {
    phone: 18638233576,
    rewardName: 'sdaf',
  },
  {
    phone: 18638233572,
    rewardName: 'sdaf12',
  },
];

const WheelDiscDetail = () => {
  const [activityInfo, setActivityInfo] = useState(testData); // 活动信息
  const [currentAngle, setCurrentAngle] = useState(0); // 转盘实时角度
  const [awardInfo, setAwardInfo] = useState(null); // 抽奖获得的奖品信息
  const [winnerInfo, setWinnerInfo] = useState(testData1); // 获奖者信息
  const [modalType, setType] = useState<number | boolean>(false); // 弹窗 type - 1: 活动结束 2: 显示奖品
  const [lotteryTimes, setLotteryTimes] = useState(1); // 真实的-用户抽奖次数
  const [failVisible, setFailVisible] = useState(false); // 是否显示网络错误弹窗

  // 清除定时器 && 清除监听
  useEffect(() => (() => {
    clearInterval(timer);
  }), []);

  // 获取最终角度
  const getFinalAngle = (_currentAngle:number, startAngle:number, currentIndex:(string | number)) => {
    const { rewards = [] } = activityInfo;
    let finalAngle = 0;
    const unit = 360 / rewards.length; // 每个奖项所占的角度
    // 奖品所在的角度(列举6个奖品时取值：360-奖1、60-奖6、120-奖5、180-奖4、240-奖3、300-奖2)
    const rewardsAngle = 360 - (+currentIndex) * unit;
    // 旋转的圈数-刨去当前已经旋转的角度（第二次时可能不是在0度）
    const turns = Math.floor((_currentAngle - startAngle) / 360);
    const realAngle = _currentAngle % 360; // 转盘实际所旋转的角度（0<= x < 360）
    // if (realAngle === 0 && turns) realAngle = 360; // 极端条件
    console.log(currentIndex, _currentAngle, 'dv-reward');
    if (turns < 2) {
      // 保证最少转2圈，这里可以调节
      finalAngle = rewardsAngle + 360 * (2 - turns);
    } else if (rewardsAngle >= realAngle) {
      // rewardsAngle = 360, realAngle = 0, 时会再转一圈
      if (rewardsAngle - realAngle >= 180) {
        // 此角度够减速了，不需要在延长旋转角度
        finalAngle = _currentAngle + rewardsAngle - realAngle;
      } else if (rewardsAngle - realAngle < 180) {
        finalAngle = _currentAngle + rewardsAngle - realAngle + 360;
      }
    } else if (realAngle - rewardsAngle <= 180) {
      // 到达终点角度时还会旋转>180度，此角度够减速了，不需要在延长旋转角度
      finalAngle = _currentAngle + 360 - (realAngle - rewardsAngle);
    } else {
      // 到达终点角度时还会旋转<180度，增加一圈
      finalAngle = _currentAngle + 360 - (realAngle - rewardsAngle) + 360;
    }
    return finalAngle;
  };

  // 抽奖
  const drawLottery = () => {
    const { rewards = [] } = activityInfo;
    // 奖品数量返回错误（目前支持4或6个）-> 禁止用户抽奖
    if (rewards.length !== 4 && rewards.length !== 6) return;
    // 活动结束 -> 显示弹窗提示用户并禁止用户抽奖
    if (+activityInfo.activityStatus !== 2) {
      setType(1);
      return;
    }
    // 强制登录且抽奖次数为0 -> 禁止用户抽奖
    if (!lotteryTimes) {
      Toast.show({
        content: '转盘次数已用光，完成任务获取更多抽奖机会!',
        duration: 2000,
      });
      return;
    }
    // 转盘旋转中禁止用户再次点击
    if (runnig) {
      Toast.show({
        content: '请稍后～～',
        duration: 2000,
      });
      return;
    }
    clearInterval(timer);

    const startTime = Date.now();
    runnig = true;

    let finalAngle = 0;
    const startAngle = currentAngle; // 起始角度
    let _currentAngle = currentAngle; // 当前旋转了的角度
    let _awardInfo = awardInfo; // 奖品信息

    timer = window.setInterval(() => {
      const nowTime = Date.now();
      let dv = Math.floor((nowTime - startTime) / 18);
      // 限速75
      if (dv >= 75) dv = 75;
      // 进入最后一圈减速
      if (finalAngle && (finalAngle - _currentAngle) <= 360) {
        /**
         * * * 整个旋转过程中 * * *
         * * * 最大速度 75 * * *
         * * * 最小速度计算 * * *
         */
        const _dv = (finalAngle - _currentAngle) / 15;
        dv = _dv > 2 ? _dv : 2; // 控制最小速度为2，防止转不到终点角度
      }
      console.log(dv, _currentAngle, finalAngle, 'dv');
      // 更新角度
      setCurrentAngle((ca) => {
        _currentAngle = ca;
        if (finalAngle && ca >= finalAngle) {
          clearInterval(timer);
          if (_awardInfo) {
            setTimeout(() => {
              // 显示奖励
              setType(2);
              runnig = false;
            }, 200);
          } else {
            runnig = false;
          }

          return finalAngle % 360;
        }
        return ca + dv;
      });
    }, 30);
    axios.get('/activity/lottery')
      .then((res) => {
        const { chance = 0, reward = {} } = res.data;
        // 获取奖品在奖品列表中的索引 - 据此来确定转盘对应的角度
        const currentIndex:(string | boolean) = rewards.map((v, k) => (reward.rewardId === v.rewardId ? k.toString() : false)).filter(v => v)[0];
        console.log(currentIndex, res, 11111);
        if (currentIndex) {
          finalAngle = getFinalAngle(_currentAngle, startAngle, currentIndex);
          _awardInfo = reward;
          setAwardInfo(reward);
          setLotteryTimes(chance);
        } else {
          finalAngle = getFinalAngle(_currentAngle, startAngle, 0);
          setFailVisible(true);
          // Toast.fail({ msg: '请重试' });
        }
      })
      .catch(() => {
        // const currentIndex = parseInt(rewards.length * Math.random(), 10); // 随机
        finalAngle = getFinalAngle(_currentAngle, startAngle, 0);
        setFailVisible(true);
      });
  };


  return (
    <div className={styles.outBox}>
      <div className={styles.topBox}>
        <div className={styles.games}>
          <div className={styles.pointer}>
            <div className={styles.times}>抽奖<span>还剩{lotteryTimes}次</span></div>
            <img src={require('../img/pointer.png')} alt="" onClick={drawLottery} />
          </div>
          <Games
            rewards={activityInfo.rewards || []}
            currentAngle={currentAngle}
          />
        </div>
        {
          +activityInfo.showLantern && winnerInfo?.length ? (
            <div className={styles.winnerInfoBox}>
              <Swiper
                direction="vertical"
                indicator={() => null}
                autoplay
                loop
                style={{ height: '100%' }}
              >
                {
                  winnerInfo.map(v => (
                    <Swiper.Item key={Math.random()}>
                      恭喜 {v.phone} 获得{v.rewardName}
                    </Swiper.Item>
                  ))
                }
              </Swiper>
            </div>
          ) : null
        }
      </div>
      <Modal
        modalType={modalType}
        onClose={() => { setType(false); setAwardInfo(null); }}
        awardInfo={awardInfo}
      />
      {
        failVisible ? (
          <div className={styles.failTipBox}>
            <div className={styles.failTip}>
              <p>参与人数过多<br />系统繁忙，请重试</p>
              <div className={styles.failBtn} onClick={() => setFailVisible(false)}>确定</div>
            </div>
          </div>
        ) : null
      }
    </div>
  );
};

export default WheelDiscDetail;
