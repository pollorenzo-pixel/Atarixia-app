import { callBridge } from './bridge.js';

export function loadProgress() { return callBridge('loadProgress', [], {}); }
export function savePracticeComplete(key) { return callBridge('savePracticeComplete', [key]); }
export function saveReflectionEntry(reflection) { return callBridge('saveReflectionEntry', [reflection]); }
export function loadSessionHistory() { return callBridge('loadSessionHistory', [], []); }
export function saveSessionHistory(history) { return callBridge('saveSessionHistory', [history]); }
export function recordCompletedSession(reflection) { return callBridge('recordCompletedSession', [reflection]); }
