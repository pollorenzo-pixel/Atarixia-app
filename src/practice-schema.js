import {
  FOUNDATION_BREATH_AWARENESS_AUDIO,
  FOUNDATION_BODY_AWARENESS_AUDIO,
  FOUNDATION_THOUGHT_AWARENESS_AUDIO,
  FOUNDATION_EMOTIONAL_AWARENESS_AUDIO,
  FOUNDATION_DEEP_FOCUS_AUDIO,
  STABILITY_OPEN_AWARENESS_AUDIO,
  STABILITY_SENSORY_AWARENESS_AUDIO
} from './config.js';

const FOUNDATION_WALKING_MEDITATION_AUDIO = 'audio/Walking meditation.mp3';
const FOUNDATION_STRESS_RESET_AUDIO = 'audio/Stress reset.mp3';
const FOUNDATION_PRE_SLEEP_AUDIO = 'audio/Pre-sleep.mp3';
const INTUITION_INTRO_AUDIO = 'audio/Intuition_intro.mp3';
const INTUITION_SIGNAL_DETECTION_AUDIO = 'audio/Signal Detection Meditation.mp3';
const INTUITION_SIGNAL_VS_NOISE_AUDIO = 'audio/signal vs noise meditation.mp3';
const INTUITION_GUT_AWARENESS_AUDIO = 'audio/Gut Awareness meditation.mp3';
const INTUITION_READ_THE_ROOM_AUDIO = 'audio/Read The Room meditation.mp3';
const INTUITION_PAUSE_BEFORE_REACTION_AUDIO = 'audio/Pause Before Reacton Meditation.mp3';
const INTUITION_TRUST_THE_SIGNAL_AUDIO = 'audio/Trust the Signal Meditation.mp3';

export const PRACTICE_STATUS = Object.freeze({ COMPLETE: 'complete', COMING_SOON: 'coming_soon' });
const VALID_STATUS = new Set(Object.values(PRACTICE_STATUS));

export const CANONICAL_PRACTICES = Object.freeze([
  { id: 'breath-awareness', key: 'BreathAwareness', title: 'Breath Awareness', category: 'foundation', pillar: 'CoreStability', order: 1, audio: FOUNDATION_BREATH_AWARENESS_AUDIO, status: PRACTICE_STATUS.COMPLETE, durationMinutes: 8, unlock: 'foundation_unlocked' },
  { id: 'body-awareness', key: 'BodyAwareness', title: 'Body Awareness', category: 'foundation', pillar: 'CoreStability', order: 2, audio: FOUNDATION_BODY_AWARENESS_AUDIO, status: PRACTICE_STATUS.COMPLETE, durationMinutes: 10, unlock: 'foundation_unlocked' },
  { id: 'thought-awareness', key: 'ThoughtAwareness', title: 'Thought Awareness', category: 'foundation', pillar: 'CoreStability', order: 3, audio: FOUNDATION_THOUGHT_AWARENESS_AUDIO, status: PRACTICE_STATUS.COMPLETE, durationMinutes: 11, unlock: 'foundation_unlocked' },
  { id: 'emotional-awareness', key: 'EmotionalAwareness', title: 'Emotional Awareness', category: 'foundation', pillar: 'CoreStability', order: 4, audio: FOUNDATION_EMOTIONAL_AWARENESS_AUDIO, status: PRACTICE_STATUS.COMPLETE, durationMinutes: 11, unlock: 'foundation_unlocked' },
  { id: 'deep-focus', key: 'DeepFocus', title: 'Deep Focus', category: 'foundation', pillar: 'CoreStability', order: 5, audio: FOUNDATION_DEEP_FOCUS_AUDIO, status: PRACTICE_STATUS.COMPLETE, durationMinutes: 12, unlock: 'foundation_unlocked' },
  { id: 'sensory-awareness', key: 'SensoryAwareness', title: 'Sensory Awareness', category: 'foundation', pillar: 'AppliedAwareness', order: 6, audio: STABILITY_SENSORY_AWARENESS_AUDIO, status: PRACTICE_STATUS.COMPLETE, durationMinutes: 10, unlock: 'foundation_unlocked' },
  { id: 'walking-meditation', key: 'WalkingMeditation', title: 'Walking Meditation', category: 'foundation', pillar: 'AppliedAwareness', order: 7, audio: FOUNDATION_WALKING_MEDITATION_AUDIO, status: PRACTICE_STATUS.COMPLETE, durationMinutes: 9, unlock: 'foundation_unlocked' },
  { id: 'open-awareness', key: 'OpenAwareness', title: 'Open Awareness', category: 'foundation', pillar: 'AppliedAwareness', order: 8, audio: STABILITY_OPEN_AWARENESS_AUDIO, status: PRACTICE_STATUS.COMPLETE, durationMinutes: 10, unlock: 'foundation_unlocked' },
  { id: 'stress-reset', key: 'StressReset', title: 'Stress Reset', category: 'foundation', pillar: 'AppliedAwareness', order: 9, audio: FOUNDATION_STRESS_RESET_AUDIO, status: PRACTICE_STATUS.COMPLETE, durationMinutes: 7, unlock: 'foundation_unlocked' },
  { id: 'pre-sleep', key: 'PreSleep', title: 'Pre-Sleep', category: 'foundation', pillar: 'AppliedAwareness', order: 10, audio: FOUNDATION_PRE_SLEEP_AUDIO, status: PRACTICE_STATUS.COMPLETE, durationMinutes: 12, unlock: 'foundation_unlocked' },
  { id: 'intuition-introduction', key: 'IntuitionIntroduction', title: 'Intuition Introduction', category: 'intuition', pillar: 'SignalTraining', order: 1, audio: INTUITION_INTRO_AUDIO, status: PRACTICE_STATUS.COMPLETE, durationMinutes: 6, unlock: 'intuition_intro' },
  { id: 'signal-detection', key: 'SignalDetection', title: 'Signal Detection', category: 'intuition', pillar: 'SignalTraining', order: 2, audio: INTUITION_SIGNAL_DETECTION_AUDIO, status: PRACTICE_STATUS.COMPLETE, durationMinutes: 8, unlock: 'intuition_intro' },
  { id: 'signal-vs-noise', key: 'SignalVsNoise', title: 'Signal vs Noise', category: 'intuition', pillar: 'SignalTraining', order: 3, audio: INTUITION_SIGNAL_VS_NOISE_AUDIO, status: PRACTICE_STATUS.COMPLETE, durationMinutes: 8, unlock: 'intuition_intro' },
  { id: 'gut-awareness', key: 'GutAwareness', title: 'Gut Awareness', category: 'intuition', pillar: 'SignalTraining', order: 4, audio: INTUITION_GUT_AWARENESS_AUDIO, status: PRACTICE_STATUS.COMPLETE, durationMinutes: 9, unlock: 'intuition_intro' },
  { id: 'read-the-room', key: 'ReadTheRoom', title: 'Read the Room', category: 'intuition', pillar: 'SignalTraining', order: 5, audio: INTUITION_READ_THE_ROOM_AUDIO, status: PRACTICE_STATUS.COMPLETE, durationMinutes: 9, unlock: 'intuition_intro' },
  { id: 'pause-before-reaction', key: 'PauseBeforeReaction', title: 'Pause Before Reaction', category: 'intuition', pillar: 'SignalTraining', order: 6, audio: INTUITION_PAUSE_BEFORE_REACTION_AUDIO, status: PRACTICE_STATUS.COMPLETE, durationMinutes: 8, unlock: 'intuition_intro' },
  { id: 'trust-the-signal', key: 'TrustTheSignal', title: 'Trust the Signal', category: 'intuition', pillar: 'SignalTraining', order: 7, audio: INTUITION_TRUST_THE_SIGNAL_AUDIO, status: PRACTICE_STATUS.COMPLETE, durationMinutes: 9, unlock: 'intuition_intro' },
  { id: 'focus-for-work', key: 'FocusForWork', title: 'Focus for Work', category: 'flow', pillar: 'CoreFlow', order: 1, audio: null, status: PRACTICE_STATUS.COMING_SOON, durationMinutes: null, unlock: 'coming_soon' },
  { id: 'decision-clarity', key: 'DecisionClarity', title: 'Decision Clarity', category: 'flow', pillar: 'CoreFlow', order: 2, audio: null, status: PRACTICE_STATUS.COMING_SOON, durationMinutes: null, unlock: 'coming_soon' },
  { id: 'difficult-emotion', key: 'DifficultEmotion', title: 'Difficult Emotion', category: 'flow', pillar: 'CoreFlow', order: 3, audio: null, status: PRACTICE_STATUS.COMING_SOON, durationMinutes: null, unlock: 'coming_soon' },
  { id: 'present-moment', key: 'PresentMoment', title: 'Present Moment', category: 'flow', pillar: 'CoreFlow', order: 4, audio: null, status: PRACTICE_STATUS.COMING_SOON, durationMinutes: null, unlock: 'coming_soon' },
  { id: 'letting-go', key: 'LettingGo', title: 'Letting Go', category: 'flow', pillar: 'CoreFlow', order: 5, audio: null, status: PRACTICE_STATUS.COMING_SOON, durationMinutes: null, unlock: 'coming_soon' }
]);

export function validatePracticeSchema(practices = CANONICAL_PRACTICES) {
  const errors = [];
  const ids = new Set();
  practices.forEach((p) => {
    if (ids.has(p.id)) errors.push(`Duplicate practice id: ${p.id}`);
    ids.add(p.id);
    if (!p.category || !p.pillar) errors.push(`Missing category/pillar: ${p.key}`);
    if (!VALID_STATUS.has(p.status)) errors.push(`Invalid status: ${p.key} (${p.status})`);
    if (p.status !== PRACTICE_STATUS.COMING_SOON && !p.audio) errors.push(`Missing audio reference: ${p.key}`);
  });
  return errors;
}

const byCategory = (category) => CANONICAL_PRACTICES.filter((p) => p.category === category).sort((a,b) => a.order - b.order);
export const foundationOrder = Object.freeze(byCategory('foundation').map((p) => p.key));
export const intuitionOrder = Object.freeze(byCategory('intuition').map((p) => p.key));
export const flowOrder = Object.freeze(byCategory('flow').map((p) => p.key));
export const foundationGroups = Object.freeze({
  CoreStability: Object.freeze(byCategory('foundation').filter((p) => p.pillar === 'CoreStability').map((p) => p.key)),
  AppliedAwareness: Object.freeze(byCategory('foundation').filter((p) => p.pillar === 'AppliedAwareness').map((p) => p.key))
});
export const PRACTICES_BY_ID = Object.freeze(Object.fromEntries(CANONICAL_PRACTICES.map((p) => [p.id, Object.freeze({ title: p.title, category: p.category, audio: p.audio, intro: null, status: p.status })])));
export const FLOW_PRACTICE_CARDS = Object.freeze(byCategory('flow').map((p) => Object.freeze({ id: p.id, key: p.key, title: p.title, description: ({FocusForWork:'Train sustained attention and reduce mental drift during work.',DecisionClarity:'Reduce noise and improve deliberate decision-making.',DifficultEmotion:'Train stability when facing emotional discomfort.',PresentMoment:'Return attention to what matters now.',LettingGo:'Release mental attachment and unnecessary resistance.'})[p.key] || '', category: p.category, status: p.status })));
