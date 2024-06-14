import React from 'react';

interface IconOnlineProps extends React.SVGProps<SVGSVGElement> {}
const IconOnline: React.FC<IconOnlineProps> = (props) => (
    <svg className="IconOnline" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="12" r="7" fill="#5ABEA6"/>
    </svg>
);

export default IconOnline;