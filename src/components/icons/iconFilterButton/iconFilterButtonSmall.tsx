import React from 'react';

interface IconFilterButtonSmallProps {
    active: boolean; // Принимаем проп для указания активного состояния
}
const iconFilterButtonSmall: React.FC<IconFilterButtonSmallProps> = ({active}) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="none" clip-rule="evenodd"
              d="M2.33398 0.333496H0.333984V3.66683H2.33398V0.333496ZM2.33398 5.00016H0.333984V7.00016H2.33398V5.00016ZM0.333984 8.3335H2.33398V10.3335H0.333984V8.3335ZM2.33398 11.6668H0.333984V13.6668H2.33398V11.6668ZM3.66732 0.333496H13.6673V3.66683H3.66732V0.333496ZM13.6673 5.00016H3.66732V7.00016H13.6673V5.00016ZM3.66732 8.3335H13.6673V10.3335H3.66732V8.3335ZM13.6673 11.6668H3.66732V13.6668H13.6673V11.6668Z"
              fill={active ? '#FFFFFF' : '#4D4E65'} /> {/* Используем цвет в зависимости от активного состояния */}
    </svg>
);

export default iconFilterButtonSmall;