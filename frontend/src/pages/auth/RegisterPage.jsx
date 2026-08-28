// src/pages/auth/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../store/authslice';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { handleRegister } = useAuth();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) return <Navigate to="/dashboard" replace />;

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'Email is required';
    if (!form.password) errs.password = 'Password is required';
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await handleRegister(form.email, form.password, form.firstName, form.lastName);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (fieldName) => ({
    width: '100%', padding: '0.8rem 1rem',
    background: errors[fieldName] ? 'rgba(239,68,68,0.05)' : 'rgba(255,255,255,0.05)',
    border: `1px solid ${errors[fieldName] ? 'rgba(239,68,68,0.5)' : 'var(--border-light)'}`,
    borderRadius: 'var(--radius-md)', color: 'var(--text-primary)',
    fontFamily: 'var(--font-sans)', fontSize: '0.95rem',
    outline: 'none', transition: 'all 150ms ease', boxSizing: 'border-box',
  });

  const focusStyle = (e) => { e.target.style.borderColor = 'var(--accent-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.15)'; };
  const blurStyle = (e, fieldName) => { e.target.style.borderColor = errors[fieldName] ? 'rgba(239,68,68,0.5)' : 'var(--border-light)'; e.target.style.boxShadow = 'none'; };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '2rem', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'fixed', top: '5%', right: '10%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', animation: 'float 7s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '10%', left: '8%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', animation: 'float 9s ease-in-out infinite reverse', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 480, animation: 'fadeInScale 0.5s ease forwards' }}>
        <div style={{
          background: 'rgba(18, 18, 26, 0.85)', backdropFilter: 'blur(24px)',
          border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xl)',
          padding: '2.5rem 2.25rem',
          boxShadow: 'var(--shadow-xl), 0 0 60px rgba(124,58,237,0.1)',
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 'var(--radius-lg)',
              background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', margin: '0 auto 0.85rem',
              boxShadow: '0 0 28px rgba(124,58,237,0.4)',
            }}>🏋️</div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.3rem' }}>
              Start your journey on{' '}
              <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>FitTrack</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Create your free account</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} noValidate>
            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
                borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem',
                color: '#fca5a5', fontSize: '0.875rem',
              }}>⚠️ {error}</div>
            )}

            {/* Name row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-firstname">First Name</label>
                <input id="reg-firstname" name="firstName" type="text" autoComplete="given-name"
                  value={form.firstName} onChange={handleChange} placeholder="John"
                  style={inputStyle('firstName')}
                  onFocus={focusStyle} onBlur={(e) => blurStyle(e, 'firstName')} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-lastname">Last Name</label>
                <input id="reg-lastname" name="lastName" type="text" autoComplete="family-name"
                  value={form.lastName} onChange={handleChange} placeholder="Doe"
                  style={inputStyle('lastName')}
                  onFocus={focusStyle} onBlur={(e) => blurStyle(e, 'lastName')} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">Email address *</label>
              <input id="reg-email" name="email" type="email" autoComplete="email"
                value={form.email} onChange={handleChange} placeholder="you@example.com" required
                style={inputStyle('email')}
                onFocus={focusStyle} onBlur={(e) => blurStyle(e, 'email')} />
              {errors.email && <span className="form-error">⚠ {errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-password">Password *</label>
              <input id="reg-password" name="password" type="password" autoComplete="new-password"
                value={form.password} onChange={handleChange} placeholder="Min. 6 characters" required
                style={inputStyle('password')}
                onFocus={focusStyle} onBlur={(e) => blurStyle(e, 'password')} />
              {errors.password && <span className="form-error">⚠ {errors.password}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-confirm">Confirm Password *</label>
              <input id="reg-confirm" name="confirmPassword" type="password" autoComplete="new-password"
                value={form.confirmPassword} onChange={handleChange} placeholder="Repeat password" required
                style={inputStyle('confirmPassword')}
                onFocus={focusStyle} onBlur={(e) => blurStyle(e, 'confirmPassword')} />
              {errors.confirmPassword && <span className="form-error">⚠ {errors.confirmPassword}</span>}
            </div>

            <button
              id="register-submit-btn"
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '0.875rem',
                background: 'var(--gradient-primary)', border: 'none',
                borderRadius: 'var(--radius-md)', color: '#fff',
                fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700,
                cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1,
                boxShadow: '0 4px 24px rgba(124,58,237,0.4)', transition: 'all var(--transition-fast)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                marginTop: '0.25rem',
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.filter = 'brightness(1.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; }}
            >
              {loading ? (
                <>
                  <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                  Creating account...
                </>
              ) : '🚀 Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '1.5rem' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--accent-primary-light)', fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
