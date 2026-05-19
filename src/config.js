import { DEFAULT_WELCOME_CAPTION, WELCOME_SCRIPT_CUES } from './welcome-script.js';
export const INTRODUCTION_AUDIO = 'audio/introduction audio 2.mp3';
export const FOUNDATION_BREATH_AWARENESS_AUDIO = ['audio/Breath only meditation foundation meditation.mp3', 'audio/ending audio foundation.mp3'];
export const FOUNDATION_BODY_AWARENESS_AUDIO = ['audio/body awareness meditation.mp3', 'audio/body awareness ending audio.mp3'];
export const FOUNDATION_THOUGHT_AWARENESS_AUDIO = ['audio/Thought awareness meditation.mp3', 'audio/thought awareness ending audio.mp3'];
export const FOUNDATION_EMOTIONAL_AWARENESS_AUDIO = ['audio/Emotional Awareness meditations.mp3', 'audio/emotional awareness ending audio.mp3'];
export const FOUNDATION_DEEP_FOCUS_AUDIO = ['audio/deep focus meditation.mp3', 'audio/deep focus ending audio.mp3'];
export const STABILITY_OPEN_AWARENESS_AUDIO = 'audio/open awareness meditation.mp3';
export const STABILITY_SENSORY_AWARENESS_AUDIO = 'audio/sensory awareness meditation.mp3';

export const WELCOME_AUDIO = 'audio/vexis before you begin audio.mp3';
export const DEFAULT_WELCOME_STATE = 'Settle';
export const DEFAULT_WELCOME_LABEL = 'Welcome Audio';
export { DEFAULT_WELCOME_CAPTION, WELCOME_SCRIPT_CUES };

export const STORAGE_KEY = 'ataraxia_practice_progress_v4';
export const REFLECTION_STORAGE_KEY = 'ataraxia_reflections_v1';
export const SESSION_HISTORY_STORAGE_KEY = 'ataraxia_session_history_v1';
export const TRANSITION_DELAY = 2000;
// Foundation sequence is production-stable; keep keys/order aligned with practiceContent.Foundation.subcategories.
export const foundationOrder = ['BreathAwareness', 'BodyAwareness', 'ThoughtAwareness', 'EmotionalAwareness', 'DeepFocus'];
// Applied Awareness sequence is production-stable; keep keys/order aligned with practiceContent.Stability.subcategories.
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

export const openingQuotes = [
  { text: 'You are not your thoughts. You are the awareness behind them.', author: 'Unknown' },
  { text: 'The obstacle is the way.', author: 'Marcus Aurelius' },
  { text: 'He who conquers himself is the mightiest warrior.', author: 'Confucius' },
  { text: 'Calmness is the cradle of power.', author: 'Josiah Gilbert Holland' },
  { text: 'Return again. That is the training.', author: 'Unknown' },
  { text: 'Between stimulus and response there is a space.', author: 'Viktor E. Frankl' },
  { text: 'The quieter you become, the more you can hear.', author: 'Ram Dass' },
  { text: 'To understand all is to forgive all.', author: 'Buddhist Saying' },
  { text: 'The mind is everything. What you think you become.', author: 'Buddha' },
  { text: 'Peace comes from within. Do not seek it without.', author: 'Buddha' },
  { text: 'Stillness is where clarity begins.', author: 'Unknown' },
  { text: 'Feel the breath. Let the rest settle on its own.', author: 'Unknown' },
  { text: 'You do not have to believe every thought you notice.', author: 'Unknown' },
  { text: 'Steadiness is built one return at a time.', author: 'Unknown' },
  { text: 'Attention is your most valuable currency. Spend it wisely.', author: 'James Clear' },
  { text: 'Wherever you are, be there totally.', author: 'Eckhart Tolle' },
  { text: 'Respond, do not react.', author: 'Unknown' },
  { text: 'Clarity is a consequence of calm, not force.', author: 'Unknown' },
  { text: 'Discipline is choosing what matters over what is loud.', author: 'Unknown' },
  { text: 'You can observe the storm without becoming it.', author: 'Unknown' },
  { text: 'A calm mind is not empty; it is precise.', author: 'Unknown' },
  { text: 'Each moment noticed is a moment reclaimed.', author: 'Unknown' },
  { text: 'Breathe. Notice. Return.', author: 'Unknown' },
  { text: 'Your practice is not to stop thought, but to stop being carried by it.', author: 'Unknown' }
];

export const quotes = openingQuotes;

export function resolveAssetPath(path) {
  if (!path) return '';
  try {
    return new URL(path, document.baseURI).href;
  } catch (error) {
    console.warn('Unable to resolve audio path.', error);
    return path;
  }
}
