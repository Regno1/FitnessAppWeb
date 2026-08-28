// src/components/common/Loader.jsx
import React from 'react';

const Loader = ({ fullscreen = false, message = 'Loading...' }) => {
  const content = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
    }}>
      {/* Animated ring */}
      <div style={{ position: 'relative', width: 64, height: 64 }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '3px solid rgba(124, 58, 237, 0.15)',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '3px solid transparent',
          borderTopColor: '#7c3aed',
          borderRightColor: '#06b6d4',
          animation: 'spin 0.9s linear infinite',
        }} />
        <div style={{
          position: 'absolute',
          inset: 8,
          borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: '#a78bfa',
          animation: 'spin 1.3s linear infinite reverse',
        }} />
        <span style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem',
        }}>⚡</span>
      </div>

      {message && (
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          fontWeight: 500,
          letterSpacing: '0.02em',
        }}>
          {message}
        </p>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        zIndex: 9999,
      }}>
        {content}
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
    }}>
      {content}
    </div>
  );
};

export default Loader;