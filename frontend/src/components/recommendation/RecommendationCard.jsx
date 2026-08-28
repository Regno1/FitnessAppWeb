// src/components/recommendation/RecommendationCard.jsx
import React, { useState } from 'react';
import { formatDate } from '../../utils/dateUtils';
import { formatActivityType, getActivityIcon } from '../../utils/activityUtils';
import { TrendingUp, ShieldCheck, CalendarDays, Bot, ChevronDown, ChevronUp } from 'lucide-react';

const CATEGORY_STYLES = {
  RECOVERY:    { bg: '#f7f7f7', border: '#e8e8e8', Icon: ShieldCheck },
  IMPROVEMENT: { bg: '#f7f7f7', border: '#e8e8e8', Icon: TrendingUp },
  NUTRITION:   { bg: '#f7f7f7', border: '#e8e8e8', Icon: CalendarDays },
  SAFETY:      { bg: '#f7f7f7', border: '#e8e8e8', Icon: ShieldCheck },
  GENERAL:     { bg: '#f7f7f7', border: '#e8e8e8', Icon: Bot },
};

const RecommendationCard = ({ recommendation }) => {
  const [expanded, setExpanded] = useState(false);

  const {
    activityType,
    recommendation: text,
    improvements,
    safetyGuidelines,
    createdAt,
    weeklyPlan,
  } = recommendation || {};

  const catKey   = recommendation?.category || 'GENERAL';
  const catStyle = CATEGORY_STYLES[catKey] || CATEGORY_STYLES.GENERAL;
  const { Icon: CatIcon } = catStyle;

  // Normalize text from the AI backend 'analysis' object
  const mainText = recommendation?.analysis?.overall || (typeof text === 'string' ? text : text?.recommendation || '');

  // Format objects into strings to prevent React 'Objects are not valid as a React child' errors
  const formattedImprovements = Array.isArray(improvements)
    ? improvements.map(i => typeof i === 'object' ? `${i.area}: ${i.recommendation}` : i)
    : improvements;

  const displaySafety = recommendation?.safety || safetyGuidelines;

  const rawSuggestions = recommendation?.suggestions || recommendation?.suggestion || weeklyPlan;
  const formattedSuggestions = Array.isArray(rawSuggestions)
    ? rawSuggestions.map(s => typeof s === 'object' ? `${s.workout}: ${s.description}` : s)
    : rawSuggestions;

  const ActivityIconComp = getActivityIcon(activityType);

  return (
    <div className="glass-card" style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: '#000000',
        borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 42, height: 42,
            borderRadius: 'var(--radius-md)',
            background: catStyle.bg,
            border: `1px solid ${catStyle.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <CatIcon size={20} color="#000000" strokeWidth={1.75} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {activityType && (
                <span style={{
                  background: '#f7f7f7',
                  border: '1px solid #e8e8e8',
                  borderRadius: 'var(--radius-full)',
                  padding: '2px 8px',
                  fontSize: '0.72rem',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                }}>
                  {ActivityIconComp && <ActivityIconComp size={11} color="#555" strokeWidth={2} />}
                  {formatActivityType(activityType)}
                </span>
              )}
              <span style={{
                background: '#f7f7f7',
                border: '1px solid #e8e8e8',
                color: '#000000',
                borderRadius: 'var(--radius-full)',
                padding: '2px 8px',
                fontSize: '0.72rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                display: 'inline-flex', alignItems: 'center', gap: '4px',
              }}>
                <Bot size={10} strokeWidth={2} /> AI Insight
              </span>
            </div>
            {createdAt && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 3 }}>
                {formatDate(createdAt)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main recommendation text */}
      {mainText && (
        <p style={{
          color: 'var(--text-primary)',
          fontSize: '0.9rem',
          lineHeight: 1.7,
          marginBottom: formattedImprovements || displaySafety || formattedSuggestions ? '1rem' : 0,
        }}>
          {mainText}
        </p>
      )}

      {/* Expandable sections */}
      {(formattedImprovements || displaySafety || formattedSuggestions) && (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: '#f7f7f7',
              border: '1px solid #e8e8e8',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '0.45rem 0.85rem',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              transition: 'all var(--transition-fast)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#000000'; e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#f7f7f7'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            {expanded ? <ChevronUp size={13} strokeWidth={2} /> : <ChevronDown size={13} strokeWidth={2} />}
            {expanded ? 'Show less' : 'View full insights'}
          </button>

          {expanded && (
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', animation: 'fadeIn 0.25s ease' }}>
              {formattedImprovements && renderSection('Improvements', <TrendingUp size={13} strokeWidth={2} />, formattedImprovements)}
              {displaySafety && renderSection('Safety Guidelines', <ShieldCheck size={13} strokeWidth={2} />, displaySafety)}
              {formattedSuggestions && renderSection('Weekly Plan', <CalendarDays size={13} strokeWidth={2} />, formattedSuggestions)}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const renderSection = (title, IconEl, content) => (
  <div style={{
    background: '#f7f7f7',
    border: '1px solid #e8e8e8',
    borderRadius: 'var(--radius-md)',
    padding: '0.9rem',
  }}>
    <div style={{
      fontWeight: 600, fontSize: '0.82rem', color: '#000000',
      marginBottom: '0.5rem',
      display: 'flex', alignItems: 'center', gap: '0.4rem',
    }}>
      {IconEl} {title}
    </div>
    {Array.isArray(content) ? (
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        {content.map((item, i) => (
          <li key={i} style={{ color: 'var(--text-primary)', fontSize: '0.85rem', display: 'flex', gap: '0.5rem' }}>
            <span style={{ color: '#000000', flexShrink: 0, fontWeight: 700 }}>•</span>
            {item}
          </li>
        ))}
      </ul>
    ) : (
      <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: 1.6 }}>{String(content)}</p>
    )}
  </div>
);

export default RecommendationCard;
