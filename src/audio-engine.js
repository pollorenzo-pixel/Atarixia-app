import { callBridge } from './bridge.js';

export function formatTimeDisplay(seconds) { return callBridge('formatTimeDisplay', [seconds], '0:00'); }
export function getCurrentVolume() { return callBridge('getCurrentVolume', [], 0.7); }
export function setAudioStatus(text, isPlaying = false) { return callBridge('setAudioStatus', [text, isPlaying]); }
export function updateSeekUI() { return callBridge('updateSeekUI'); }
export function seekToPercent(percent) { return callBridge('seekToPercent', [percent]); }
export function detachAudio() { return callBridge('detachAudio'); }
export function preloadNextTrack() { return callBridge('preloadNextTrack'); }
export function loadTrack(index) { return callBridge('loadTrack', [index]); }
export function initAudio() { return callBridge('initAudio'); }
export function startPlayback() { return callBridge('startPlayback'); }
export function pausePlayback() { return callBridge('pausePlayback'); }
export function advanceToNextTrackIfNeeded(force = false) { return callBridge('advanceToNextTrackIfNeeded', [force]); }
export function maybeRecoverAudioState() { return callBridge('maybeRecoverAudioState'); }
export function handleTrackEnd() { return callBridge('handleTrackEnd'); }
export function setVolume(value) { return callBridge('setVolume', [value]); }
export function preloadMeditationAudio() { return callBridge('preloadMeditationAudio'); }
