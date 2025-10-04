import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import Login from './Login';
import Register from './Register';
import { FiX } from 'react-icons/fi';

const AuthModal = ({ isOpen, onClose }) => {
  const [currentView, setCurrentView] = useState('login');
  const theme = useTheme();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '450px',
          width: '100%'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: theme.colors.cardBackground,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            color: theme.colors.text
          }}
        >
          <FiX size={20} />
        </button>

        <AnimatePresence mode="wait">
          {currentView === 'login' ? (
            <Login 
              key="login"
              onSwitchToRegister={() => setCurrentView('register')}
              onClose={onClose}
            />
          ) : (
            <Register 
              key="register"
              onSwitchToLogin={() => setCurrentView('login')}
              onClose={onClose}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;