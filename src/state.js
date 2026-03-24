import { SESSION_STATE } from './config.js';

export const state = {
  activePractice: 'Welcome',
  appBooted: false,
  activeSubcategory: 'BreathAwareness',
  foundationMenuOpen: false,
  stabilityMenuOpen: false,
  currentPlaylist: [],
  currentTrackIndex: 0,
  currentAudio: null,
  sessionState: SESSION_STATE.IDLE,
  singleTapTimeout: null,
  groundingTimeout: null,
  transitionTimeout: null,
  pendingTrackAdvance: false,
  lessonOverlayTimeout: null,
  lessonOverlayExitTimeout: null,
  shownLessonKey: '',
  wakeLockHandle: null,
  welcomeIntroTickRaf: null,
  welcomeIntroTextTrack: null,
  welcomeReactiveRaf: null,
  welcomeParticlesRaf: null,
  welcomeAudioCtx: null,
  welcomeAudioAnalyser: null,
  welcomeAudioSource: null,
  welcomeAudioData: null
};
