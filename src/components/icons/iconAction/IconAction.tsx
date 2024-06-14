import React from 'react';

interface IconActionProps extends React.SVGProps<SVGSVGElement> {}
const IconAction: React.FC<IconActionProps> = (props) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"{...props}>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M13.334 8.00065C13.334 10.9462 10.9462 13.334 8.00065 13.334C5.05513 13.334 2.66732 10.9462 2.66732 8.00065C2.66732 5.05513 5.05513 2.66732 8.00065 2.66732C10.9462 2.66732 13.334 5.05513 13.334 8.00065ZM14.6673 8.00065C14.6673 11.6825 11.6825 14.6673 8.00065 14.6673C4.31875 14.6673 1.33398 11.6825 1.33398 8.00065C1.33398 4.31875 4.31875 1.33398 8.00065 1.33398C11.6825 1.33398 14.6673 4.31875 14.6673 8.00065ZM8.66732 6.66732V12.0007H7.33398V6.66732H8.66732ZM8.66732 6.00065V4.66732H7.33398V6.00065H8.66732Z"
              fill="white"/>
    </svg>
);

export default IconAction