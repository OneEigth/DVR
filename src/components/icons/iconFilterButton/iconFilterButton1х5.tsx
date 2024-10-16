import React from 'react';

interface IconView1x5Props {
    active: boolean; // Принимаем проп для указания активного состояния
}
const IconView1x5: React.FC<IconView1x5Props> = ({active}) => (

    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="none" clip-rule="evenodd"
          d="M10.0007 1.3335H1.33398V10.0002H10.0007V1.3335ZM5.33398 10.6668H1.33398V14.6668H5.33398V10.6668ZM6.00065 10.6668H10.0007V14.6668H6.00065V10.6668ZM14.6673 1.3335H10.6673V5.3335H14.6673V1.3335ZM10.6673 6.00016H14.6673V10.0002H10.6673V6.00016ZM14.6673 10.6668H10.6673V14.6668H14.6673V10.6668Z"
          fill={active ? '#FFFFFF' : '#4D4E65'}/>
</svg>

);

export default IconView1x5;