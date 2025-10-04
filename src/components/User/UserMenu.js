import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FiUser, FiLogOut, FiSettings, FiAward } from 'react-icons/fi';

const UserMenu = ({ onProfileClick }) => {
  const { currentUser, logout } = useAuth();
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  if (!currentUser) return null;

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: theme.colors.text,
          padding: '8px 12px',
          borderRadius: '25px',
          transition: 'all 0.3s ease',
          background: theme.isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = theme.isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = theme.isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
        }}
      >
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          style={{
            width: '35px',
            height: '35px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: `2px solid ${theme.colors.primary}`
          }}
        />
        <span style={{ fontWeight: '500', fontSize: '14px' }}>{currentUser.name.split(' ')[0]}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              background: theme.colors.cardBackground,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: '15px',
              padding: '10px 0',
              minWidth: '200px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              zIndex: 1000,
              marginTop: '10px',
              overflow: 'hidden'
            }}
          >
            <div style={{ 
              padding: '15px', 
              borderBottom: `1px solid ${theme.colors.border}`,
              background: theme.isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'
            }}>
              <div style={{ fontWeight: '600', color: theme.colors.text, fontSize: '16px' }}>{currentUser.name}</div>
              <div style={{ fontSize: '14px', color: theme.colors.textSecondary, marginTop: '2px' }}>{currentUser.email}</div>
              <div style={{ 
                fontSize: '12px', 
                color: theme.colors.primary, 
                textTransform: 'capitalize',
                marginTop: '5px'
              }}>
                {currentUser.role}
              </div>
            </div>

            <button
              style={{
                width: '100%',
                padding: '12px 15px',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                color: theme.colors.text,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s ease',
                fontSize: '14px'
              }}
              onClick={() => {
                setIsOpen(false);
                onProfileClick();
              }}
              onMouseEnter={(e) => {
                e.target.style.background = theme.isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              <FiUser size={16} />
              My Profile
            </button>

            <button
              style={{
                width: '100%',
                padding: '12px 15px',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                color: theme.colors.text,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s ease',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = theme.isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              <FiAward size={16} />
              Achievements
            </button>

            <button
              style={{
                width: '100%',
                padding: '12px 15px',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                color: theme.colors.text,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s ease',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = theme.isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              <FiSettings size={16} />
              Settings
            </button>

            <div style={{ padding: '5px 0', borderTop: `1px solid ${theme.colors.border}` }}>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: '#e53e3e',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = theme.isDarkMode ? 'rgba(229, 62, 62, 0.1)' : 'rgba(229, 62, 62, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                <FiLogOut size={16} />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close when clicking outside */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default UserMenu;