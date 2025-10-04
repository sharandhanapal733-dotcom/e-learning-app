import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FiUser, FiMail, FiCalendar, FiEdit, FiSave, FiX } from 'react-icons/fi';

const UserProfile = ({ isOpen, onClose }) => {
  const { currentUser, updateProfile } = useAuth();
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: currentUser?.name || '',
    bio: currentUser?.bio || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const result = await updateProfile(editData);
    if (result.success) {
      setIsEditing(false);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setEditData({
      name: currentUser?.name || '',
      bio: currentUser?.bio || ''
    });
    setIsEditing(false);
  };

  if (!isOpen || !currentUser) return null;

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
          background: theme.colors.cardBackground,
          borderRadius: '20px',
          padding: '30px',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: `1px solid ${theme.colors.border}`
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: theme.colors.text }}>Profile</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: theme.colors.text,
              cursor: 'pointer',
              fontSize: '24px'
            }}
          >
            <FiX />
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '15px',
              border: `3px solid ${theme.colors.primary}`
            }}
          />
          {isEditing ? (
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
              style={{
                background: theme.colors.cardBackground,
                color: theme.colors.text,
                border: `2px solid ${theme.colors.border}`,
                borderRadius: '10px',
                padding: '10px',
                fontSize: '18px',
                fontWeight: '600',
                textAlign: 'center',
                width: '100%',
                maxWidth: '300px'
              }}
            />
          ) : (
            <h3 style={{ color: theme.colors.text, marginBottom: '5px' }}>{currentUser.name}</h3>
          )}
          <p style={{ color: theme.colors.textSecondary, textTransform: 'capitalize' }}>
            {currentUser.role}
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <FiMail color={theme.colors.primary} />
            <span style={{ color: theme.colors.text }}>{currentUser.email}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <FiCalendar color={theme.colors.primary} />
            <span style={{ color: theme.colors.text }}>
              Joined {new Date(currentUser.joinedDate).toLocaleDateString()}
            </span>
          </div>

          <div style={{ marginTop: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: theme.colors.text, fontWeight: '600' }}>
              Bio
            </label>
            {isEditing ? (
              <textarea
                value={editData.bio}
                onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                rows="4"
                style={{
                  width: '100%',
                  background: theme.colors.cardBackground,
                  color: theme.colors.text,
                  border: `2px solid ${theme.colors.border}`,
                  borderRadius: '10px',
                  padding: '12px',
                  fontSize: '14px',
                  resize: 'vertical'
                }}
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p style={{ color: theme.colors.text, lineHeight: '1.6' }}>
                {currentUser.bio || 'No bio provided.'}
              </p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                disabled={loading}
                style={{
                  padding: '10px 20px',
                  background: 'transparent',
                  color: theme.colors.text,
                  border: `2px solid ${theme.colors.border}`,
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <FiX style={{ marginRight: '5px' }} />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                style={{
                  padding: '10px 20px',
                  background: theme.colors.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <FiSave style={{ marginRight: '5px' }} />
                {loading ? 'Saving...' : 'Save'}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: '10px 20px',
                background: theme.colors.primary,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <FiEdit style={{ marginRight: '5px' }} />
              Edit Profile
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserProfile;