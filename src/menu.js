import { callBridge } from './bridge.js';

export const toggleMenu = (...a) => callBridge('toggleMenu', a);
export const closeMenu = (...a) => callBridge('closeMenu', a);
export const selectMainMode = (...a) => callBridge('selectMainMode', a);
export const toggleFoundationMenu = (...a) => callBridge('toggleFoundationMenu', a);
export const setSubcategory = (...a) => callBridge('setSubcategory', a);
export const toggleStabilityMenu = (...a) => callBridge('toggleStabilityMenu', a);
export const setStabilitySubcategory = (...a) => callBridge('setStabilitySubcategory', a);
export const goToFoundationHome = (...a) => callBridge('goToFoundationHome', a);
export const goToNextPractice = (...a) => callBridge('goToNextPractice', a);
