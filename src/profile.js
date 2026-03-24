import { callBridge } from './bridge.js';

export function formatHistoryDate(iso) { return callBridge('formatHistoryDate', [iso], ''); }
export function formatPracticeLabel(key) { return callBridge('formatPracticeLabel', [key], ''); }
export function renderProfilePage() { return callBridge('renderProfilePage'); }
export function updateInsightCard() { return callBridge('updateInsightCard'); }
