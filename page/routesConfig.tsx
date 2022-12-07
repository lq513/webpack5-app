import React, { ComponentType, Suspense } from 'react';

const dynamic = (
  ele: Promise<{ default: ComponentType<any> }>,
  loading?: React.ReactElement,
) => {
  const Ele = React.lazy(() => ele);
  return (
    <Suspense fallback={loading || '加载中...'}>
      <Ele/>
    </Suspense>
  );
};

export default [
  {
    path: '/',
    element: dynamic(import('./home')),
    children: [
      {
        index: true,
        element: dynamic(import('./wheelDisc/Detail')),
      },
      {
        path: 'test',
        element: dynamic(import('./test')),
      },
      {
        path: 'wheelDisc',
        element: dynamic(import('./wheelDisc/Detail')),
      },
      {
        path: 'tree',
        element: dynamic(import('./tree')),
      },
      {
        path: 'clock',
        element: dynamic(import('./clock')),
      },
      {
        path: 'canvas',
        element: dynamic(import('./canvas')),
      },
      // { path: 'task', element: dynamic(import('./task')) },
      { path: 'autograph', element: dynamic(import('./autograph')) },
      { path: '*', element: '404' },
    ],
  },
];