// src/components/common/Toast.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectToast, clearToast } from '../../store/uiSlice';
import { TOAST_DURATION } from '../../utils/constants';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';

const TOAST_STYLES = {
  success: {
    borderColor: '#e8e8e8',
    background: '#ffffff',
    Icon: CheckCircle2,
    iconColor: '#000000',
  },
  error: {
    borderColor: '#e8e8e8',
    background: '#ffffff',
    Icon: XCircle,
    iconColor: '#000000',
  },
  info: {
    borderColor: '#e8e8e8',
    background: '#ffffff',
    Icon: Info,
    iconColor: '#000000',
  },
  warning: {
    borderColor: '#e8e8e8',
    background: '#ffffff',
    Icon: AlertTriangle,
    iconColor: '#000000',
  },
};

const Toast = () => {
  const dispatch = useDispatch();
  const toast    = useSelector(selectToast);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => dispatch(clearToast()), TOAST_DURATION);
    return () => clearTimeout(timer);
  }, [toast, dispatch]);

  if (!toast) return null;

  const styles = TOAST_STYLES[toast.type] || TOAST_STYLES.info;
  const { Icon } = styles;

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 10000,
        animation: 'slideInRight 0.3s ease forwards',
        maxWidth: 380,
        minWidth: 280,
      }}
    >
      <div style={{
        background: '#ffffff',
        backdropFilter: 'blur(16px)',
        border: `1px solid #e8e8e8`,
        borderLeft: `3px solid #000000`,
        borderRadius: 'var(--radius-md)',
        padding: '0.9rem 1.2rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}>
        <Icon size={18} color={styles.iconColor} strokeWidth={2} style={{ flexShrink: 0 }} />
        <p style={{
          color: 'var(--text-primary)',
          fontSize: '0.875rem',
          fontWeight: 500,
          lineHeight: 1.5,
          flex: 1,
        }}>
          {toast.message}
        </p>
        <button
          onClick={() => dispatch(clearToast())}
          aria-label="Dismiss notification"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '2px 4px',
            flexShrink: 0,
            borderRadius: 4,
            display: 'flex', alignItems: 'center',
            transition: 'color var(--transition-fast)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <X size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
