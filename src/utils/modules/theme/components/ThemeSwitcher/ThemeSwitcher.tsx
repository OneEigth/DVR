import React from 'react';
import { useTheme } from '../../ThemeProvider';
import { Button } from 'antd';

export const ThemeSwitcher = () => {
    const { toggleTheme } = useTheme();

    return (
        <Button
            className={'body medium-bold button-base button-type-primary button-size-medium'}
            onClick={toggleTheme}
        >
            Переключить тему
        </Button>
    );
};
