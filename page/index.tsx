import React, { Suspense, useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import Skeleton from 'coms/Skeleton';
import routesConfig from './routesConfig';
import messages from 'i18n/index';
import LangContext, { initialLocale } from './context';

// import '@formatjs/intl-numberformat/polyfill';
// import '@formatjs/intl-datetimeformat/add-all-tz';

// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
// require('./_test');

import 'style/index.less';

const cache = createIntlCache();

const RoutesConfig = () => useRoutes(routesConfig);

const Root = () => {
  const [locale, setLocale] = useState(initialLocale);

  const contextValue = useMemo(() => ({
    locale,
    setLocale,
  }), [locale]);

  const intl = useMemo(() => {
    return createIntl(
      { locale: initialLocale, messages: messages[locale] },
      cache,
    );
  }, [locale]);
  

  useEffect(() => {
    // console.trace('1111');
    // const p = import(/* webpackPreload: true */ './home');
    // p.then((e) => {
    //   const { default: Home } = e;
    //   console.log(e);
    // });
  }, []);

  return (
    <LangContext.Provider value={contextValue}>
      <RawIntlProvider value={intl}>
        <Suspense fallback={<Skeleton />}>
          <Router>
            <RoutesConfig/>
          </Router>
        </Suspense>
      </RawIntlProvider>
    </LangContext.Provider>
  );
};

const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(<Root />);
