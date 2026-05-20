import { SESSION_STATES } from './config.js';

export const SESSION_EVENT_STORAGE_KEY = 'vexis_session_events_v1';
export const MAX_SESSION_EVENT_LOGS = 750;

const SESSION_EVENT_TYPES = Object.freeze(new Set([
  'session_started',
  'session_paused',
  'session_resumed',
  'session_completed',
  'session_exited'
]));

const CANONICAL_SESSION_STATES = Object.freeze(new Set(Object.values(SESSION_STATES)));

function safeReadLogs() {
  try {
    const raw = localStorage.getItem(SESSION_EVENT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function safeWriteLogs(logs) {
  try {
    localStorage.setItem(SESSION_EVENT_STORAGE_KEY, JSON.stringify(logs));
    return true;
  } catch {
    return false;
  }
}

function buildEventId() {
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function logSessionLifecycleEvent({
  practiceId = '',
  pillar = '',
  eventType = '',
  sessionState = '',
  durationElapsed = 0
} = {}) {
  if (!SESSION_EVENT_TYPES.has(eventType)) return false;
  if (!CANONICAL_SESSION_STATES.has(sessionState)) return false;

  const event = {
    id: buildEventId(),
    timestamp: new Date().toISOString(),
    practiceId,
    pillar,
    eventType,
    sessionState,
    durationElapsed: Number.isFinite(durationElapsed) && durationElapsed > 0
      ? Math.round(durationElapsed)
      : 0
  };

  const logs = safeReadLogs();
  logs.push(event);

  if (logs.length > MAX_SESSION_EVENT_LOGS) {
    logs.splice(0, logs.length - MAX_SESSION_EVENT_LOGS);
  }

  return safeWriteLogs(logs);
}

