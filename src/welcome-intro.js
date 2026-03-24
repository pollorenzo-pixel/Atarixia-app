import { callBridge } from './bridge.js';

export const openWelcomeIntroOverlay = (...a) => callBridge('openWelcomeIntroOverlay', a);
export const closeWelcomeIntroOverlay = (...a) => callBridge('closeWelcomeIntroOverlay', a);
export const resetWelcomeIntroUI = (...a) => callBridge('resetWelcomeIntroUI', a);
export const ensureWelcomeIntroAudioGraph = (...a) => callBridge('ensureWelcomeIntroAudioGraph', a);
export const stopWelcomeParticles = (...a) => callBridge('stopWelcomeParticles', a);
export const startWelcomeParticles = (...a) => callBridge('startWelcomeParticles', a);
export const stopWelcomeReactiveTicker = (...a) => callBridge('stopWelcomeReactiveTicker', a);
export const startWelcomeReactiveTicker = (...a) => callBridge('startWelcomeReactiveTicker', a);
export const stopWelcomeIntroAudio = (...a) => callBridge('stopWelcomeIntroAudio', a);
export const ensureWelcomeIntroTextTrack = (...a) => callBridge('ensureWelcomeIntroTextTrack', a);
export const renderWelcomeIntroCue = (...a) => callBridge('renderWelcomeIntroCue', a);
export const startWelcomeIntroTicker = (...a) => callBridge('startWelcomeIntroTicker', a);
export const endWelcomeIntro = (...a) => callBridge('endWelcomeIntro', a);
export const skipWelcomeIntro = (...a) => callBridge('skipWelcomeIntro', a);
export const startWelcomeIntro = (...a) => callBridge('startWelcomeIntro', a);
