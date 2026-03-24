import { callBridge } from './bridge.js';

export const getModeConfig = (...a) => callBridge('getModeConfig', a);
export const getSubcategoryData = (...a) => callBridge('getSubcategoryData', a);
export const currentViewData = (...a) => callBridge('currentViewData', a);
export const updateMenuState = (...a) => callBridge('updateMenuState', a);
export const hideLessonOverlayImmediate = (...a) => callBridge('hideLessonOverlayImmediate', a);
export const maybeShowLessonOverlay = (...a) => callBridge('maybeShowLessonOverlay', a);
export const updateContentUI = (...a) => callBridge('updateContentUI', a);
export const updateAudioStatus = (...a) => callBridge('updateAudioStatus', a);
export const updateJourneyButtons = (...a) => callBridge('updateJourneyButtons', a);
export const renderFoundationHomeCards = (...a) => callBridge('renderFoundationHomeCards', a);
export const renderStabilityHomeCards = (...a) => callBridge('renderStabilityHomeCards', a);
export const refreshCurrentMode = (...a) => callBridge('refreshCurrentMode', a);
export const syncUI = (...a) => callBridge('syncUI', a);
export const bootstrapApp = (...a) => callBridge('bootstrapApp', a);
