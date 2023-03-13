import React, { useState, useMemo, useRef, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Switch, Popup, PickerView } from 'antd-mobile';
import { AppstoreOutline } from 'antd-mobile-icons';
import { handleTheme } from '@/tools';
import Sun from 'assets/sun.svg';
import Moon from 'assets/moon.svg';
import lang from 'assets/lang.svg';

import { LangContext } from '../../../page/index';


import './index.css';

const navigation = [
  {
    path: '/test',
    name: <FormattedMessage id='test' />,
  },
  {
    path: '/task',
    name: <FormattedMessage id='task' />,
  },
  {
    path: '/autograph',
    name: <FormattedMessage id='autograph' />,
  },
  {
    path: '/wheeldisc',
    name: <FormattedMessage id='wheeldisc' />,
  },
  {
    path: '/tree',
    name: <FormattedMessage id='cascader' />,
  },
  {
    path: '/clock',
    name: <FormattedMessage id='clock' />,
  },
  {
    path: '/canvas',
    name: <FormattedMessage id='canvas' />,
  },
  {
    path: '/nothing',
    name: '404',
  },
];

const Header = () => {
  const [value, setValue] = useState(false);
  const [visible, setVisible] = useState(false);
  const [langVisible, setLangVisible] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [animationPlayState, setAnimationPlayState] = useState<'paused' | 'running'>('running');
  const logoRef = useRef<HTMLImageElement>(null!);

  const { locale, setLocale } = useContext(LangContext);
  console.log(locale, setLocale);
  
  useMemo(() => {
    const theme = localStorage.getItem('theme');
    const checked = theme === 'dark';
    if (!checked) return;
    handleTheme(true);
    setValue(true);
  }, []);

  const handleMove = useCallback((moveEvent) => {
    const { clientX, clientY } = moveEvent;
    const { width, height } = logoRef.current.style;
    const w = parseInt(width);
    const h = parseInt(height);
    // console.log(clientX, clientY, w, h, '1111');
    setPosition({ x: clientX - w / 2, y: clientY - h / 2 });
  }, []);

  return (
    <>
      <div className="header">
        <div className="icon">
          <AppstoreOutline color='var(--adm-color-primary)' onClick={() => setVisible(true)} style={{ fontSize: '18px', cursor: 'pointer' }}/>
          &nbsp;
          {$DEV && (
            <div className="badge" style={{ fontSize: '12px', height: '15px', borderRadius: '20px', width: '25px' }}>dev</div>
          )}
          &nbsp;
          <img
            ref={logoRef}
            style={{ width: '22px', height: '22px', animationPlayState, ...position ? {
              position: 'fixed',
              top: position.y,
              left: position.x,
              cursor: 'grabbing',
              pointerEvents: 'none',
              width: '50px',
              height: '50px',
            } : {
              animation: 'roll 5s infinite ease-out',
            } }}
            src='./static/favicon.png'
            alt='icon'
            className="logo"
            onMouseEnter={() => {
              if (position) return;
              console.log('onMouseEnter');
              setAnimationPlayState('paused');
            }}
            onMouseLeave={() => {
              if (position) return;
              console.log('onMouseLeave');
              setAnimationPlayState('running');
            }}
            onMouseDown={(e) => {
              e.preventDefault()
              console.log(e.clientX, e.clientY);
              
              // setPosition({ x: e.clientX - 25, y: e.clientY - 25 });
              // setPosition({ x: 0, y: 0 });
              document.body.style = 'cursor: grabbing';
              document.addEventListener('mouseup', () => {
                console.log('onMouseUp');
                document.body.style = '';
                document.removeEventListener('mousemove', handleMove, false);
                setPosition(null);
              }, { once: true });

              document.addEventListener('mousemove', handleMove, false);
            }}
          />
        </div>
        <div className='right'>
          <div className='lang' onClick={() => setLangVisible(true)}>
            <img src={lang} style={{ height: '18px' }}/>
          </div>
          <Switch
            style={{ '--height': '22px', '--width': '30px' }}
            uncheckedText={<img src={Sun} />}
            checkedText={<img src={Moon} />}
            onChange={(checked) => {
              setValue(checked);
              handleTheme(checked);
            }}
            checked={value}
          />
        </div>
      </div>
      <Popup
        bodyClassName="header-popBox"
        visible={visible}
        position="left"
        onMaskClick={() => {
          setVisible(false);
        }}
      >
        { navigation.map((v, i) => (
          <Link to={v.path} key={v.path} >
            {v.name}
          </Link>
        ))}
        <br />
      </Popup>
      <Popup
        // bodyClassName="header-popBox"
        visible={langVisible}
        position="bottom"
        onMaskClick={() => {
          setLangVisible(false);
        }}
      >
        <PickerView
          columns={[
            [
              { label: '简体中文', value: 'zh' },
              { label: 'Englis', value: 'en' },
            ],
          ]}
          // value={value}
          onChange={(val, extend) => {
            setLocale(val[0]);
            console.log('onChange', val, extend.items);
          }}
        />
      </Popup>
    </>
  );
};

export default Header;