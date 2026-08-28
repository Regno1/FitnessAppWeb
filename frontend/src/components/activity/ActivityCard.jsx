// src/components/activity/ActivityCard.jsx
import React from 'react';
import { useNavigate } from 'react-router';
import { getActivityIcon, getActivityBadgeClass, formatActivityType } from '../../utils/activityUtils';
import { formatDuration, timeAgo } from '../../utils/dateUtils';
import { ChevronRight } from 'lucide-react';

const ActivityCard = ({ activity }) => {
  const navigate = useNavigate();
  const { id, type, duration, caloriesBurned, startTime } = activity;

  const IconComponent = getActivityIcon(type);
  const badgeClass = getActivityBadgeClass(type);
  const label = formatActivityType(type);

  return (
    <div
      className="glass-card animate-fade-in"
      onClick={() => navigate(`/activities/${id}`)}
      style={{ cursor: 'pointer', padding: '1.4rem', position: 'relative', overflow: 'hidden' }}
      role="button"
      aria-label={`View ${label} activity details`}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/activities/${id}`)}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 46, height: 46,
            borderRadius: 'var(--radius-md)',
            background: '#f7f7f7',
            border: '1px solid #e8e8e8',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            {IconComponent && <IconComponent size={22} color="#000000" strokeWidth={1.75} />}
          </div>
          <div>
            <span className={`badge ${badgeClass}`} style={{ fontWeight: 700 }}>{label}</span>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: 4 }}>
              {timeAgo(startTime)}
            </p>
          </div>
        </div>

        <span style={{
          display: 'flex', alignItems: 'center',
          color: 'var(--text-muted)',
          flexShrink: 0,
        }}>
          <ChevronRight size={16} strokeWidth={2} />
        </span>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div style={{
          background: '#f7f7f7',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1rem',
          border: '1px solid #e8e8e8',
        }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6, fontWeight: 600 }}>
            Duration
          </div>
          <div style={{ fontWeight: 800, fontSize: '1.35rem', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            {formatDuration(duration)}
          </div>
        </div>

        <div style={{
          background: '#f7f7f7',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1rem',
          border: '1px solid #e8e8e8',
        }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6, fontWeight: 600 }}>
            Calories
          </div>
          <div style={{ fontWeight: 800, fontSize: '1.35rem', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            {caloriesBurned ? `${caloriesBurned.toLocaleString()} kcal` : '—'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
