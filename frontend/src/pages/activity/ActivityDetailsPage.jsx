// src/pages/activity/ActivityDetailsPage.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchActivityById,
  selectSelectedActivity,
  selectActivityStatus,
  selectActivityError,
  clearSelectedActivity,
} from '../../store/activitySlice';
import AiAnalysisPanel from '../../components/recommendation/AiAnalysisPanel';
import Loader from '../../components/common/Loader';
import { getActivityIcon, getActivityBadgeClass, formatActivityType } from '../../utils/activityUtils';
import { formatDuration, formatDateTime } from '../../utils/dateUtils';
import { Clock, Flame, FileText, ArrowLeft, AlertTriangle, Calendar } from 'lucide-react';

const MetricCard = ({ label, value, IconEl }) => (
  <div style={{
    background: '#f7f7f7',
    border: '1px solid #e8e8e8',
    borderRadius: 'var(--radius-md)',
    padding: '1.1rem',
    textAlign: 'center',
  }}>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.35rem' }}>
      {IconEl}
    </div>
    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 6 }}>{label}</div>
  </div>
);

const ActivityDetailsPage = () => {
  const { id: activityId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activity = useSelector(selectSelectedActivity);
  const status = useSelector(selectActivityStatus);
  const error = useSelector(selectActivityError);

  useEffect(() => {
    if (activityId) dispatch(fetchActivityById(activityId));
    return () => dispatch(clearSelectedActivity());
  }, [activityId, dispatch]);

  if (status === 'loading') return <div className="page-wrapper"><Loader message="Loading activity..." /></div>;

  if (status === 'failed') {
    return (
      <div className="page-wrapper">
        <div className="container" style={{ maxWidth: 600, textAlign: 'center', paddingTop: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <AlertTriangle size={48} color="#c0c0c0" strokeWidth={1.5} />
          </div>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Activity Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{error}</p>
          <button
            onClick={() => navigate('/activities')}
            style={{
              padding: '0.65rem 1.5rem',
              background: '#000000',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            }}
          >
            <ArrowLeft size={15} strokeWidth={2} /> Back to Activities
          </button>
        </div>
      </div>
    );
  }

  if (!activity) return null;

  const IconComponent = getActivityIcon(activity.type);
  const badge = getActivityBadgeClass(activity.type);
  const label = formatActivityType(activity.type);

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth: 800 }}>
        {/* Back */}
        <button
          onClick={() => navigate('/activities')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: 'none', border: 'none',
            color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)',
            fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
            marginBottom: '1.5rem', padding: 0,
            transition: 'color var(--transition-fast)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <ArrowLeft size={15} strokeWidth={2} /> Activities
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.4s ease' }}>
          {/* Main info card */}
          <div className="glass-card-static" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
              <div style={{
                width: 64, height: 64,
                borderRadius: 'var(--radius-lg)',
                background: '#f7f7f7',
                border: '1px solid #e8e8e8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {/* Render the Lucide component — NOT as a string */}
                {IconComponent && <IconComponent size={28} color="#000000" strokeWidth={1.75} />}
              </div>
              <div>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>{label}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className={`badge ${badge}`} style={{ fontWeight: 700 }}>{label}</span>
                  {activity.startTime && (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} strokeWidth={2} /> {formatDateTime(activity.startTime)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.85rem' }}>
              <MetricCard
                label="Duration"
                value={formatDuration(activity.duration)}
                IconEl={<Clock size={20} color="#000000" strokeWidth={1.75} />}
              />
              <MetricCard
                label="Calories"
                value={activity.caloriesBurned ? `${activity.caloriesBurned.toLocaleString()} kcal` : '—'}
                IconEl={<Flame size={20} color="#000000" strokeWidth={1.75} />}
              />
              {activity.additionalMetrics?.notes && (
                <div style={{
                  gridColumn: '1 / -1',
                  background: '#f7f7f7',
                  border: '1px solid #e8e8e8',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                }}>
                  <div style={{
                    fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase',
                    letterSpacing: '0.06em', marginBottom: '0.5rem',
                    display: 'flex', alignItems: 'center', gap: '4px',
                  }}>
                    <FileText size={12} strokeWidth={2} /> Notes
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {activity.additionalMetrics.notes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* AI Analysis Panel */}
          <AiAnalysisPanel activityId={activityId} />
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailsPage;