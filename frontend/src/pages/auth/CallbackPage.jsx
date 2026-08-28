// src/pages/auth/CallbackPage.jsx
// This page is a fallback redirect — JWT auth is handled directly
// in LoginPage/RegisterPage via the useAuth hook. No OAuth2 callback needed.
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../store/authslice';
import Loader from '../../components/common/Loader';

const CallbackPage = () => {
  const navigate   = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    // If already authenticated redirect to dashboard, otherwise to login
    const timer = setTimeout(() => {
      navigate(isLoggedIn ? '/dashboard' : '/login', { replace: true });
    }, 800);
    return () => clearTimeout(timer);
  }, [isLoggedIn, navigate]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Loader message="Redirecting..." />
      </div>
    </div>
  );
};

export default CallbackPage;