import React, { lazy } from 'react';

const Home = lazy(() => import('./home'));
const WheelDisc = lazy(() => import('./wheelDisc/Detail'));
const Test = lazy(() => import('./test'));
// const Task = lazy(() => import('./task'));
const Tree = lazy(() => import('./tree'));
const Clock = lazy(() => import('./clock'));
const Canvas = lazy(() => import('./canvas'));
const Autograph = lazy(() => import('./autograph'));

export default [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        index: true,
        element: <WheelDisc/>,
      },
      {
        path: 'test',
        element: <Test />,
      },
      {
        path: 'wheelDisc',
        element:  <WheelDisc/>,
      },
      {
        path: 'tree',
        element: <Tree />,
      },
      {
        path: 'clock',
        element: <Clock />,
      },
      {
        path: 'canvas',
        element: <Canvas />,
      },
      // { path: 'task', element: <Task/> },
      { path: 'autograph', element: <Autograph /> },
      { path: '*', element: '404' },
    ],
  },
];