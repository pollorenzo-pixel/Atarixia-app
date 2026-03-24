import { callBridge } from './bridge.js';

export function getTrainingInsights() { return callBridge('getTrainingInsights'); }
export function generateSessionFeedback() { return callBridge('generateSessionFeedback'); }
