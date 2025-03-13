import React, { useEffect, useState } from 'react';
import { Button, Flex } from 'antd';
import IconFilterButtonSmall from '../../icons/iconFilterButton/iconFilterButtonSmall';
import IconFilterButtonMedium from '../../icons/iconFilterButton/iconFilterButtonMedium';
import IconFilterButtonBig from '../../icons/iconFilterButton/iconFilterButtonBig';
import './style/style.css';

interface ButtonsfilterProps {
    onFilterButtonClick: (size: 'small' | 'medium' | 'big') => void;
}

const Buttonsfilter: React.FC<ButtonsfilterProps> = ({ onFilterButtonClick }) => {
    const [activeButton, setActiveButton] = useState<'small' | 'medium' | 'big'>(() => {
        // Восстанавливаем состояние из localStorage при инициализации
        const savedSize = localStorage.getItem('activeButtonSize');
        return (savedSize as 'small' | 'medium' | 'big') || 'small'; // По умолчанию 'small'
    });

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleButtonClick = (size: 'small' | 'medium' | 'big') => {
        setActiveButton(size);
        onFilterButtonClick(size);
        localStorage.setItem('activeButtonSize', size); // Сохраняем состояние в localStorage
    };

    const isMediumVisible = windowWidth > 850;
    const isBigVisible = windowWidth > 1024;

    return (
        <Flex gap="small" wrap="wrap" className="flex">
            <Button
                className="FilterButtonSmall"
                type="primary"
                icon={<IconFilterButtonSmall active={activeButton === 'small'} />}
                style={{
                    backgroundColor: activeButton === 'small' ? '#4D4E65' : '#FFFFFF',
                    color: activeButton === 'small' ? '#FFFFFF' : '#4D4E65',
                    border: '1px solid #4D4E65',
                    display: 'flex',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    paddingTop: '10px',
                }}
                onClick={() => handleButtonClick('small')}
            />
            {isMediumVisible && (
                <Button
                    className="FilterButtonMedium"
                    type="primary"
                    icon={<IconFilterButtonMedium active={activeButton === 'medium'} />}
                    style={{
                        backgroundColor: activeButton === 'medium' ? '#4D4E65' : '#FFFFFF',
                        color: activeButton === 'medium' ? '#FFFFFF' : '#4D4E65',
                        border: '1px solid #4D4E65',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '8px',
                    }}
                    onClick={() => handleButtonClick('medium')}
                />
            )}
            {isBigVisible && (
                <Button
                    className="FilterButtonBig"
                    type="primary"
                    icon={<IconFilterButtonBig active={activeButton === 'big'} />}
                    style={{
                        backgroundColor: activeButton === 'big' ? '#4D4E65' : '#FFFFFF',
                        color: activeButton === 'big' ? '#FFFFFF' : '#4D4E65',
                        border: '1px solid #4D4E65',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '8px',
                    }}
                    onClick={() => handleButtonClick('big')}
                />
            )}
        </Flex>
    );
};

export default Buttonsfilter;
