import React from 'react';
interface IconOfflineProps extends React.SVGProps<SVGSVGElement> {}

const IconOffline: React.FC<IconOfflineProps> = (props) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="12" r="7" fill="red"/>
    </svg>
);

export default IconOffline;