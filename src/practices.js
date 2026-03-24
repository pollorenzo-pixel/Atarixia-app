import {
  INTRODUCTION_AUDIO,
  FOUNDATION_BREATH_AWARENESS_AUDIO,
  FOUNDATION_BODY_AWARENESS_AUDIO,
  FOUNDATION_THOUGHT_AWARENESS_AUDIO,
  FOUNDATION_EMOTIONAL_AWARENESS_AUDIO,
  FOUNDATION_DEEP_FOCUS_AUDIO,
  STABILITY_OPEN_AWARENESS_AUDIO,
  STABILITY_SENSORY_AWARENESS_AUDIO
} from './config.js';

export const REFLECTION_REINFORCEMENT = {
      Breath: {
        title: 'You noticed the breath.',
        body: 'That means your attention found an anchor. Each return strengthens focus.'
      },
      Sounds: {
        title: 'You noticed sound.',
        body: 'That means awareness stayed open. Noticing without chasing builds steadiness.'
      },
      Sensations: {
        title: 'You noticed sensation.',
        body: 'That means you were present in the body. Presence grows when sensation is clearly known.'
      },
      'Mind wandering': {
        title: 'You noticed mind wandering.',
        body: 'That is not failure. Catching distraction is the moment awareness gets stronger.'
      }
    };

export const PRACTICE_GUIDANCE = {
      BreathAwareness: {
        label: 'Breath Awareness',
        stabilise: 'Stay here and shorten the goal. Win by returning once more than yesterday.',
        deepen: 'Keep this as your base anchor before branching wider.'
      },
      BodyAwareness: {
        label: 'Body Awareness',
        stabilise: 'Slow down and feel larger body regions instead of chasing subtle detail.',
        deepen: 'Use this to ground before thought or emotional work.'
      },
      ThoughtAwareness: {
        label: 'Thought Awareness',
        stabilise: 'Do less. See the thought, name it lightly, and return.',
        deepen: 'This is building separation between awareness and mental noise.'
      },
      EmotionalAwareness: {
        label: 'Emotional Awareness',
        stabilise: 'Reduce effort. Feel the tone of the emotion without trying to solve it.',
        deepen: 'This is where steadiness becomes maturity.'
      },
      DeepFocus: {
        label: 'Deep Focus',
        stabilise: 'Tighten the session. Shorter, cleaner repetitions beat forcing intensity.',
        deepen: 'Good sign. Keep strengthening one-pointed attention.'
      },
      OpenAwareness: {
        label: 'Open Awareness',
        stabilise: 'Return briefly to one anchor, then reopen the field.',
        deepen: 'You are learning to remain open without losing stability.'
      },
      SensoryAwareness: {
        label: 'Sensory Awareness',
        stabilise: 'Let sensation come to you instead of searching for it.',
        deepen: 'This builds a calm, wide, embodied awareness.'
      }
    };

export const practiceContent = {
      Welcome: {
        eyebrow: 'Before You Begin (Disclaimer)',
        hero: 'Welcome first.<br>Then begin.',
        subtitle: ['Arrive', 'Read', 'Begin'],
        note: 'Read this first, then continue into the introduction.',
        badge: 'Before You Begin (Disclaimer)',
        copyLabel: 'Session Guidance',
        copyTitle: 'Before You Begin (Disclaimer)',
        copyBody: `A short disclaimer before practice. This app is for mindfulness and mental training. It is not a replacement for medical, psychiatric, or crisis support. If something feels overwhelming, pause, stop, and seek support if needed. Only practice in a safe place where you can fully relax and pay attention.`,
        startLabel: 'Begin',
        audio: []
      },
      Introduction: {
        startLabel: 'Begin Meditation',
        eyebrow: 'Introduction',
        hero: 'Arrive first.<br>Then begin.',
        subtitle: ['Settle', 'Notice', 'Prepare'],
        note: 'This is your starting point.',
        badge: 'Introduction',
        copyLabel: 'Session Guidance',
        copyTitle: 'Introduction',
        copyBody: `This is a place to begin.

You do not need to clear your mind. You do not need to perform. You only need to arrive and follow the guidance.`,
        audio: [INTRODUCTION_AUDIO]
      },
      FoundationHome: {
        eyebrow: 'Meditation Foundations',
        hero: 'Choose one practice.<br>Stay with it.',
        subtitle: ['Simple', 'Steady', 'Repeatable'],
        note: 'Start with one practice. Return often.',
        badge: 'Foundation',
        copyLabel: 'Foundation Path',
        copyTitle: 'Beginner Practice Track',
        copyBody: 'Foundation is the place where meditation becomes familiar. Choose one practice and stay with it.'
      },
      StabilityHome: {
        eyebrow: 'Stability Path',
        hero: 'Widen awareness.<br>Remain steady.',
        subtitle: ['Open', 'Include', 'Remain'],
        note: 'Use stability once the base begins to settle.',
        badge: 'Stability',
        copyLabel: 'Stability Path',
        copyTitle: 'Open Awareness Track',
        copyBody: 'Stability expands attention beyond a single anchor. Use it to remain open without losing steadiness.'
      },
      Profile: {
        eyebrow: 'Profile',
        hero: 'Your training.<br>Your pattern.',
        subtitle: ['Insights', 'Stats', 'Coach'],
        note: 'Track how your awareness is developing over time.',
        badge: 'Profile',
        copyLabel: 'Profile Overview',
        copyTitle: 'Training Summary',
        copyBody: 'All your reflection patterns, practice history, and current guidance live here.'
      },
      Foundation: {
        groundingText: 'Get comfortable and prepare to begin',
        completionMessage: 'Well done. Stay with the feeling for a moment.',
        readyAudioText: 'Foundation Ready',
        pausedText: 'Paused',
        pausedLabel: 'Session Paused',
        activeText: 'Playing',
        activeLabel: 'Session Active',
        subcategories: {
          BreathAwareness: {
            title: 'Breath Awareness Meditation',
            shortPurpose: 'Return to the present through the breath.',
            eyebrow: 'Meditation Foundations',
            hero: 'Follow the breath.<br>Return to the moment.',
            subtitle: ['Observe', 'Breathe', 'Return'],
            note: 'Each breath is a place to begin again.',
            badge: 'Foundation · Breath Awareness',
            copyLabel: 'Current Foundation Practice',
            copyTitle: 'Breath Awareness Meditation',
            copyBody: 'In this practice, bring attention to the breath. When the mind wanders, gently return.',
            audio: FOUNDATION_BREATH_AWARENESS_AUDIO,
            lesson: 'Your mind will wander. The skill is returning.',
            reinforcement: 'Each return to the breath strengthens attention.',
            activeText: 'Playing',
            activeLabel: 'Breath Awareness',
            endingText: 'Closing',
            endingLabel: 'Ending Audio'
          },
          BodyAwareness: {
            title: 'Body Awareness Meditation',
            shortPurpose: 'Settle into the body and soften tension.',
            eyebrow: 'Meditation Foundations',
            hero: 'Feel the body.<br>Settle into presence.',
            subtitle: ['Sense', 'Soften', 'Arrive'],
            note: 'The body is your doorway back to now.',
            badge: 'Foundation · Body Awareness',
            copyLabel: 'Current Foundation Practice',
            copyTitle: 'Body Awareness Meditation',
            copyBody: 'In this practice, bring gentle attention to the body and feel what is already here.',
            audio: FOUNDATION_BODY_AWARENESS_AUDIO,
            lesson: 'You do not need to change the body. Only feel it clearly.',
            reinforcement: 'Feeling the body directly builds grounded presence.',
            activeText: 'Playing',
            activeLabel: 'Body Awareness',
            endingText: 'Closing',
            endingLabel: 'Ending Audio'
          },
          ThoughtAwareness: {
            title: 'Thought Awareness Meditation',
            shortPurpose: 'Observe thoughts without getting carried away.',
            eyebrow: 'Meditation Foundations',
            hero: 'See the thoughts.<br>Do not chase them.',
            subtitle: ['Observe', 'Allow', 'Return'],
            note: 'You are learning to witness, not follow.',
            badge: 'Foundation · Thought Awareness',
            copyLabel: 'Current Foundation Practice',
            copyTitle: 'Thought Awareness Meditation',
            copyBody: 'In this practice, notice thoughts as they arise without following them.',
            audio: FOUNDATION_THOUGHT_AWARENESS_AUDIO,
            lesson: 'You are not trying to stop thought. You are learning not to follow it.',
            reinforcement: 'Seeing thought without chasing it builds mental distance.',
            activeText: 'Playing',
            activeLabel: 'Thought Awareness',
            endingText: 'Closing',
            endingLabel: 'Ending Audio'
          },
          EmotionalAwareness: {
            title: 'Emotional Awareness Meditation',
            shortPurpose: 'Recognise the feeling tone with honesty.',
            eyebrow: 'Meditation Foundations',
            hero: 'Name the feeling.<br>Stay with honesty.',
            subtitle: ['Notice', 'Allow', 'Understand'],
            note: 'Awareness makes space around emotion.',
            badge: 'Foundation · Emotional Awareness',
            copyLabel: 'Current Foundation Practice',
            copyTitle: 'Emotional Awareness Meditation',
            copyBody: 'In this practice, notice the emotional tone of the moment and give it space without judgment.',
            audio: FOUNDATION_EMOTIONAL_AWARENESS_AUDIO,
            lesson: 'You are not here to fix the feeling. Only to know it.',
            reinforcement: 'Allowing emotion without reacting builds steadiness.',
            activeText: 'Playing',
            activeLabel: 'Emotional Awareness',
            endingText: 'Closing',
            endingLabel: 'Ending Audio'
          },
          DeepFocus: {
            title: 'Deep Focus Meditation',
            shortPurpose: 'Strengthen attention through steady return.',
            eyebrow: 'Meditation Foundations',
            hero: 'Hold one point.<br>Strengthen attention.',
            subtitle: ['Aim', 'Hold', 'Return'],
            note: 'Attention becomes stronger through repetition.',
            badge: 'Foundation · Deep Focus',
            copyLabel: 'Current Foundation Practice',
            copyTitle: 'Deep Focus Meditation',
            copyBody: 'In this practice, hold attention on one chosen anchor and return with calm discipline.',
            audio: FOUNDATION_DEEP_FOCUS_AUDIO,
            lesson: 'Attention becomes stronger each time you return to one point.',
            reinforcement: 'Sustained return trains stronger concentration.',
            activeText: 'Playing',
            activeLabel: 'Deep Focus',
            endingText: 'Closing',
            endingLabel: 'Ending Audio'
          }
        }
      },
      Stability: {
        groundingText: 'Let everything settle.',
        completionMessage: 'There was nothing to achieve. Just notice what is already here.',
        readyAudioText: 'Ready to Begin Stability Practice',
        pausedText: 'Still',
        pausedLabel: 'Awareness Paused',
        activeText: 'Aware',
        activeLabel: 'Open Awareness',
        subcategories: {
          OpenAwareness: {
            title: 'Open Awareness Meditation',
            shortPurpose: 'Let awareness open to everything at once.',
            eyebrow: 'Stability · Expanding Awareness',
            hero: 'Open the field.<br>Let everything appear.',
            subtitle: ['Open', 'Notice', 'Remain'],
            note: 'There is nothing to hold. Let awareness stay wide.',
            badge: 'Stability · Open Awareness',
            copyLabel: 'Current Stability Practice',
            copyTitle: 'Open Awareness',
            copyBody: 'There is nothing to focus on. Simply notice whatever is present.',
            audio: [STABILITY_OPEN_AWARENESS_AUDIO],
            lesson: 'Nothing needs to be chosen. Let the whole field be included.',
            reinforcement: 'Resting in openness trains stable awareness without force.',
            activeText: 'Aware',
            activeLabel: 'Open Awareness',
            endingText: 'Open',
            endingLabel: 'Complete'
          },
          SensoryAwareness: {
            title: 'Sensory Awareness Meditation',
            shortPurpose: 'Rest in the full field of sensation.',
            eyebrow: 'Stability · Expanding Awareness',
            hero: 'Feel the full field.<br>Include sensation.',
            subtitle: ['Sense', 'Include', 'Remain'],
            note: 'Nothing needs to be chosen. Let sensation be known.',
            badge: 'Stability · Sensory Awareness',
            copyLabel: 'Current Stability Practice',
            copyTitle: 'Sensory Awareness',
            copyBody: 'Allow awareness to rest in sensation. Notice sound, touch, temperature, pressure, and space.',
            audio: [STABILITY_SENSORY_AWARENESS_AUDIO],
            lesson: 'Let sensation come to you. Do not narrow attention.',
            reinforcement: 'Including the full sensory field widens and steadies awareness.',
            activeText: 'Sensing',
            activeLabel: 'Sensory Awareness',
            endingText: 'Settling',
            endingLabel: 'Complete'
          }
        }
      }
    };

