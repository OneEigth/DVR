declare module '*.png';
declare module '*.jpg';
declare module '*.mp3';
declare module '*.jpeg';
declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}
