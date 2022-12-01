import React, { useState, useMemo } from 'react';
import { Switch } from 'antd-mobile';
import { handleTheme } from '@/tools';
import Sun from 'assets/sun.svg';
import Moon from 'assets/moon.svg';

import styles from './index.less';
import { Badge  } from 'antd-mobile';

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
      <div className={styles.icon}>
        <img
          style={{ width: '22xp', height: '22px' }}
          src='./static/favicon.png'
          alt='icon'
        />
        &nbsp;
        <Badge content={$DEV ? 'dev' : null} />
      </div>
      <Switch
        style={{ '--height': '22px', '--width': '30px' }}
        uncheckedText={<div dangerouslySetInnerHTML={{ __html: Sun }} />}
        checkedText={<div dangerouslySetInnerHTML={{ __html: Moon }} />}
        onChange={(checked) => {
          setValue(checked);
          handleTheme(checked);
        }}
        checked={value}
      />
    </div>
  );
};

export default Header;