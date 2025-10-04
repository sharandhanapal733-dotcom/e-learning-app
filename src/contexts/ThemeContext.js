import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('themePreference');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('themePreference', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode ? darkTheme : lightTheme
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Theme definitions
export const lightTheme = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  cardBackground: '#ffffff',
  text: '#333333',
  textSecondary: '#666666',
  border: '#e0e0e0',
  primary: '#667eea',
  primaryHover: '#5a6fd8',
  success: '#28a745',
  warning: '#ffc107',
  error: '#dc3545',
  shadow: '0 20px 40px rgba(0,0,0,0.1)'
};

export const darkTheme = {
  background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
  cardBackground: '#2d3748',
  text: '#ffffff',
  textSecondary: '#cbd5e0',
  border: '#4a5568',
  primary: '#667eea',
  primaryHover: '#5a6fd8',
  success: '#48bb78',
  warning: '#ed8936',
  error: '#f56565',
  shadow: '0 20px 40px rgba(0,0,0,0.3)'
};