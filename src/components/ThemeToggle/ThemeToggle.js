import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ToggleButton = styled.button`
  background: ${props => props.theme.cardBackground};
  border: 2px solid ${props => props.theme.border};
  color: ${props => props.theme.text};
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  width: 50px;
  height: 50px;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }
`;

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ToggleButton onClick={toggleTheme} aria-label="Toggle theme">
      {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
    </ToggleButton>
  );
};

export default ThemeToggle;