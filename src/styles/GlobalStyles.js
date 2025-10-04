import styled, { createGlobalStyle } from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

// Theme-aware global styles
export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: ${props => props.theme.background};
    min-height: 100vh;
    color: ${props => props.theme.text};
    transition: all 0.3s ease;
  }

  #root {
    min-height: 100vh;
  }
`;

// Theme-aware components
export const createThemedComponents = (theme) => {
  const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  `;

  const Card = styled.div`
    background: ${theme.cardBackground};
    border-radius: 20px;
    padding: 30px;
    box-shadow: ${theme.shadow};
    margin-bottom: 30px;
    border: 1px solid ${theme.border};
    transition: all 0.3s ease;
  `;

  const Button = styled.button`
    background: ${props => props.primary ? theme.primary : 'transparent'};
    color: ${props => props.primary ? 'white' : theme.primary};
    border: 2px solid ${theme.primary};
    padding: 12px 24px;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 5px;
    font-size: 16px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
      background: ${props => props.primary ? theme.primaryHover : 'transparent'};
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  `;

  const ProgressBar = styled.div`
    width: 100%;
    height: 8px;
    background: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    margin: 20px 0;

    &::after {
      content: '';
      display: block;
      height: 100%;
      width: ${props => props.progress}%;
      background: linear-gradient(90deg, ${theme.primary}, #764ba2);
      border-radius: 10px;
      transition: width 0.5s ease;
    }
  `;

  return {
    Container,
    Card,
    Button,
    ProgressBar
  };
};