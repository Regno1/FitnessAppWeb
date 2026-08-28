// src/components/common/Button.jsx
import React from 'react';

const VARIANTS = {
  primary: {
    background: '#000000',
    color: '#ffffff',
    border: 'none',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.18)',
  },
  secondary: {
    background: '#f7f7f7',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-light)',
    boxShadow: 'none',
  },
  danger: {
    background: '#f7f7f7',
    color: '#111111',
    border: '1px solid #d0d0d0',
    boxShadow: 'none',
  },
  ghost: {
    background: 'transparent',
    color: '#000000',
    border: '1px solid rgba(0,0,0,0.15)',
    boxShadow: 'none',
  },
};

const SIZES = {
  sm: { padding: '0.4rem 0.9rem', fontSize: '0.8rem' },
  md: { padding: '0.65rem 1.4rem', fontSize: '0.9rem' },
  lg: { padding: '0.85rem 2rem', fontSize: '1rem' },
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  fullWidth = false,
  style = {},
  ...rest
}) => {
  const variantStyles = VARIANTS[variant] || VARIANTS.primary;
  const sizeStyles    = SIZES[size] || SIZES.md;
  const isDisabled    = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        borderRadius: 'var(--radius-md)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.55 : 1,
        transition: 'all var(--transition-fast)',
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
        width: fullWidth ? '100%' : undefined,
        ...variantStyles,
        ...sizeStyles,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!isDisabled) {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.filter = 'brightness(1.1)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.filter = 'brightness(1)';
      }}
      {...rest}
    >
      {loading ? (
        <>
          <span style={{
            width: 14, height: 14,
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
            display: 'inline-block',
          }} />
          Loading...
        </>
      ) : children}
    </button>
  );
};

export default Button;
