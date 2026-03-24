export function formatTimeDisplay(seconds) { return window.__ataraxia?.formatTimeDisplay?.(seconds) ?? '0:00'; }
export function getCurrentVolume() { return window.__ataraxia?.getCurrentVolume?.() ?? 0.7; }
export function setAudioStatus(text, isPlaying = false) { return window.__ataraxia?.setAudioStatus?.(text, isPlaying); }
export function updateSeekUI() { return window.__ataraxia?.updateSeekUI?.(); }
export function seekToPercent(percent) { return window.__ataraxia?.seekToPercent?.(percent); }
export function detachAudio() { return window.__ataraxia?.detachAudio?.(); }
export function preloadNextTrack() { return window.__ataraxia?.preloadNextTrack?.(); }
export function loadTrack(index) { return window.__ataraxia?.loadTrack?.(index); }
export function initAudio() { return window.__ataraxia?.initAudio?.(); }
export function startPlayback() { return window.__ataraxia?.startPlayback?.(); }
export function pausePlayback() { return window.__ataraxia?.pausePlayback?.(); }
export function advanceToNextTrackIfNeeded(force = false) { return window.__ataraxia?.advanceToNextTrackIfNeeded?.(force); }
export function maybeRecoverAudioState() { return window.__ataraxia?.maybeRecoverAudioState?.(); }
export function handleTrackEnd() { return window.__ataraxia?.handleTrackEnd?.(); }
export function setVolume(value) { return window.__ataraxia?.setVolume?.(value); }
export function preloadMeditationAudio() { return window.__ataraxia?.preloadMeditationAudio?.(); }
