// src/components/activity/ActivityList.jsx
import React from 'react';
import ActivityCard from './ActivityCard';
import Loader from '../common/Loader';
import Button from '../common/Button';
import { useNavigate } from 'react-router';

const ActivityList = ({ activities = [], isLoading = false, isError = false, error = null, onRetry }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader message="Loading your activities..." />;
  }

  if (isError) {
    return (
      <div style={{
        background: 'rgba(239,68,68,0.07)',
        border: '1px solid rgba(239,68,68,0.2)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>⚠️</div>
        <p style={{ color: '#fca5a5', fontWeight: 600, marginBottom: '0.5rem' }}>Failed to load activities</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
          {error || 'An unexpected error occurred.'}
        </p>
        {onRetry && <Button variant="ghost" size="sm" onClick={onRetry}>Try Again</Button>}
      </div>
    );
  }

  if (!activities.length) {
    return (
      <div className="glass-card-static empty-state">
        <div className="empty-state-icon">🏃</div>
        <h3 className="empty-state-title">No activities yet</h3>
        <p className="empty-state-desc">
          Start tracking your workouts to see them here and get AI-powered insights.
        </p>
        <Button
          variant="primary"
          onClick={() => navigate('/activities/log')}
          style={{ marginTop: '0.5rem' }}
        >
          ➕ Log Your First Activity
        </Button>
      </div>
    );
  }

  return (
    <div className="grid-auto stagger-children">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

export default ActivityList;
