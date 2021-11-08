import React, { useState } from 'react';
import { Switch } from 'antd-mobile';
import { handleTheme } from '@/tools';

import styles from './index.less';

const Header = () => {
  const [value, setValue] = useState(false);

  return (
    <div className={styles.header}>
      夜间模式：
      <Switch
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