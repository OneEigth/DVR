import React from 'react';

interface IconDwnLoadProps extends React.SVGProps<SVGSVGElement> {}
const IconDwnLoad: React.FC<IconDwnLoadProps> = (props) => (
    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg"{...props}>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M8.8138 0V10.58L3.72151 5.4877L2.04395 7.16526L10 15.1213L17.9561 7.16526L16.2785 5.4877L11.1862 10.58V0H8.8138ZM0 15V18V19H1H19H20V18V15H18V17H2V15H0Z"
              fill="#4D4E65"/>
    </svg>
);

export default IconDwnLoad