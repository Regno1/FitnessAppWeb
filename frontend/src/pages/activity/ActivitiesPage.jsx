// src/pages/activity/ActivitiesPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useActivities } from '../../hooks/useActivities';
import ActivityList from '../../components/activity/ActivityList';
import { ACTIVITY_TYPES } from '../../utils/constants';
import { formatActivityType } from '../../utils/activityUtils';

const ActivitiesPage = () => {
  const navigate = useNavigate();
  const { activities, isLoading, isError, error, refetch } = useActivities();
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filtered = activities.filter((a) => {
    const matchType = filter === 'ALL' || a.type === filter;
    const matchSearch = !search || formatActivityType(a.type).toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem', animation: 'fadeIn 0.4s ease' }}>
          <div className="section-header">
            <div>
              <h1 className="page-title">Activities</h1>
              <p className="page-subtitle">
                {activities.length > 0
                  ? `${activities.length} workout${activities.length === 1 ? '' : 's'} tracked`
                  : 'Start tracking your workouts'}
              </p>
            </div>
            <button
              id="log-activity-btn"
              onClick={() => navigate('/activities/log')}
              style={{
                padding: '0.65rem 1.4rem',
                background: 'var(--gradient-primary)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                color: '#fff',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(124,58,237,0.35)',
                transition: 'all var(--transition-fast)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}
            >
              ➕ Log Activity
            </button>
          </div>

          {/* Filters */}
          {!isLoading && !isError && activities.length > 0 && (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
              {/* Search */}
              <input
                type="text"
                placeholder="🔍 Search activities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  padding: '0.55rem 1rem',
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  width: 200,
                }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--accent-primary)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; }}
              />

              {/* Type filter pills */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {['ALL', ...ACTIVITY_TYPES].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    style={{
                      padding: '0.35rem 0.85rem',
                      borderRadius: 'var(--radius-full)',
                      background: filter === type ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.04)',
                      border: filter === type ? '1px solid rgba(124,58,237,0.4)' : '1px solid var(--border-subtle)',
                      color: filter === type ? 'var(--accent-primary-light)' : 'var(--text-muted)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    {type === 'ALL' ? 'All' : formatActivityType(type)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Activity List */}
        <ActivityList
          activities={filtered}
          isLoading={isLoading}
          isError={isError}
          error={error}
          onRetry={refetch}
        />

        {/* No results from filter */}
        {!isLoading && !isError && activities.length > 0 && filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <p className="empty-state-title">No matching activities</p>
            <p className="empty-state-desc">Try a different filter or search term.</p>
            <button
              onClick={() => { setFilter('ALL'); setSearch(''); }}
              style={{
                marginTop: '0.5rem',
                background: 'none',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--accent-primary-light)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 600,
                padding: '0.5rem 1.25rem',
                cursor: 'pointer',
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitiesPage;
