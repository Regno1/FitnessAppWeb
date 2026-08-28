// src/pages/auth/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../store/authslice';
import { Zap, Mail, Lock, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

const IPHONE_BLUE = '#3E5BE8';

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  if (isLoggedIn) return <Navigate to="/dashboard" replace />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      await handleLogin(form.email, form.password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f4f4f4;
          padding: 1.5rem;
          box-sizing: border-box;
        }
        .login-card {
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          border: 1px solid #e8e8e8;
          border-radius: 20px;
          padding: 2.75rem 2.5rem;
          box-shadow: 0 8px 40px rgba(0,0,0,0.08);
          animation: fadeInScale 0.4s ease forwards;
        }
        .login-input-wrap {
          position: relative;
          width: 100%;
        }
        .login-input-icon {
          position: absolute;
          left: 0.9rem;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          display: flex;
          align-items: center;
        }
        .login-input {
          width: 100%;
          padding: 0.85rem 1rem 0.85rem 2.75rem;
          background: #fafafa;
          border: 1.5px solid #e8e8e8;
          border-radius: 10px;
          color: #0a0a0a;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          outline: none;
          transition: border-color 150ms ease, box-shadow 150ms ease, background 150ms ease;
          box-sizing: border-box;
        }
        .login-input:focus {
          border-color: #000000;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(0,0,0,0.06);
        }
        .login-input::placeholder { color: #b0b0b0; }
        .login-btn {
          width: 100%;
          padding: 0.9rem;
          background: #000000;
          border: none;
          border-radius: 10px;
          color: #ffffff;
          font-family: var(--font-sans);
          font-size: 1rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(0,0,0,0.16);
          transition: all 150ms ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          letter-spacing: 0.01em;
          margin-top: 0.5rem;
        }
        .login-btn:hover:not(:disabled) {
          background: #1a1a1a;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.22);
        }
        .login-btn:disabled { opacity: 0.6; cursor: wait; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.7s linear infinite; }
      `}</style>

      <div className="login-root">
        <div className="login-card">

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '2rem' }}>
            <div style={{
              width: 42, height: 42, borderRadius: '11px',
              background: IPHONE_BLUE,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(62,91,232,0.3)',
            }}>
              <Zap size={20} color="#ffffff" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 900, fontSize: '1.35rem', color: IPHONE_BLUE, letterSpacing: '-0.03em' }}>
              FitTrack
            </span>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h1 style={{
              fontSize: '1.75rem', fontWeight: 900,
              color: '#000000', letterSpacing: '-0.03em',
              lineHeight: 1.15, marginBottom: '0.35rem',
            }}>
              Welcome back
            </h1>
            <p style={{ color: '#888888', fontSize: '0.9rem', margin: 0 }}>
              Sign in to your account to continue
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: '#fafafa',
              border: '1px solid #e8e8e8',
              borderLeft: '3px solid #000000',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              color: '#0a0a0a', fontSize: '0.875rem', fontWeight: 500,
            }}>
              <AlertCircle size={15} strokeWidth={2} style={{ flexShrink: 0 }} />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} noValidate>

            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label htmlFor="login-email" style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0a0a0a' }}>
                Email address
              </label>
              <div className="login-input-wrap">
                <span className="login-input-icon">
                  <Mail size={16} color="#aaaaaa" strokeWidth={2} />
                </span>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="login-input"
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label htmlFor="login-password" style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0a0a0a' }}>
                Password
              </label>
              <div className="login-input-wrap">
                <span className="login-input-icon">
                  <Lock size={16} color="#aaaaaa" strokeWidth={2} />
                </span>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="login-input"
                />
              </div>
            </div>

            {/* Submit */}
            <button id="login-submit-btn" type="submit" disabled={loading} className="login-btn">
              {loading ? (
                <>
                  <Loader2 size={16} strokeWidth={2} className="spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={16} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ height: 1, background: '#f0f0f0', margin: '1.5rem 0' }} />

          {/* Register */}
          <p style={{ textAlign: 'center', color: '#888888', fontSize: '0.875rem', margin: 0 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{
              color: '#000000', fontWeight: 800, textDecoration: 'none',
              borderBottom: '2px solid #000000', paddingBottom: '1px',
            }}>
              Create one
            </Link>
          </p>

        </div>
      </div>
    </>
  );
};

export default LoginPage;
