import React from 'react';
import autograph from 'skel/autograph.html';
import home from 'skel/home.html';

import 'skel/skel.css';

const Skeleton = () => {

  let Html = 'loading...';
  switch (window.location.pathname) {
    case '/':
    case '/wheeldisc':
      Html = home;
      break;
    case '/autograph':
      Html = autograph;
      break;
    default:
      break;
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: Html }} />
  );
};

export default Skeleton;