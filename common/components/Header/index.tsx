import React, { useState, useMemo } from 'react';
import { Switch } from 'antd-mobile';
import { handleTheme } from '@/tools';

import styles from './index.less';

const Header = () => {
  const [value, setValue] = useState(false);
  useMemo(() => {
    const theme = localStorage.getItem('theme');
    const checked = theme === 'dark';
    if (!checked) return;
    handleTheme(true);
    setValue(true);
  }, []);

  return (
    <div className={styles.header}>
      <div>
        <img src='./static/favicon.png' alt='x'/>
      </div>
      <div>
        夜间模式：
        <Switch
          onChange={(checked) => {
            setValue(checked);
            handleTheme(checked);
          }}
          checked={value}
        />
      </div>
    </div>
  );
};

export default Header;