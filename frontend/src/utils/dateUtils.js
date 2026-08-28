// src/utils/dateUtils.js

/**
 * Format an ISO date string to a readable date.
 * e.g. "2024-01-15T10:30:00Z" → "Jan 15, 2024"
 */
export const formatDate = (isoString) => {
  if (!isoString) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  }).format(new Date(isoString));
};

/**
 * Format an ISO date string to a date + time.
 * e.g. "Jan 15, 2024, 10:30 AM"
 */
export const formatDateTime = (isoString) => {
  if (!isoString) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  }).format(new Date(isoString));
};

/**
 * Return a human-readable relative time string.
 * e.g. "2 days ago", "3 hours ago", "just now"
 */
export const timeAgo = (isoString) => {
  if (!isoString) return '';
  const seconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (seconds < 60)   return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return formatDate(isoString);
};

/**
 * Format minutes to "Xh Ym" or "Xm".
 * e.g. 90 → "1h 30m", 45 → "45m"
 */
export const formatDuration = (minutes) => {
  if (!minutes && minutes !== 0) return '—';
  const m = Math.round(Number(minutes));
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return rem ? `${h}h ${rem}m` : `${h}h`;
};
