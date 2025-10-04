import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FiMail, FiLock, FiUser, FiUserPlus, FiAlertCircle } from 'react-icons/fi';

const Register = ({ onSwitchToLogin, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const theme = useTheme();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const result = await register(formData);
    
    if (result.success) {
      onClose?.();
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        background: theme.colors.cardBackground,
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '400px',
        width: '100%',
        margin: '0 auto',
        border: `1px solid ${theme.colors.border}`
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: theme.colors.text }}>
        Create Account
      </h2>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: '#fee',
            color: '#c33',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <FiAlertCircle />
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: theme.colors.text }}>
            Full Name
          </label>
          <div style={{ position: 'relative' }}>
            <FiUser style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: theme.colors.textSecondary
            }} />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 12px 12px 45px',
                border: `2px solid ${theme.colors.border}`,
                borderRadius: '10px',
                background: theme.colors.cardBackground,
                color: theme.colors.text,
                fontSize: '16px'
              }}
              placeholder="Enter your full name"
            />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: theme.colors.text }}>
            Email Address
          </label>
          <div style={{ position: 'relative' }}>
            <FiMail style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: theme.colors.textSecondary
            }} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 12px 12px 45px',
                border: `2px solid ${theme.colors.border}`,
                borderRadius: '10px',
                background: theme.colors.cardBackground,
                color: theme.colors.text,
                fontSize: '16px'
              }}
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: theme.colors.text }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <FiLock style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: theme.colors.textSecondary
            }} />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 12px 12px 45px',
                border: `2px solid ${theme.colors.border}`,
                borderRadius: '10px',
                background: theme.colors.cardBackground,
                color: theme.colors.text,
                fontSize: '16px'
              }}
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: theme.colors.text }}>
            Confirm Password
          </label>
          <div style={{ position: 'relative' }}>
            <FiLock style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: theme.colors.textSecondary
            }} />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 12px 12px 45px',
                border: `2px solid ${theme.colors.border}`,
                borderRadius: '10px',
                background: theme.colors.cardBackground,
                color: theme.colors.text,
                fontSize: '16px'
              }}
              placeholder="Confirm your password"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '15px',
            background: theme.colors.primary,
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Creating Account...' : (
            <>
              <FiUserPlus style={{ marginRight: '8px', display: 'inline' }} />
              Create Account
            </>
          )}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px', color: theme.colors.textSecondary }}>
        Already have an account?{' '}
        <button
          onClick={onSwitchToLogin}
          style={{
            background: 'none',
            border: 'none',
            color: theme.colors.primary,
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          Sign in here
        </button>
      </div>
    </motion.div>
  );
};

export default Register;