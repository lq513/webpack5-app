declare module '*.jpg';
declare module '*.gif';
declare module '*.txt';

declare const $DEV:boolean;


declare module '*.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
