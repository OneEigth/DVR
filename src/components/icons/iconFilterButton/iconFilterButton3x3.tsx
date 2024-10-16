import React from 'react';

interface IconView3x3Props {
    active: boolean; // Принимаем проп для указания активного состояния
}

const IconView3x3: React.FC<IconView3x3Props> = ({active}) => (

    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="none" clip-rule="evenodd"
              d="M1.33398 1.3335H5.33398V5.3335H1.33398V1.3335ZM1.33398 6.00016H5.33398V10.0002H1.33398V6.00016ZM5.33398 10.6668H1.33398V14.6668H5.33398V10.6668ZM6.00065 1.3335H10.0007V5.3335H6.00065V1.3335ZM10.0007 6.00016H6.00065V10.0002H10.0007V6.00016ZM6.00065 10.6668H10.0007V14.6668H6.00065V10.6668ZM14.6673 1.3335H10.6673V5.3335H14.6673V1.3335ZM10.6673 6.00016H14.6673V10.0002H10.6673V6.00016ZM14.6673 10.6668H10.6673V14.6668H14.6673V10.6668Z"
              fill={active ? '#FFFFFF' : '#4D4E65'}/>
    </svg>

);

export default IconView3x3;
