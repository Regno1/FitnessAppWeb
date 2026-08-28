// src/pages/activity/LogActivityPage.jsx
import React from 'react';
import { useNavigate } from 'react-router';
import ActivityForm from '../../components/activity/ActivityForm';

const LogActivityPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth: 640 }}>
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            marginBottom: '1.5rem',
            padding: 0,
            transition: 'color var(--transition-fast)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          ← Back
        </button>

        {/* Card */}
        <div
          className="glass-card-static animate-fade-in"
          style={{ padding: '2.5rem 2rem' }}
        >
          {/* Header */}
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <div style={{
              width: 56, height: 56,
              borderRadius: 'var(--radius-md)',
              background: 'var(--gradient-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem',
              margin: '0 auto 1rem',
              boxShadow: '0 0 24px rgba(124,58,237,0.4)',
            }}>
              🏃
            </div>
            <h1 className="page-title" style={{ fontSize: '1.6rem' }}>Log Activity</h1>
            <p className="page-subtitle">Record your workout and get AI-powered insights</p>
          </div>

          {/* Info banner */}
          <div style={{
            background: 'rgba(124,58,237,0.08)',
            border: '1px solid var(--border-accent)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginBottom: '1.75rem',
          }}>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.5 }}>
              After logging, our AI will analyze your workout and generate personalized recommendations.
            </p>
          </div>

          <ActivityForm />
        </div>
      </div>
    </div>
  );
};

export default LogActivityPage;