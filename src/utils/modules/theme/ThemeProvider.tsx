import React, { useState, useContext, useEffect, ReactNode, useMemo } from 'react';
import { ThemeContext } from './context/ThemeContext';
import { Theme } from './consts/Theme';

interface ThemeProviderProps {
    children: ReactNode;
    initialTheme?: Theme;
}

const fallbackTheme = localStorage.getItem('theme') as Theme;

export const ThemeProvider = ({ children, initialTheme }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(fallbackTheme || initialTheme || Theme.LIGHT);
    const [isThemeInited, setIsThemeInited] = useState(false);

    useEffect(() => {
        if (!isThemeInited && initialTheme) {
            setTheme(initialTheme);
            setIsThemeInited(true);
        }
    }, [initialTheme, isThemeInited]);

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        setTheme(newTheme);
        // console.log(fallbackTheme, initialTheme, theme);
        localStorage.setItem('theme', newTheme);
    };

    const defaultProps = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme]);

    return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    return useContext(ThemeContext);
};
