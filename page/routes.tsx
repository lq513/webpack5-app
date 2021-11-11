import React, { ComponentType, Suspense } from 'react';

interface DynamicProps {
  ele: Promise<{ default: ComponentType<any> }>,
  loading?: React.ReactElement
}

const Dynamic = (props:DynamicProps) => {
  const Ele = React.lazy(() => props.ele);
  return (
    <Suspense fallback={props.loading || '加载中...'}>
      <Ele/>
    </Suspense>
  );
};

export default [
  {
    path: '/',
    element: <Dynamic ele={import('./home')}/>,
    // children: [
    //   {
    //     path: 'messages',
    //     element: null,
    //   },
    //   { path: 'tasks', element: null },
    // ],
  },
  { path: 'team', element: '404' },
];