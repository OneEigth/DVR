import React from 'react';


interface IconAllCamsMenuProps extends React.SVGProps<SVGSVGElement> {}
const IconAllCamsMenu: React.FC<IconAllCamsMenuProps> = (props) => (
    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg"{...props}>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M3.28906 1.16634C3.28906 0.844175 3.55023 0.583008 3.8724 0.583008H12.0391C12.3612 0.583008 12.6224 0.844175 12.6224 1.16634V12.833C12.6224 13.1552 12.3612 13.4163 12.0391 13.4163H3.8724C3.55023 13.4163 3.28906 13.1552 3.28906 12.833V1.16634ZM10.2891 2.91634V10.4997H5.6224V2.91634H10.2891ZM4.45573 1.74967V12.2497H11.4557V1.74967H4.45573ZM9.70573 11.6663V11.083H6.20573V11.6663H9.70573Z"
              fill="white"/>
    </svg>
);

export default IconAllCamsMenu;