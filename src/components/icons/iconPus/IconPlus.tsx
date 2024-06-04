import React from 'react';

interface IconPlusProps extends React.SVGProps<SVGSVGElement> {}
const IconPlus: React.FC<IconPlusProps> = (props) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"{...props}>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M8.85719 2H7.1429V7.14258L2 7.14258V8.85686H7.1429V14H8.85719V8.85686H14V7.14258H8.85719V2Z"
              fill="white"/>
        </svg>
);

export default IconPlus