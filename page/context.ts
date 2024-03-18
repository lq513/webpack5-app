import { createContext } from 'react';
export const initialLocale = 'en';
export default createContext<{ locale: string; setLocale: any }>({ locale: initialLocale, setLocale: null });