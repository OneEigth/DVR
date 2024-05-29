import React from 'react';


interface IconLayoutMenuProps extends React.SVGProps<SVGSVGElement> {}
const IconLayoutMenu: React.FC<IconLayoutMenuProps> = (props) => (
    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg"{...props}>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M9.41341 2.91667H3.87174V8.16667H9.41341V2.91667ZM10.5801 5.54167V9.625H6.49674V11.0833H12.0384V5.54167H10.5801ZM5.33008 9.625V12.25H13.2051V4.375H10.5801V1.75H2.70508V9.625H5.33008Z"
              fill="white"/>
    </svg>
);

export default IconLayoutMenu;