import React from 'react';

interface IconFilterButtonBigProps {
    active: boolean; // Принимаем проп для указания активного состояния
}
const iconFilterButtonBig: React.FC<IconFilterButtonBigProps> = ({active}) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="none" clip-rule="evenodd"
              d="M7.33398 1.3335H1.33398V7.3335H7.33398V1.3335ZM7.33398 8.66683H1.33398V14.6668H7.33398V8.66683ZM8.66732 1.3335H14.6673V7.3335H8.66732V1.3335ZM14.6673 8.66683H8.66732V14.6668H14.6673V8.66683Z"
              fill={active ? '#FFFFFF' : '#4D4E65'} /> {/* Используем цвет в зависимости от активного состояния */}

    </svg>

);

export default iconFilterButtonBig;