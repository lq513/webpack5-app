import React, { useState, useMemo, useRef, useCallback, useContext, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Switch, Popup, PickerView, Collapse } from 'antd-mobile';
import { AppstoreOutline } from 'antd-mobile-icons';
import { handleTheme } from '@/tools';
import Sun from 'assets/sun.svg';
import Moon from 'assets/moon.svg';
import lang from 'assets/lang.svg';

import { LangContext } from '../../../page/index';


import './index.css';

const navigation = [
  {
    platform: <FormattedMessage id='mobile' />,
    pages: [
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
    ],
  }, {
    platform: <FormattedMessage id='desktop' />,
    pages: [
      {
        path: '/tree',
        name: <FormattedMessage id='cascader' />,
      },
    ]
  }
];

const Header = () => {
  const [value, setValue] = useState(false);
  const [visible, setVisible] = useState(false);
  const [langVisible, setLangVisible] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [animationPlayState, setAnimationPlayState] = useState<'paused' | 'running'>('running');
  const logoRef = useRef<HTMLImageElement>(null!);

  const { locale, setLocale } = useContext(LangContext);
  // console.log(locale, setLocale);
  
  useMemo(() => {
    const theme = localStorage.getItem('theme');
    const checked = theme === 'dark';
    if (!checked) return;
    handleTheme(true);
    setValue(true);
  }, []);

  const handleMove = useCallback((moveEvent: Event) => {
    const { clientX, clientY } = moveEvent as unknown as MouseEvent;
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
              transition: 'width 0.3s, height 0.3s',
              width: '50px',
              height: '50px',
            } : {
              // don't mix shorthand and non-shorthand properties
              animationName: 'roll',
              animationDuration: '5s',
              animationTimingFuncton: 'ease-out',
              animationIterationCount: 'infinite',
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
                setAnimationPlayState('running');
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
        {/* 页面导航 */}
        <Collapse accordion >
          { navigation.map((item, i) => {
            return (
              <Collapse.Panel title={item.platform} key={i}>
                {
                  item.pages.map((v) => (
                    <Link to={v.path} key={v.path} >
                    {v.name}
                    </Link>
                  ))
                }
              </Collapse.Panel>
            )
          })}
        </Collapse>
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
              { label: 'Englis', value: 'en' },
              { label: '简体中文', value: 'zh' },
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