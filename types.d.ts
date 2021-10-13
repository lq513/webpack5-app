declare module '*.jpg';
declare module '*.gif';

declare module '*.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
