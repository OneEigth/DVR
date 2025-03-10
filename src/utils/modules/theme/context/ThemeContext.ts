import { createContext } from 'react';
import { Theme } from '../consts/Theme';

export interface ThemeContextProps {
    theme?: Theme;
    setTheme?: (theme: Theme) => void;
    toggleTheme?: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});
