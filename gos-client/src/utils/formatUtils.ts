// src/utils/formatUtils.ts

/**
 * Converts a Unix timestamp (seconds) to a relative time string (e.g., "2 hours ago").
 */
export const formatRelativeTime = (unixSeconds: number): string => {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - unixSeconds;

  if (diff < 60) return 'Just now';

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;

  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? 's' : ''} ago`;
};

export const formatTime = (unixSeconds: number): string => {
  return new Date(unixSeconds * 1000).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

/**
 * Converts Seconds -> MM:SS or HH:MM:SS (Handles negative time for Dota pre-game)
 */
export const formatDuration = (seconds: number): string => {
  const isNegative = seconds < 0;
  const absSeconds = Math.abs(seconds);

  const h = Math.floor(absSeconds / 3600);
  const m = Math.floor((absSeconds % 3600) / 60);
  const s = Math.floor(absSeconds % 60);

  let result = '';
  if (h > 0) {
    result = `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  } else {
    result = `${m}:${s.toString().padStart(2, '0')}`;
  }

  return isNegative ? `-${result}` : result;
};

export const formatTimeRange = (startSeconds: number, endSeconds: number): string => {
  return `${formatDuration(startSeconds)} - ${formatDuration(endSeconds)}`;
};

export const formatDateFull = (unixSeconds : number) : string => {
  return new Date(unixSeconds * 1000).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export const formatDateLong = (unixSeconds: number): string => {
  const date = new Date(unixSeconds * 1000);
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

export const formatDateShort = (unixSeconds: number): string => {
  const date = new Date(unixSeconds * 1000);
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
  }).format(date);
};
