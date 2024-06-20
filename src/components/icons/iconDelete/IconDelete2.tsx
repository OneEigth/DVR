import React from 'react';

interface IconDeleteProps extends React.SVGProps<SVGSVGElement> {}
const IconDelete2: React.FC<IconDeleteProps> = (props) => (
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"{...props}>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M4 3H14V0H4V3ZM4 7H14V18H4V7ZM0 6H2V7V18C2 19.1046 2.89543 20 4 20H14C15.1046 20 16 19.1046 16 18V7V6H18V4H0V6ZM6 9V16H8V9H6ZM10 9V16H12V9H10Z"
              fill="#DE7171"/>
    </svg>

);

export default IconDelete2