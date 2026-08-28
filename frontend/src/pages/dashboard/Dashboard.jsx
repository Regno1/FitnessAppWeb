// src/pages/dashboard/DAshboard.jsx
import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/authslice';
import { useActivities } from '../../hooks/useActivities';
import ActivityCard from '../../components/activity/ActivityCard';
import Loader from '../../components/common/Loader';
import { totalCalories, totalDuration } from '../../utils/activityUtils';
import { formatDuration } from '../../utils/dateUtils';
import { Dumbbell, Flame, Clock, Calendar, PlusCircle, LayoutList, Sparkles, Dumbbell as GymIcon } from 'lucide-react';

const StatCard = ({ Icon, value, label, suffix = '' }) => (
  <div className="glass-card" style={{ padding: '1.4rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <div style={{
      width: 52, height: 52, borderRadius: 'var(--radius-md)',
      background: '#f7f7f7', border: '1px solid #e8e8e8',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      {Icon && <Icon size={22} color="#000000" strokeWidth={1.75} />}
    </div>
    <div>
      <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#000000', lineHeight: 1 }}>
        {value}<span style={{ fontSize: '1rem', fontWeight: 600 }}>{suffix}</span>
      </div>
      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 4 }}>
        {label}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { activities, isLoading } = useActivities();

  const firstName = user?.firstName || user?.email?.split('@')[0] || 'Athlete';
  const recentActs = [...activities].slice(0, 6);
  const totalCal = totalCalories(activities);
  const totalMin = totalDuration(activities);

  const streak = (() => {
    if (!activities.length) return 0;
    const sorted = [...activities].sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
    let count = 1;
    let prevDate = new Date(sorted[0].startTime);
    prevDate.setHours(0, 0, 0, 0);
    for (let i = 1; i < sorted.length; i++) {
      const d = new Date(sorted[i].startTime);
      d.setHours(0, 0, 0, 0);
      const diff = (prevDate - d) / 86400000;
      if (diff <= 1) { if (diff === 1) count++; prevDate = d; }
      else break;
    }
    return count;
  })();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const quickActions = [
    { label: 'Log Activity', to: '/activities/log', primary: true,  Icon: PlusCircle },
    { label: 'All Activities', to: '/activities',   primary: false, Icon: LayoutList },
    { label: 'AI Insights',   to: '/recommendations', primary: false, Icon: Sparkles },
  ];

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Greeting */}
        <div style={{ marginBottom: '2rem', animation: 'fadeIn 0.5s ease' }}>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '0.4rem',
            color: 'var(--text-primary)',
          }}>
            {greeting}, <span className="gradient-text">{firstName}</span>
          </h1>
          <p className="page-subtitle">Here's your fitness overview</p>
        </div>

        {isLoading ? (
          <Loader message="Loading your stats..." />
        ) : (
          <>
            {/* Stats */}
            <div className="grid-stats stagger-children" style={{ marginBottom: '2rem' }}>
              <StatCard Icon={Dumbbell}  value={activities.length}          label="Total Activities" />
              <StatCard Icon={Flame}     value={totalCal.toLocaleString()}  label="Calories Burned"   suffix=" kcal" />
              <StatCard Icon={Clock}     value={formatDuration(totalMin)}   label="Total Active Time" />
              <StatCard Icon={Calendar}  value={streak}                     label="Day Streak" suffix={streak === 1 ? ' day' : ' days'} />
            </div>

            {/* Quick Actions */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                Quick Actions
              </h2>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {quickActions.map(({ label, to, primary, Icon }) => (
                  <button key={to} onClick={() => navigate(to)} style={{
                    padding: '0.6rem 1.25rem',
                    background: primary ? '#000000' : '#ffffff',
                    border: primary ? 'none' : '1px solid #e8e8e8',
                    borderRadius: 'var(--radius-md)',
                    color: primary ? '#fff' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 600,
                    cursor: 'pointer', transition: 'all var(--transition-fast)',
                    boxShadow: primary ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.filter = 'brightness(1.1)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)'; }}
                  >
                    <Icon size={15} strokeWidth={2} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent activities */}
            <div>
              <div className="section-header">
                <div>
                  <h2 className="section-title">Recent Activities</h2>
                  <p className="section-subtitle">Your last {Math.min(recentActs.length, 6)} workouts</p>
                </div>
                {activities.length > 6 && (
                  <button onClick={() => navigate('/activities')} style={{
                    background: 'none', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)',
                    color: '#000000', fontFamily: 'var(--font-sans)', fontSize: '0.8rem',
                    fontWeight: 600, padding: '0.4rem 0.9rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                  }}>View All</button>
                )}
              </div>

              {recentActs.length === 0 ? (
                <div className="glass-card-static empty-state">
                  <div className="empty-state-icon">
                    <GymIcon size={48} color="#c8c8c8" strokeWidth={1.5} />
                  </div>
                  <h3 className="empty-state-title">No activities yet</h3>
                  <p className="empty-state-desc">Log your first workout to start tracking!</p>
                  <button onClick={() => navigate('/activities/log')} style={{
                    marginTop: '0.5rem', padding: '0.65rem 1.5rem',
                    background: '#000000', border: 'none', borderRadius: 'var(--radius-md)',
                    color: '#fff', fontFamily: 'var(--font-sans)', fontWeight: 600, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                  }}>
                    <PlusCircle size={15} strokeWidth={2} /> Log First Activity
                  </button>
                </div>
              ) : (
                <div className="grid-auto stagger-children">
                  {recentActs.map((a) => <ActivityCard key={a.id} activity={a} />)}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;