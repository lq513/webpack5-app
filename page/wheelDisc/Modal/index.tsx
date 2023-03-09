import React, { Component, Fragment } from 'react';
import { Modal } from 'antd-mobile';

import styles from './index.less';

interface CommonModalProps {
  modalType: number | boolean,
  awardInfo: { jumpUrl: string, rewardName:string } | null,
  onClose: () => void,
}

// modalType-1:活动结束 2:显示奖品
export default class CommonModal extends Component<CommonModalProps> {
  public timer:(number | null) = null;

  _onClose = () => {
    const { onClose } = this.props;
    if (onClose) onClose();
  };

  handleConfirm = () => {
    const { modalType, awardInfo, onClose } = this.props;
    if (modalType === 2 && awardInfo && awardInfo.jumpUrl) {
      window.location.href = awardInfo.jumpUrl;
    } else if (onClose) {
      onClose();
    }
  };

  _renderContent = () => {
    const { modalType, awardInfo } = this.props;
    if (modalType === 2 && !awardInfo) return null;
    return (
      <Fragment>
        <img src={require(`../img/modal${modalType}.png`)} alt="背景" />
        <div className={styles.info}>
          {modalType === 2 ? <div className={styles.reward}>{awardInfo?.rewardName || '奖品'}</div> : null}
          <div className={styles.btn} onClick={this.handleConfirm}>确定</div>
        </div>
      </Fragment>
    );
  };

  render() {
    const { modalType } = this.props;
    if (!modalType) return null;
    return (
      <Modal
        visible={!!modalType}
        onClose={this._onClose}
        className={styles.modal}
        bodyStyle={{ backgroundColor: 'transparent', padding: 0, maxHeight: 'fit-content' }}
        content={
          <div className={styles.commonBG}>
            {this._renderContent()}
          </div>
        }
      />
    );
  }
}
