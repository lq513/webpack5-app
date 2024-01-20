declare module '*.jpg';
declare module '*.gif';
declare module '*.svg';
declare module '*.png';
declare module '*.txt';
declare module '*.html';

declare const $DEV:boolean;


declare module '*.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
