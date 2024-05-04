import React from 'react';

interface IconFilterButtonMediumProps {
    active: boolean; // Принимаем проп для указания активного состояния
}

const IconFilterButtonMedium: React.FC<IconFilterButtonMediumProps> = ({ active }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="none" clipRule="evenodd"
              d="M7.33398 1.6665H1.33398V4.99984H7.33398V1.6665ZM1.33398 6.33317H7.33398V9.6665H1.33398V6.33317ZM7.33398 10.9998H1.33398V14.3332H7.33398V10.9998ZM14.6673 1.6665H8.66732V4.99984H14.6673V1.6665ZM8.66732 6.33317H14.6673V9.6665H8.66732V6.33317ZM14.6673 10.9998H8.66732V14.3332H14.6673V10.9998Z"
              fill={active ? '#FFFFFF' : '#4D4E65'} /> {/* Используем цвет в зависимости от активного состояния */}
    </svg>
);

export default IconFilterButtonMedium;