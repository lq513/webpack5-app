import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'coms/Header';
import styles from './index.less';

class Home extends React.Component {
  render() {
    return (
      <>
        <Header/>
        <div className={styles.homeBox}>
          <Outlet />
        </div>
      </>
    );
  }
}

export default Home;