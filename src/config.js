export const INTRODUCTION_AUDIO = 'audio/introduction audio 2.mp3';
export const FOUNDATION_BREATH_AWARENESS_AUDIO = ['audio/Breath only meditation foundation meditation.mp3', 'audio/ending audio foundation.mp3'];
export const FOUNDATION_BODY_AWARENESS_AUDIO = ['audio/body awareness meditation.mp3', 'audio/body awareness ending audio.mp3'];
export const FOUNDATION_THOUGHT_AWARENESS_AUDIO = ['audio/Thought awareness meditation.mp3', 'audio/thought awareness ending audio.mp3'];
export const FOUNDATION_EMOTIONAL_AWARENESS_AUDIO = ['audio/Emotional Awareness meditations.mp3', 'audio/emotional awareness ending audio.mp3'];
export const FOUNDATION_DEEP_FOCUS_AUDIO = ['audio/deep focus meditation.mp3', 'audio/deep focus ending audio.mp3'];
export const STABILITY_OPEN_AWARENESS_AUDIO = 'audio/open awareness meditation.mp3';
export const STABILITY_SENSORY_AWARENESS_AUDIO = 'audio/sensory awareness meditation.mp3';

export const WELCOME_AUDIO = 'audio/Brittney welcome audio.mp3';
export const DEFAULT_WELCOME_CAPTION = 'Hey… welcome to Ataraxia.';
export const DEFAULT_WELCOME_STATE = 'Settle';
export const DEFAULT_WELCOME_LABEL = 'Welcome Audio';
export const WELCOME_SCRIPT_CUES = [
  { start: 0.00, end: 2.95, text: 'Hey… welcome to Ataraxia.' },
  { start: 3.00, end: 5.28, text: 'Before we begin, just a quick note.' },
  { start: 5.32, end: 15.12, text: 'This app is designed to help you train your mind… to build focus, awareness, and a calmer, more steady state. Think of it like going to the gym… but for your attention.' },
  { start: 16.40, end: 31.18, text: 'Now, while these practices are based on well-known techniques in mindfulness and mental training… this isn’t a replacement for professional medical or psychological care. If you ever feel like you need extra support, it’s always a good idea to reach out to a qualified professional.' },
  { start: 31.90, end: 42.50, text: 'Also, some sessions involve closing your eyes or going into deeper focus. So just make sure you’re in a safe place… and definitely not driving or doing anything that needs your full attention.' },
  { start: 43.55, end: 50.82, text: 'And remember… you’re always in control. If something doesn’t feel right, you can pause, adjust, or stop at any time.' },
  { start: 51.82, end: 56.05, text: 'Take what works for you… leave what doesn’t… and move at your own pace.' },
  { start: 56.90, end: 58.67, text: 'Alright… let’s begin.' }
];

export const STORAGE_KEY = 'ataraxia_practice_progress_v4';
export const REFLECTION_STORAGE_KEY = 'ataraxia_reflections_v1';
export const SESSION_HISTORY_STORAGE_KEY = 'ataraxia_session_history_v1';
export const TRANSITION_DELAY = 2000;
export const foundationOrder = ['BreathAwareness', 'BodyAwareness', 'ThoughtAwareness', 'EmotionalAwareness', 'DeepFocus'];
export const stabilityOrder = ['OpenAwareness', 'SensoryAwareness'];
export const APP_BOOT_DELAY = 1800;

export const SESSION_STATE = {
  IDLE: 'idle',
  GROUNDING: 'grounding',
  PLAYING: 'playing',
  PAUSED: 'paused',
  ENDING: 'ending',
  COMPLETE: 'complete'
};

export const quotes = [
  { text: 'The obstacle is the way.', author: 'Marcus Aurelius' },
  { text: 'He who conquers himself is the mightiest warrior.', author: 'Confucius' },
  { text: 'Calmness is the cradle of power.', author: 'Josiah Gilbert Holland' },
  { text: 'Return again. That is the training.', author: 'Unknown' }
];

export function resolveAssetPath(path) {
  if (!path) return '';
  try {
    return new URL(path, document.baseURI).href;
  } catch (error) {
    console.warn('Unable to resolve audio path.', error);
    return path;
  }
}
