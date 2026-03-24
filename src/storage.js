export function loadProgress() { return window.__ataraxia?.loadProgress?.() ?? {}; }
export function savePracticeComplete(key) { return window.__ataraxia?.savePracticeComplete?.(key); }
export function saveReflectionEntry(reflection) { return window.__ataraxia?.saveReflectionEntry?.(reflection); }
export function loadSessionHistory() { return window.__ataraxia?.loadSessionHistory?.() ?? []; }
export function saveSessionHistory(history) { return window.__ataraxia?.saveSessionHistory?.(history); }
export function recordCompletedSession(reflection) { return window.__ataraxia?.recordCompletedSession?.(reflection); }
