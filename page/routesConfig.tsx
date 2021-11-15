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
        element: dynamic(import('./test')),
      },
      {
        path: 'test',
        element: dynamic(import('./test')),
      },
      { path: 'task', element: dynamic(import('./task')) },
      { path: '*', element: '404' },
    ],
  },
];