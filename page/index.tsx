import React, { Suspense, useState, createContext, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routesConfig from './routesConfig';
import zh from 'i18n/zh.json';
import en from 'i18n/en.json';

// import '@formatjs/intl-numberformat/polyfill';
// import '@formatjs/intl-datetimeformat/add-all-tz';

// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
// require('./_test');

import 'style/index.less';

const initialLocale = 'en';
export const messages: Record<string, Record<string, string>> = {
  en,
  zh,
};
const cache = createIntlCache();

const RoutesConfig = () => useRoutes(routesConfig);

export const LangContext = createContext<{ locale: string; setLocale: any }>({ locale: initialLocale, setLocale: null });

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
        <Suspense fallback="加载中...">
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
