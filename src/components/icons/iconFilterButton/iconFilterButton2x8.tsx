import React from 'react';

interface IconView2x8Props {
    active: boolean; // Принимаем проп для указания активного состояния
}

const IconView2x8: React.FC<IconView2x8Props> = ({active}) => (

    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="none" clip-rule="evenodd"
              d="M0.666016 0.666504H7.33268V7.33317H0.666016V0.666504ZM3.33268 8.6665H0.666016V11.3332H3.33268V8.6665ZM3.33268 12.6665H0.666016V15.3332H3.33268V12.6665ZM7.33268 8.6665H4.66602V11.3332H7.33268V8.6665ZM4.66602 12.6665H7.33268V15.3332H4.66602V12.6665ZM15.3327 0.666504H8.66602V7.33317H15.3327V0.666504ZM8.66602 8.6665H11.3327V11.3332H8.66602V8.6665ZM15.3327 8.6665H12.666V11.3332H15.3327V8.6665ZM8.66602 12.6665H11.3327V15.3332H8.66602V12.6665ZM15.3327 12.6665H12.666V15.3332H15.3327V12.6665Z"
              fill={active ? '#FFFFFF' : '#4D4E65'}/>
    </svg>

);

export default IconView2x8;

