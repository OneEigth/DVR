import React from 'react';

interface IconEditProps extends React.SVGProps<SVGSVGElement> {}
const IconEdit: React.FC<IconEditProps> = (props) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"{...props}>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M4.88315 12.6663H3.33398V11.0967L13.0965 1.33301L14.6673 2.92491L4.88315 12.6663ZM1.33398 15.333L14.6673 15.333V13.9997L1.33398 13.9997V15.333Z"
              fill="white"/>
    </svg>

);

export default IconEdit