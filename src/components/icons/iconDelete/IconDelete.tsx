import React from 'react';

interface IconDeleteProps extends React.SVGProps<SVGSVGElement> {}
const IconDelete: React.FC<IconDeleteProps> = (props) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"{...props}>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M4.66667 4H11.3333V2H4.66667V4ZM4.66667 6.66667H11.3333V14H4.66667V6.66667ZM2 6H3.33333V6.66667V14C3.33333 14.7364 3.93029 15.3333 4.66667 15.3333H11.3333C12.0697 15.3333 12.6667 14.7364 12.6667 14V6.66667V6H14V4.66667H2V6ZM6 8V12.6667H7.33333V8H6ZM8.66667 8V12.6667H10V8H8.66667Z"
              fill="white"/>
    </svg>
);

export default IconDelete