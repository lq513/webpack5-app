declare module '*.jpg';

declare module '*.less' {
    const classes: { readonly [key: string]: string }
    export default classes
}
