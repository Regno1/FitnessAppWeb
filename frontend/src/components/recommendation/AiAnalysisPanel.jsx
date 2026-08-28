// src/components/recommendation/AiAnalysisPanel.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchActivityRecommendation,
  selectCurrentRecommendation,
  selectRecommendationStatus,
  clearCurrentRecommendation,
} from '../../store/recommendationSlice';
import Loader from '../common/Loader';
import RecommendationCard from './RecommendationCard';

const AiAnalysisPanel = ({ activityId }) => {
  const dispatch           = useDispatch();
  const recommendation     = useSelector(selectCurrentRecommendation);
  const status             = useSelector(selectRecommendationStatus);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    return () => { dispatch(clearCurrentRecommendation()); };
  }, [dispatch]);

  const handleFetch = () => {
    setRequested(true);
    dispatch(fetchActivityRecommendation(activityId));
  };

  const isLoading = status === 'loading';
  const isError   = status === 'failed';

  return (
    <div style={{
      background: 'var(--gradient-card)',
      border: '1px solid var(--border-accent)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
    }}>
      {/* Panel header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{
          width: 40, height: 40,
          borderRadius: 'var(--radius-md)',
          background: 'var(--gradient-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.2rem',
          boxShadow: '0 0 16px rgba(124,58,237,0.4)',
          animation: !requested ? 'pulse-glow 2s ease-in-out infinite' : 'none',
        }}>
          🤖
        </div>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            AI Analysis
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Personalized insights powered by AI
          </p>
        </div>
      </div>

      {/* States */}
      {!requested && (
        <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            Get personalized AI recommendations based on this activity — recovery tips, improvements, and safety guidelines.
          </p>
          <button
            onClick={handleFetch}
            style={{
              background: 'var(--gradient-primary)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              fontWeight: 600,
              padding: '0.65rem 1.5rem',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(124,58,237,0.35)',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}
          >
            ✨ Generate AI Insights
          </button>
        </div>
      )}

      {requested && isLoading && (
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <Loader message="AI is analyzing your activity..." />
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '0.5rem',
          }}>
            {['Analyzing performance...', 'Generating insights...', 'Personalizing tips...'].map((step, i) => (
              <span key={i} style={{
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                animation: `fadeIn 0.5s ease ${i * 0.8}s both`,
              }}>
                {step}
              </span>
            ))}
          </div>
        </div>
      )}

      {requested && isError && (
        <div style={{
          background: 'rgba(239,68,68,0.07)',
          border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          textAlign: 'center',
        }}>
          <p style={{ color: '#fca5a5', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
            No AI analysis available for this activity yet.
          </p>
          <button
            onClick={handleFetch}
            style={{
              background: 'none',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 'var(--radius-md)',
              color: '#fca5a5',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              fontWeight: 600,
              padding: '0.45rem 1rem',
              cursor: 'pointer',
            }}
          >
            Retry
          </button>
        </div>
      )}

      {requested && !isLoading && !isError && recommendation && (
        <RecommendationCard recommendation={recommendation} />
      )}
    </div>
  );
};

export default AiAnalysisPanel;
