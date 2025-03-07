import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState({
        primary: '#ff6b6b',
        secondary: '#4ecdc4',
        accent: '#10B981',
        dark: {
            bg: '#292525',
            card: '#352d2d',
            button: '#352d2d',
            text: '#e2eaec'
        },
        light: {
            bg: '#ffffff',
            card: '#f9f9f9',
            button: '#1a1a1a',
            text: '#292541'
        }
    });

    const updateTheme = (newTheme) => {
        setTheme(prev => ({
            ...prev,
            ...newTheme
        }));
    };

    return (
        <ThemeContext.Provider value={{ theme, updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ThemeContext; 