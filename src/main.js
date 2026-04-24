
import { createPracticeRecommendation } from './recommendation-engine.js';
import { GrainCircle } from './grain-circle.js';
import { createSessionModeController } from './session-mode-controller.js';

        const INTRODUCTION_AUDIO = 'audio/introduction audio 2.mp3';
    const FOUNDATION_SHARED_ENDING_AUDIO = 'audio/ending audio foundation.mp3';
    const FOUNDATION_BREATH_AWARENESS_AUDIO = ['audio/Breath only meditation foundation meditation.mp3', FOUNDATION_SHARED_ENDING_AUDIO];
    const FOUNDATION_BODY_AWARENESS_AUDIO = ['audio/body awareness meditation.mp3', 'audio/body awareness ending audio.mp3'];
    const FOUNDATION_THOUGHT_AWARENESS_AUDIO = ['audio/Thought awareness meditation.mp3', 'audio/thought awareness ending audio.mp3'];
    const FOUNDATION_EMOTIONAL_AWARENESS_AUDIO = ['audio/Emotional Awareness meditations.mp3', 'audio/emotional awareness ending audio.mp3'];
    const FOUNDATION_DEEP_FOCUS_AUDIO = ['audio/deep focus meditation.mp3', 'audio/deep focus ending audio.mp3'];
    const FOUNDATION_OPEN_AWARENESS_AUDIO = 'audio/open awareness meditation.mp3';
    const FOUNDATION_SENSORY_AWARENESS_AUDIO = 'audio/sensory awareness meditation.mp3';
    const FOUNDATION_WALKING_MEDITATION_AUDIO = 'audio/Walking meditation.mp3';
    const FOUNDATION_STRESS_RESET_AUDIO = 'audio/Stress reset.mp3';
    const FOUNDATION_PRE_SLEEP_AUDIO = 'audio/Pre-sleep.mp3';

    const WELCOME_AUDIO = 'audio/Brittney welcome audio.mp3';
    const INTUITION_INTRO_AUDIO = 'audio/Intuition_intro.mp3';
    const INTUITION_SIGNAL_DETECTION_AUDIO = 'audio/Signal Detection Meditation.mp3';
    const DEFAULT_WELCOME_CAPTION = 'Hey… welcome to Ataraxia.';
    const DEFAULT_WELCOME_STATE = 'Settle';
    const DEFAULT_WELCOME_LABEL = 'Welcome Audio';
    const WELCOME_SCRIPT_CUES = [
      { start: 0.00, end: 2.95, text: 'Hey… welcome to Ataraxia.' },
      { start: 3.00, end: 5.28, text: 'Before we begin, just a quick note.' },
      { start: 5.32, end: 15.12, text: 'This app is designed to help you train your mind… to build focus, awareness, and a calmer, more steady state. Think of it like going to the gym… but for your attention.' },
      { start: 16.40, end: 31.18, text: 'Now, while these practices are based on well-known techniques in mindfulness and mental training… this isn’t a replacement for professional medical or psychological care. If you ever feel like you need extra support, it’s always a good idea to reach out to a qualified professional.' },
      { start: 31.90, end: 42.50, text: 'Also, some sessions involve closing your eyes or going into deeper focus. So just make sure you’re in a safe place… and definitely not driving or doing anything that needs your full attention.' },
      { start: 43.55, end: 50.82, text: 'And remember… you’re always in control. If something doesn’t feel right, you can pause, adjust, or stop at any time.' },
      { start: 51.82, end: 56.05, text: 'Take what works for you… leave what doesn’t… and move at your own pace.' },
      { start: 56.90, end: 58.67, text: 'Alright… let’s begin.' }
    ];

    const STORAGE_KEY = 'ataraxia_practice_progress_v4';
    const DISCLAIMER_STORAGE_KEY = 'ataraxia_disclaimer_seen_v1';
    const INTUITION_INTRO_STORAGE_KEY = 'ataraxia_intuition_intro_completed_v1';
    const REFLECTION_STORAGE_KEY = 'ataraxia_reflections_v1';
    const SESSION_HISTORY_STORAGE_KEY = 'ataraxia_session_history_v1';
    const JOURNAL_STORAGE_KEY = 'ataraxia_journal_entries_v1';
    const JOURNAL_PROMPTS = [
      'What did I notice in my mind today?',
      'What emotion stayed with me the longest today?',
      'What distracted me most during practice?',
      'What helped me return to the present?',
      'What feels clearer today than before?',
      'What am I avoiding looking at honestly?',
      'What did I learn about myself today?'
    ];
    const TRANSITION_DELAY = 2000;
    const SESSION_UI_READY_DELAY = 120;
    const SESSION_AUTOSTART_ON_READY = false;
    // Locked production baseline: preserve identifiers and ordering for progression, unlocks, and history compatibility.
    const foundationOrder = ['BreathAwareness', 'BodyAwareness', 'ThoughtAwareness', 'EmotionalAwareness', 'DeepFocus', 'SensoryAwareness', 'WalkingMeditation', 'OpenAwareness', 'StressReset', 'PreSleep'];
    const foundationGroups = {
      CoreStability: ['BreathAwareness', 'BodyAwareness', 'ThoughtAwareness', 'EmotionalAwareness', 'DeepFocus'],
      AppliedAwareness: ['SensoryAwareness', 'WalkingMeditation', 'OpenAwareness', 'StressReset', 'PreSleep']
    };
    const FOUNDATION_SKILL_IDENTITIES = {
      BreathAwareness: 'Attention Stability',
      BodyAwareness: 'Interoceptive Awareness',
      ThoughtAwareness: 'Cognitive Defusion',
      EmotionalAwareness: 'Emotional Recognition',
      DeepFocus: 'Sustained Attention',
      SensoryAwareness: 'Present-Moment Sensory Clarity',
      WalkingMeditation: 'Awareness in Motion',
      OpenAwareness: 'Broad Attention',
      StressReset: 'Emotional Regulation',
      PreSleep: 'Downregulation and Release'
    };
    const INTUITION_SKILL_IDENTITIES = {
      SignalDetection: 'Signal Awareness'
    };
    const FOUNDATION_ESTIMATED_MINUTES = {
      BreathAwareness: 8,
      BodyAwareness: 10,
      ThoughtAwareness: 11,
      EmotionalAwareness: 11,
      DeepFocus: 12,
      OpenAwareness: 10,
      SensoryAwareness: 10,
      WalkingMeditation: 9,
      StressReset: 7,
      PreSleep: 12
    };
    const TRAIN_SECTION_CONTENT = {
      Foundation: {
        eyebrow: 'Train · Foundation',
        hero: 'Build stable attention.<br>Then broaden awareness.',
        subtitle: ['Core', 'Applied', 'Structured'],
        copyLabel: 'Foundation',
        copyTitle: 'Structured Practice Map',
        copyBody: 'Progressive disclosure: choose subgroup, then practice. Every card opens a full session.'
      },
      Intuition: {
        eyebrow: 'Train · Intuition',
        hero: 'Intuition training.<br>Ready to unlock.',
        subtitle: ['Unlock', 'Signal', 'Detection'],
        copyLabel: 'Intuition',
        copyTitle: 'Intuition Unlock',
        copyBody: 'Complete Foundation first. Intuition opens once stable awareness is built.'
      },
      Flow: {
        eyebrow: 'Train · Flow',
        hero: 'Flow training.<br>Coming next.',
        subtitle: ['System', 'Coming', 'Next'],
        copyLabel: 'Flow',
        copyTitle: 'System Section In Progress',
        copyBody: 'Flow will be added without changing Foundation routing or audio wiring.'
      }
    };
    const APP_BOOT_DELAY = 1800;

    function resolveAssetPath(path) {
      if (!path) return '';
      try {
        return new URL(path, document.baseURI).href;
      } catch (error) {
        console.warn('Unable to resolve audio path.', error);
        return path;
      }
    }

    const openingQuotes = [
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

    const quotes = openingQuotes;

    const REFLECTION_REINFORCEMENT = {
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

    const FOUNDATION_COMPLETION_LOOP = {
      BreathAwareness: {
        trained: 'You trained attention stability through breath returns.',
        why: 'This builds steadiness when the mind starts to drift.'
      },
      BodyAwareness: {
        trained: 'You trained interoceptive awareness in the body.',
        why: 'This helps you settle faster when tension rises.'
      },
      ThoughtAwareness: {
        trained: 'You trained cognitive defusion from thought streams.',
        why: 'This strengthens choice before automatic reaction.'
      },
      EmotionalAwareness: {
        trained: 'You trained emotional recognition without avoidance.',
        why: 'This supports steadier responses under emotional load.'
      },
      DeepFocus: {
        trained: 'You trained sustained attention on a single target.',
        why: 'This improves your ability to hold clarity under pressure.'
      },
      SensoryAwareness: {
        trained: 'You trained present-moment sensory clarity.',
        why: 'This keeps awareness grounded in direct experience.'
      },
      WalkingMeditation: {
        trained: 'You trained awareness in motion.',
        why: 'This builds presence outside stillness.'
      },
      OpenAwareness: {
        trained: 'You trained broad attention without losing center.',
        why: 'This supports calm awareness in complex environments.'
      },
      StressReset: {
        trained: 'You practiced emotional regulation under pressure.',
        why: 'This helps you return to steadiness faster.'
      },
      PreSleep: {
        trained: 'You trained downregulation before rest.',
        why: 'This improves how quickly mind and body release.'
      }
    };
    const INTUITION_COMPLETION_LOOP = {
      SignalDetection: {
        trained: 'You trained signal awareness.',
        why: 'This builds the ability to notice subtle information before reacting.'
      }
    };

    const PRACTICE_GUIDANCE = {
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
        stabilise: 'Briefly touch one anchor, then reopen awareness to the full field.',
        deepen: 'Stay open and include everything without tightening around any one object.'
      },
      SensoryAwareness: {
        label: 'Sensory Awareness',
        stabilise: 'Let sensation come to you naturally instead of searching for detail.',
        deepen: 'Rest in the whole sensory field while remaining calm and steady.'
      },
      WalkingMeditation: {
        label: 'Walking Meditation',
        stabilise: 'Slow the pace and feel each step clearly before adding more detail.',
        deepen: 'Let movement and awareness stay continuous from step to step.'
      },
      StressReset: {
        label: 'Stress Reset',
        stabilise: 'Shorten the session and return to simple grounding cues.',
        deepen: 'Use this to interrupt reactivity and restore steadier attention quickly.'
      },
      PreSleep: {
        label: 'Pre-Sleep',
        stabilise: 'Lower effort and keep attention soft and simple.',
        deepen: 'Allow awareness to stay relaxed while the body settles toward rest.'
      }
    };

    const practiceContent = {
      Welcome: {
        eyebrow: 'Before You Begin (Disclaimer)',
        hero: 'Welcome first.<br>Then begin.',
        subtitle: ['Arrive', 'Read', 'Begin'],
        note: 'Read this once, then begin.',
        badge: 'Before You Begin (Disclaimer)',
        copyLabel: 'Session Guidance',
        copyTitle: 'Before You Begin (Disclaimer)',
        copyBody: `Ataraxia supports mindfulness training. It is not medical or crisis care.

Practice only in a safe place. Pause or stop anytime.`,
        startLabel: 'Begin',
        audio: []
      },
      Introduction: {
        startLabel: 'Start Today’s Session',
        eyebrow: 'Introduction',
        hero: 'Arrive first.<br>Then begin.',
        subtitle: ['Settle', 'Notice', 'Prepare'],
        note: 'Start here.',
        badge: 'Introduction',
        copyLabel: 'Session Guidance',
        copyTitle: 'Introduction',
        copyBody: `This is a place to begin.

You do not need to force anything. Arrive and follow the guidance.`,
        audio: [INTRODUCTION_AUDIO]
      },
      FoundationHome: {
        eyebrow: 'Train',
        hero: 'Choose your section.<br>Then go deeper.',
        subtitle: ['Foundation', 'Intuition', 'Flow'],
        note: 'Choose one track and continue.',
        badge: 'Train',
        copyLabel: 'Train',
        copyTitle: 'Structured Practice Map',
        copyBody: 'Foundation is live. Intuition and Flow are coming next.'
      },
      Profile: {
        eyebrow: 'Profile',
        hero: 'Your training.<br>Your pattern.',
        subtitle: ['Insights', 'Stats', 'Coach'],
        note: 'See your pattern over time.',
        badge: 'Profile',
        copyLabel: 'Profile Overview',
        copyTitle: 'Training Summary',
        copyBody: 'Your history, reflections, and guidance in one place.'
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
            title: 'Breath Awareness',
            shortPurpose: 'Train steady attention by returning to the breath.',
            eyebrow: 'Meditation Foundations',
            hero: 'Follow the breath.<br>Return to the moment.',
            subtitle: ['Anchor', 'Notice', 'Return'],
            note: 'Each breath is a place to begin again.',
            badge: 'Foundation · Breath Awareness',
            copyLabel: 'Current Foundation Practice',
            copyTitle: 'Breath Awareness',
            copyBody: 'Use the breath as your anchor and train attention by returning each time it drifts.',
            audio: FOUNDATION_BREATH_AWARENESS_AUDIO,
            lesson: 'Your mind will wander. The skill is returning.',
            reinforcement: 'Each return to the breath strengthens attention.',
            activeText: 'Playing',
            activeLabel: 'Breath Awareness',
            endingText: 'Closing',
            endingLabel: 'Ending Audio'
          },
          BodyAwareness: {
            title: 'Body Awareness',
            shortPurpose: 'Build grounding by staying with clear body sensation.',
            eyebrow: 'Meditation Foundations',
            hero: 'Feel the body.<br>Settle into presence.',
            subtitle: ['Scan', 'Soften', 'Stabilize'],
            note: 'The body is your doorway back to now.',
            badge: 'Foundation · Body Awareness',
            copyLabel: 'Current Foundation Practice',
            copyTitle: 'Body Awareness',
            copyBody: 'Place attention on physical sensation and stabilize awareness through direct body feedback.',
            audio: FOUNDATION_BODY_AWARENESS_AUDIO,
            lesson: 'You do not need to change the body. Only feel it clearly.',
            reinforcement: 'Feeling the body directly builds grounded presence.',
            activeText: 'Playing',
            activeLabel: 'Body Awareness',
            endingText: 'Closing',
            endingLabel: 'Ending Audio'
          },
          ThoughtAwareness: {
            title: 'Thought Awareness',
            shortPurpose: 'Build mental distance by noticing thoughts without following.',
            eyebrow: 'Meditation Foundations',
            hero: 'See the thoughts.<br>Do not chase them.',
            subtitle: ['Notice', 'Label', 'Release'],
            note: 'You are learning to witness, not follow.',
            badge: 'Foundation · Thought Awareness',
            copyLabel: 'Current Foundation Practice',
            copyTitle: 'Thought Awareness',
            copyBody: 'Notice thoughts as events, then release and return to build cognitive separation.',
            audio: FOUNDATION_THOUGHT_AWARENESS_AUDIO,
            lesson: 'You are not trying to stop thought. You are learning not to follow it.',
            reinforcement: 'Seeing thought without chasing it builds mental distance.',
            activeText: 'Playing',
            activeLabel: 'Thought Awareness',
            endingText: 'Closing',
            endingLabel: 'Ending Audio'
          },
          EmotionalAwareness: {
            title: 'Emotional Awareness',
            shortPurpose: 'Strengthen emotional regulation through clear feeling awareness.',
            eyebrow: 'Meditation Foundations',
            hero: 'Name the feeling.<br>Stay with honesty.',
            subtitle: ['Name', 'Allow', 'Steady'],
            note: 'Awareness makes space around emotion.',
            badge: 'Foundation · Emotional Awareness',
            copyLabel: 'Current Foundation Practice',
            copyTitle: 'Emotional Awareness',
            copyBody: 'Identify the current emotion and stay present to reduce reactivity and increase control.',
            audio: FOUNDATION_EMOTIONAL_AWARENESS_AUDIO,
            lesson: 'You are not here to fix the feeling. Only to know it.',
            reinforcement: 'Allowing emotion without reacting builds steadiness.',
            activeText: 'Playing',
            activeLabel: 'Emotional Awareness',
            endingText: 'Closing',
            endingLabel: 'Ending Audio'
          },
          DeepFocus: {
            title: 'Deep Focus',
            shortPurpose: 'Increase concentration by sustaining one-pointed attention.',
            eyebrow: 'Meditation Foundations',
            hero: 'Hold one point.<br>Strengthen attention.',
            subtitle: ['Choose', 'Hold', 'Return'],
            note: 'Attention becomes stronger through repetition.',
            badge: 'Foundation · Core Stability · Deep Focus',
            copyLabel: 'Current Foundation Practice',
            copyTitle: 'Deep Focus',
            copyBody: 'Hold a single anchor and repeat clean returns to build durable concentration.',
            audio: FOUNDATION_DEEP_FOCUS_AUDIO,
            lesson: 'Attention becomes stronger each time you return to one point.',
            reinforcement: 'Sustained return trains stronger concentration.',
            activeText: 'Playing',
            activeLabel: 'Deep Focus',
            endingText: 'Closing',
            endingLabel: 'Ending Audio'
          },
          OpenAwareness: {
            title: 'Open Awareness',
            shortPurpose: 'Widen attention while staying stable across changing experience.',
            eyebrow: 'Meditation Foundations',
            hero: 'Open the field.<br>Include everything.',
            subtitle: ['Open', 'Include', 'Stabilize'],
            note: 'Let awareness stay wide without chasing any one object.',
            badge: 'Foundation · Applied Awareness · Open Awareness',
            copyLabel: 'Current Foundation Practice',
            copyTitle: 'Open Awareness',
            copyBody: 'Broaden awareness to include sound, sensation, thought, and space without losing stability.',
            audio: FOUNDATION_OPEN_AWARENESS_AUDIO,
            lesson: 'There is nothing to hold tightly. Let awareness remain open and steady.',
            reinforcement: 'Open attention builds stability without narrowing focus.',
            activeText: 'Aware',
            activeLabel: 'Open Awareness'
          },
          SensoryAwareness: {
            title: 'Sensory Awareness',
            shortPurpose: 'Improve presence by training full-field sensory attention.',
            eyebrow: 'Meditation Foundations',
            hero: 'Feel the whole field.<br>Stay present.',
            subtitle: ['Sense', 'Include', 'Stabilize'],
            note: 'Allow sensation to be known without choosing or rejecting.',
            badge: 'Foundation · Applied Awareness · Sensory Awareness',
            copyLabel: 'Current Foundation Practice',
            copyTitle: 'Sensory Awareness',
            copyBody: 'Track touch, sound, pressure, temperature, and space as one continuous sensory field.',
            audio: FOUNDATION_SENSORY_AWARENESS_AUDIO,
            lesson: 'Let sensation come to you. No need to search for anything special.',
            reinforcement: 'Including the sensory field widens and steadies awareness.',
            activeText: 'Sensing',
            activeLabel: 'Sensory Awareness'
          },
          WalkingMeditation: {
            title: 'Walking Meditation',
            shortPurpose: 'Carry stable attention into movement and daily activity.',
            eyebrow: 'Meditation Foundations',
            hero: 'Walk slowly.<br>Stay aware.',
            subtitle: ['Step', 'Feel', 'Stabilize'],
            note: 'Each step can become an anchor for attention.',
            badge: 'Foundation · Applied Awareness · Walking Meditation',
            copyLabel: 'Current Foundation Practice',
            copyTitle: 'Walking Meditation',
            copyBody: 'Use each step as an anchor to maintain clear attention while the body moves.',
            audio: FOUNDATION_WALKING_MEDITATION_AUDIO,
            lesson: 'Keep the pace simple and let attention rest in the body moving.',
            reinforcement: 'Awareness in motion strengthens continuity in daily life.',
            activeText: 'Walking',
            activeLabel: 'Walking Meditation'
          },
          StressReset: {
            title: 'Stress Reset',
            shortPurpose: 'Lower stress fast and recover clear, usable attention.',
            eyebrow: 'Meditation Foundations',
            hero: 'Pause and reset.<br>Return to center.',
            subtitle: ['Pause', 'Breathe', 'Recover'],
            note: 'A short awareness reset can interrupt stress momentum.',
            badge: 'Foundation · Applied Awareness · Stress Reset',
            copyLabel: 'Current Foundation Practice',
            copyTitle: 'Stress Reset',
            copyBody: 'Use a short protocol to reduce stress load and return to functional focus.',
            audio: FOUNDATION_STRESS_RESET_AUDIO,
            lesson: 'Do less. Keep it short, clear, and repeatable when stress rises.',
            reinforcement: 'Rapid resets improve recovery and reduce reactivity.',
            activeText: 'Resetting',
            activeLabel: 'Stress Reset'
          },
          PreSleep: {
            title: 'Pre-Sleep',
            shortPurpose: 'Downshift arousal to support faster, calmer sleep onset.',
            eyebrow: 'Meditation Foundations',
            hero: 'Soften the mind.<br>Ease into rest.',
            subtitle: ['Soften', 'Unwind', 'Settle'],
            note: 'Use this before sleep to release mental pressure.',
            badge: 'Foundation · Applied Awareness · Pre-Sleep',
            copyLabel: 'Current Foundation Practice',
            copyTitle: 'Pre-Sleep',
            copyBody: 'Guide attention into a low-effort rhythm that helps the mind and body transition to sleep.',
            audio: FOUNDATION_PRE_SLEEP_AUDIO,
            lesson: 'Reduce effort and allow the body to settle naturally.',
            reinforcement: 'Evening awareness supports calmer transitions into sleep.',
            activeText: 'Unwinding',
            activeLabel: 'Pre-Sleep'
          },
        }
      },
      Intuition: {
        groundingText: 'Settle and prepare to detect subtle signals.',
        completionMessage: 'Well done. Let the signal stay clear without forcing it.',
        readyAudioText: 'Intuition Ready',
        pausedText: 'Paused',
        pausedLabel: 'Session Paused',
        activeText: 'Playing',
        activeLabel: 'Signal Detection',
        subcategories: {
          SignalDetection: {
            title: 'Signal Detection',
            shortPurpose: 'Notice subtle signals before the mind explains them.',
            eyebrow: 'Intuition',
            hero: 'Signal Detection',
            subtitle: ['Notice subtle signals before the mind explains them.'],
            note: 'Train awareness to catch quiet internal and external signals before reaction takes over.',
            badge: 'Intuition · Signal Detection',
            copyLabel: 'Current Intuition Practice',
            copyTitle: 'Signal Detection',
            copyBody: 'Train awareness to catch quiet internal and external signals before reaction takes over.',
            audio: INTUITION_SIGNAL_DETECTION_AUDIO,
            lesson: 'Notice what appears first, before interpretation.',
            reinforcement: 'Subtle cues become clearer when reaction slows down.',
            activeText: 'Playing',
            activeLabel: 'Signal Detection'
          }
        }
      }
    };

    const el = {
      welcomeIntroOverlay: document.getElementById('welcomeIntroOverlay'),
      welcomeIntroKicker: document.getElementById('welcomeIntroKicker'),
      welcomeIntroState: document.getElementById('welcomeIntroState'),
      welcomeIntroParticles: document.getElementById('welcomeIntroParticles'),
      welcomeIntroLabel: document.getElementById('welcomeIntroLabel'),
      welcomeIntroCaption: document.getElementById('welcomeIntroCaption'),
      welcomeIntroActionBtn: document.getElementById('welcomeIntroActionBtn'),
      welcomeIntroSkipBtn: document.getElementById('welcomeIntroSkipBtn'),
      welcomeIntroAudio: document.getElementById('welcomeIntroAudio'),
      sessionAudio: document.getElementById('sessionAudio'),
      homeTabBtn: document.getElementById('homeTabBtn'),
      trainTabBtn: document.getElementById('trainTabBtn'),
      progressTabBtn: document.getElementById('progressTabBtn'),
      accountTabBtn: document.getElementById('accountTabBtn'),
      homeScreen: document.getElementById('homeScreen'),
      trainScreen: document.getElementById('trainScreen'),
      progressScreen: document.getElementById('progressScreen'),
      accountScreen: document.getElementById('accountScreen'),
      homeQuoteText: document.getElementById('homeQuoteText'),
      homeQuoteAuthor: document.getElementById('homeQuoteAuthor'),
      homeNextMoveTitle: document.getElementById('homeNextMoveTitle'),
      homeNextMoveReason: document.getElementById('homeNextMoveReason'),
      openingScene: document.getElementById('openingScene'),
      navMenuBtn: document.getElementById('navMenuBtn'),
      openingQuote: document.getElementById('openingQuote'),
      openingAuthor: document.getElementById('openingAuthor'),
      appShell: document.getElementById('appShell'),
      menuOverlay: document.getElementById('menuOverlay'),
      foundationMenuBtn: document.getElementById('foundationMenuBtn'),
      intuitionMenuBtn: document.getElementById('intuitionMenuBtn'),
      flowMenuBtn: document.getElementById('flowMenuBtn'),
      foundationSubsection: document.getElementById('foundationSubsection'),
      coreStabilityBtn: document.getElementById('coreStabilityBtn'),
      appliedAwarenessBtn: document.getElementById('appliedAwarenessBtn'),
      coreStabilityList: document.getElementById('coreStabilityList'),
      appliedAwarenessList: document.getElementById('appliedAwarenessList'),
      eyebrowText: document.getElementById('eyebrowText'),
      heroTitle: document.getElementById('heroTitle'),
      heroSubtitle: document.getElementById('heroSubtitle'),
      trainEyebrowText: document.getElementById('trainEyebrowText'),
      trainHeroTitle: document.getElementById('trainHeroTitle'),
      trainHeroSubtitle: document.getElementById('trainHeroSubtitle'),
      practiceCopyLabel: document.getElementById('practiceCopyLabel'),
      practiceCopyTitle: document.getElementById('practiceCopyTitle'),
      practiceCopyBody: document.getElementById('practiceCopyBody'),
      trainPracticeCopyLabel: document.getElementById('trainPracticeCopyLabel'),
      trainPracticeCopyTitle: document.getElementById('trainPracticeCopyTitle'),
      trainPracticeCopyBody: document.getElementById('trainPracticeCopyBody'),
      lessonCard: document.getElementById('lessonCard'),
      lessonTitle: document.getElementById('lessonTitle'),
      lessonBody: document.getElementById('lessonBody'),
      trainLessonCard: document.getElementById('trainLessonCard'),
      trainLessonTitle: document.getElementById('trainLessonTitle'),
      trainLessonBody: document.getElementById('trainLessonBody'),
      lessonOverlay: document.getElementById('lessonOverlay'),
      lessonOverlayTitle: document.getElementById('lessonOverlayTitle'),
      lessonOverlayBody: document.getElementById('lessonOverlayBody'),
      foundationHomePanel: document.getElementById('foundationHomePanel'),
      foundationProgressModule: document.getElementById('foundationProgressModule'),
      foundationSubgroupPanel: document.getElementById('foundationSubgroupPanel'),
      foundationPracticeHeader: document.getElementById('foundationPracticeHeader'),
      foundationCoreBtn: document.getElementById('foundationCoreBtn'),
      foundationAppliedBtn: document.getElementById('foundationAppliedBtn'),
      foundationOverallPercent: document.getElementById('foundationOverallPercent'),
      foundationCompletedPractices: document.getElementById('foundationCompletedPractices'),
      foundationTotalPractices: document.getElementById('foundationTotalPractices'),
      foundationCoreProgress: document.getElementById('foundationCoreProgress'),
      foundationAppliedProgress: document.getElementById('foundationAppliedProgress'),
      foundationCardsContainer: document.getElementById('foundationCardsContainer'),
      trainTrackFoundationBtn: document.getElementById('trainTrackFoundationBtn'),
      trainTrackIntuitionBtn: document.getElementById('trainTrackIntuitionBtn'),
      trainTrackFlowBtn: document.getElementById('trainTrackFlowBtn'),
      comingNextPanel: document.getElementById('comingNextPanel'),
      comingNextTitle: document.getElementById('comingNextTitle'),
      comingNextBody: document.getElementById('comingNextBody'),
      trainHierarchyBackBtn: document.getElementById('trainHierarchyBackBtn'),
      trainHierarchyTitle: document.getElementById('trainHierarchyTitle'),
      trainDetailBackBtn: document.getElementById('trainDetailBackBtn'),
      trainPracticeNavRow: document.getElementById('trainPracticeNavRow'),
      previousPracticeBtn: document.getElementById('previousPracticeBtn'),
      profilePagePanel: document.getElementById('profilePagePanel'),
      profileCoachTitle: document.getElementById('profileCoachTitle'),
      profileCoachBody: document.getElementById('profileCoachBody'),
      profileTotalSessions: document.getElementById('profileTotalSessions'),
      profileTotalMinutes: document.getElementById('profileTotalMinutes'),
      profileStreak: document.getElementById('profileStreak'),
      profileBestStreak: document.getElementById('profileBestStreak'),
      profileFoundationCompletions: document.getElementById('profileFoundationCompletions'),
      profileUniquePractices: document.getElementById('profileUniquePractices'),
      profileTopReflection: document.getElementById('profileTopReflection'),
      profileTopPractice: document.getElementById('profileTopPractice'),
      foundationNextCategory: document.getElementById('foundationNextCategory'),
      foundationNextTitle: document.getElementById('foundationNextTitle'),
      foundationNextPractice: document.getElementById('foundationNextPractice'),
      foundationNextBody: document.getElementById('foundationNextBody'),
      foundationNextActionBtn: document.getElementById('foundationNextActionBtn'),
      profileInsightsList: document.getElementById('profileInsightsList'),
      profileHistoryList: document.getElementById('profileHistoryList'),
      sessionFeedbackOverlay: document.getElementById('sessionFeedbackOverlay'),
      sessionFeedbackTitle: document.getElementById('sessionFeedbackTitle'),
      sessionFeedbackBody: document.getElementById('sessionFeedbackBody'),
      sessionFeedbackContinueBtn: document.getElementById('sessionFeedbackContinueBtn'),
      profileConsistencyScore: document.getElementById('profileConsistencyScore'),
      profileStabilityScore: document.getElementById('profileStabilityScore'),
      profileDepthScore: document.getElementById('profileDepthScore'),
      profileConsistencyCaption: document.getElementById('profileConsistencyCaption'),
      profileStabilityCaption: document.getElementById('profileStabilityCaption'),
      profileDepthCaption: document.getElementById('profileDepthCaption'),
      journalEditorPanel: document.getElementById('journalEditorPanel'),
      journalEditorMeta: document.getElementById('journalEditorMeta'),
      journalTitleInput: document.getElementById('journalTitleInput'),
      journalBodyInput: document.getElementById('journalBodyInput'),
      journalPromptPanel: document.getElementById('journalPromptPanel'),
      journalPromptToggleBtn: document.getElementById('journalPromptToggleBtn'),
      journalSaveBtn: document.getElementById('journalSaveBtn'),
      journalDeleteBtn: document.getElementById('journalDeleteBtn'),
      journalCancelBtn: document.getElementById('journalCancelBtn'),
      journalList: document.getElementById('journalList'),
      nextPracticeBtn: document.getElementById('nextPracticeBtn'),
      backToFoundationPathBtn: document.getElementById('backToFoundationPathBtn'),
      startSessionBtn: document.getElementById('startSessionBtn'),
      audioStatus: document.getElementById('audioStatus'),
      audioText: document.getElementById('audioText'),
      volumeControl: document.getElementById('volumeControl'),
      volumeSlider: document.querySelector('.volume-slider'),
      bottomNote: document.getElementById('bottomNote'),
      journeyPanel: document.querySelector('.journey-panel'),
      statusRow: document.querySelector('.status-row'),
      sessionOverlay: document.getElementById('sessionOverlay'),
      sessionStage: document.querySelector('.session-stage'),
      sessionCircleShell: document.getElementById('sessionCircleShell'),
      sessionGrainCanvas: document.getElementById('sessionGrainCanvas'),
      sessionInnerCore: document.getElementById('sessionInnerCore'),
      wave1: document.getElementById('wave1'),
      wave2: document.getElementById('wave2'),
      wave3: document.getElementById('wave3'),
      sessionProgressRing: document.getElementById('sessionProgressRing'),
      sessionModeBadge: document.getElementById('sessionModeBadge'),
      sessionStateText: document.getElementById('sessionStateText'),
      sessionStateLabel: document.getElementById('sessionStateLabel'),
      sessionTapHint: document.getElementById('sessionTapHint'),
      sessionTitle: document.getElementById('sessionTitle'),
      sessionSubtitle: document.getElementById('sessionSubtitle'),
      sessionSeekBar: document.getElementById('sessionSeekBar'),
      sessionCurrentTime: document.getElementById('sessionCurrentTime'),
      sessionDuration: document.getElementById('sessionDuration'),
      reflectionScreen: document.getElementById('reflectionScreen'),
      reflectionOptionsTakeover: document.getElementById('reflectionOptionsTakeover'),
      completionScreen: document.getElementById('completionScreen'),
      completionScreenTitle: document.getElementById('completionScreenTitle'),
      completionScreenSubtitle: document.getElementById('completionScreenSubtitle'),
      insightCard: document.getElementById('insightCard'),
      insightTitle: document.getElementById('insightTitle'),
      insightBody: document.getElementById('insightBody')
    };

    const radius = 236;
    const circumference = 2 * Math.PI * radius;
    const warnedUiRefs = new Set();

    function warnMissingUiRef(refName, context = 'ui') {
      const warningKey = `${context}:${refName}`;
      if (warnedUiRefs.has(warningKey)) return;
      warnedUiRefs.add(warningKey);
      console.warn(`[Ataraxia] Missing ${context} ref: ${refName}.`);
    }

    if (el.sessionProgressRing) {
      el.sessionProgressRing.style.strokeDasharray = circumference;
      el.sessionProgressRing.style.strokeDashoffset = circumference;
    } else {
      warnMissingUiRef('sessionProgressRing', 'session');
    }

    let activePractice = 'Introduction';
    let activeDestination = 'Home';
    let appBooted = false;
    let activeSubcategory = 'BreathAwareness';
    let foundationMenuOpen = false;
    let activeTrainTrack = 'Foundation';
    // Train hierarchy state: only one level is rendered at a time to avoid long-scroll disclosure.
    const TRAIN_HIERARCHY_LEVEL = {
      ROOT: 'root',
      FOUNDATION_SUBCATEGORY: 'foundation-subcategory',
      FOUNDATION_MEDITATION_LIST: 'foundation-meditation-list',
      FOUNDATION_LESSON: 'foundation-lesson'
    };
    const TRAIN_VIEW_STATE = {
      LIST: 'list',
      DETAIL: 'detail'
    };
    let activeFoundationSubgroup = 'CoreStability';
    let openFoundationGroup = 'CoreStability';
    let activeFoundationGroup = 'CoreStability';
    let trainHierarchyLevel = TRAIN_HIERARCHY_LEVEL.ROOT;
    let trainViewState = TRAIN_VIEW_STATE.LIST;
    let lastCoreStabilitySubcategory = 'BreathAwareness';
    let currentPlaylist = [];
    let currentTrackIndex = 0;
    let currentAudio = null;
    // Unified session playback state (single source of truth for session UI/audio sync).
    const SESSION_STATE = {
      IDLE: 'idle',
      READY: 'ready',
      PLAYING: 'playing',
      PAUSED: 'paused',
      ENDED: 'ended'
    };

    let sessionState = SESSION_STATE.IDLE;
    let sessionPlaybackPhase = 'idle';
    let singleTapTimeout = null;
    let groundingTimeout = null;
    let transitionTimeout = null;
    let pendingTrackAdvance = false;
    let lessonOverlayTimeout = null;
    let lessonOverlayExitTimeout = null;
    let shownLessonKey = '';
    let welcomeIntroTickRaf = null;
    let welcomeIntroTextTrack = null;
    let welcomeReactiveRaf = null;
    let welcomeParticlesRaf = null;
    let welcomeAudioCtx = null;
    let welcomeAudioAnalyser = null;
    let welcomeAudioSource = null;
    let welcomeAudioData = null;
    let welcomeAudioWaveData = null;
    let welcomeVisualState = {
      rms: 0,
      low: 0,
      mid: 0,
      high: 0,
      presence: 0,
      silence: 1
    };
    let pendingWelcomeIntroTarget = null;
    let welcomeIntroMode = 'welcome';
    let homeNextMove = null;
    let journalDraftId = '';
    let journalEditorMode = 'create';
    let journalPromptPanelOpen = false;
    let activeSessionStartedAt = 0;
    let completedSessionDurationSeconds = 0;
    let sessionLaunchToken = 0;
    let sessionAudioReady = false;
    let pendingPlaybackStart = false;
    let playRequestPending = false;
    let sessionGrainCircle = null;

    // Navigation Controller Section (V2 shell): top-level destination mapping
    const DESTINATION_TABS = ['Home', 'Train', 'Progress', 'Account'];

    function inferDestinationFromPractice(practice = activePractice) {
      if (practice === 'FoundationHome' || practice === 'Foundation' || practice === 'Intuition') return 'Train';
      if (practice === 'Profile') return 'Progress';
      return 'Home';
    }

    function getSelectedPracticeKey() {
      if (activePractice === 'Introduction') return 'Introduction';
      if (activePractice === 'Foundation') return activeSubcategory || 'UnknownFoundationPractice';
      if (activePractice === 'Intuition') return activeSubcategory || 'UnknownIntuitionPractice';
      return activePractice || 'UnknownPractice';
    }

    function logSessionAudioEvent(eventName, details = {}) {
      console.info(`[Ataraxia][SessionAudio] ${eventName}`, {
        practiceKey: getSelectedPracticeKey(),
        ...details
      });
    }

        function loadProgress() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      } catch {
        return {};
      }
    }

    function savePracticeComplete(key) {
      if (!key) return;
      try {
        const progress = loadProgress();
        progress[key] = true;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      } catch {}
    }

    function hasCompletedDisclaimer() {
      try {
        return localStorage.getItem(DISCLAIMER_STORAGE_KEY) === 'true';
      } catch {
        return false;
      }
    }

    function markDisclaimerCompleted() {
      try {
        localStorage.setItem(DISCLAIMER_STORAGE_KEY, 'true');
      } catch {}
    }

    function hasCompletedIntuitionIntro() {
      try {
        return localStorage.getItem(INTUITION_INTRO_STORAGE_KEY) === 'true';
      } catch {
        return false;
      }
    }

    function markIntuitionIntroCompleted() {
      try {
        localStorage.setItem(INTUITION_INTRO_STORAGE_KEY, 'true');
      } catch {}
    }

    function saveReflectionEntry(reflection) {
      if (activePractice === 'Introduction') return;
      if (!reflection) return;

      let existing = [];
      try {
        existing = JSON.parse(localStorage.getItem(REFLECTION_STORAGE_KEY) || '[]');
      } catch {
        existing = [];
      }

      existing.push({
        timestamp: new Date().toISOString(),
        mode: activePractice,
        practice: activeSubcategory || 'Unknown',
        reflection
      });

      localStorage.setItem(REFLECTION_STORAGE_KEY, JSON.stringify(existing));
    }

    function loadSessionHistory() {
      try {
        return JSON.parse(localStorage.getItem(SESSION_HISTORY_STORAGE_KEY) || '[]');
      } catch {
        return [];
      }
    }

    function saveSessionHistory(history) {
      try {
        localStorage.setItem(SESSION_HISTORY_STORAGE_KEY, JSON.stringify(history));
      } catch {}
    }

    function recordCompletedSession(reflection) {
      if (activePractice === 'Introduction') return;

      const history = loadSessionHistory();
      const durationSeconds = Number.isFinite(completedSessionDurationSeconds) && completedSessionDurationSeconds > 0
        ? completedSessionDurationSeconds
        : Number.isFinite(currentAudio?.duration) && currentAudio.duration > 0
        ? Math.round(currentAudio.duration)
        : 0;
      history.push({
        timestamp: new Date().toISOString(),
        mode: activePractice,
        practice: activeSubcategory || 'Unknown',
        reflection: reflection || '',
        durationSeconds
      });

      saveSessionHistory(history.slice(-120));
      completedSessionDurationSeconds = 0;
      activeSessionStartedAt = 0;
    }

    function loadJournalEntries() {
      try {
        const raw = JSON.parse(localStorage.getItem(JOURNAL_STORAGE_KEY) || '[]');
        if (!Array.isArray(raw)) return [];
        return raw.filter((entry) => entry && entry.id && typeof entry.body === 'string');
      } catch {
        return [];
      }
    }

    function saveJournalEntries(entries) {
      try {
        localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
      } catch {}
    }

    function formatJournalDate(iso, withTime = false) {
      if (!iso) return 'Unknown';
      const date = new Date(iso);
      if (Number.isNaN(date.getTime())) return 'Unknown';
      return date.toLocaleString(undefined, withTime
        ? { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }
        : { month: 'short', day: 'numeric', year: 'numeric' });
    }

    function journalPreviewText(body) {
      if (!body) return 'No reflection yet.';
      const compact = body.replace(/\s+/g, ' ').trim();
      if (compact.length <= 120) return compact;
      return compact.slice(0, 120).trimEnd() + '…';
    }

    function findJournalEntryById(id) {
      if (!id) return null;
      return loadJournalEntries().find((entry) => entry.id === id) || null;
    }

    function closeJournalEditor() {
      journalDraftId = '';
      journalEditorMode = 'create';
      journalPromptPanelOpen = false;
      if (!el.journalEditorPanel) return;
      el.journalEditorPanel.classList.add('hidden');
      el.journalPromptPanel.classList.remove('visible');
    }

    function openJournalEditor(mode = 'create', entry = null) {
      if (!el.journalEditorPanel) return;
      journalEditorMode = mode;
      journalDraftId = entry?.id || '';
      journalPromptPanelOpen = false;
      el.journalEditorPanel.classList.remove('hidden');
      el.journalPromptPanel.classList.remove('visible');
      el.journalPromptToggleBtn.textContent = 'Need a prompt?';

      const createdAt = entry?.createdAt ? formatJournalDate(entry.createdAt, true) : '';
      const updatedAt = entry?.updatedAt ? formatJournalDate(entry.updatedAt, true) : '';
      if (mode === 'view' && entry) {
        el.journalEditorMeta.textContent = 'Created: ' + createdAt + (updatedAt && updatedAt !== createdAt ? '\nLast edited: ' + updatedAt : '');
        el.journalTitleInput.value = entry.title || '';
        el.journalBodyInput.value = entry.body || '';
        el.journalTitleInput.readOnly = true;
        el.journalBodyInput.readOnly = true;
        el.journalSaveBtn.textContent = 'Edit Entry';
        el.journalDeleteBtn.style.display = 'inline-flex';
      } else {
        el.journalEditorMeta.textContent = mode === 'edit'
          ? ('Editing entry' + (updatedAt ? '\nLast edited: ' + updatedAt : ''))
          : 'New private reflection';
        el.journalTitleInput.value = entry?.title || '';
        el.journalBodyInput.value = entry?.body || '';
        el.journalTitleInput.readOnly = false;
        el.journalBodyInput.readOnly = false;
        el.journalSaveBtn.textContent = 'Save Entry';
        el.journalDeleteBtn.style.display = mode === 'edit' ? 'inline-flex' : 'none';
        setTimeout(() => el.journalBodyInput.focus(), 0);
      }
    }

    function renderJournalPromptPanel() {
      if (!el.journalPromptPanel) return;
      el.journalPromptPanel.innerHTML = '';
      JOURNAL_PROMPTS.forEach((prompt) => {
        const chip = document.createElement('button');
        chip.className = 'journal-prompt-chip';
        chip.type = 'button';
        chip.textContent = prompt;
        chip.addEventListener('click', () => insertJournalPrompt(prompt));
        el.journalPromptPanel.appendChild(chip);
      });
    }

    function renderJournalList() {
      if (!el.journalList) return;
      const entries = loadJournalEntries().sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      el.journalList.innerHTML = '';

      if (!entries.length) {
        const empty = document.createElement('div');
        empty.className = 'journal-empty';
        empty.innerHTML = '<div class="journal-empty-title">No entries yet.</div><div>Use this space to reflect after practice.</div>';
        const startBtn = document.createElement('button');
        startBtn.className = 'journal-btn';
        startBtn.textContent = 'Start your first entry';
        startBtn.addEventListener('click', startNewJournalEntry);
        empty.appendChild(startBtn);
        el.journalList.appendChild(empty);
        return;
      }

      entries.forEach((entry) => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'journal-item';
        item.dataset.journalId = entry.id;
        const title = entry.title && entry.title.trim() ? entry.title.trim() : 'Untitled Entry';
        const top = document.createElement('div');
        top.className = 'journal-item-top';
        const titleNode = document.createElement('div');
        titleNode.className = 'journal-item-title';
        titleNode.textContent = title;
        const dateNode = document.createElement('div');
        dateNode.className = 'journal-item-date';
        dateNode.textContent = formatJournalDate(entry.createdAt);
        top.appendChild(titleNode);
        top.appendChild(dateNode);
        const preview = document.createElement('div');
        preview.className = 'journal-item-preview';
        preview.textContent = journalPreviewText(entry.body);
        item.appendChild(top);
        item.appendChild(preview);
        item.addEventListener('click', () => viewJournalEntry(entry.id));
        el.journalList.appendChild(item);
      });
    }

    function startNewJournalEntry() {
      openJournalEditor('create');
    }
    window.startNewJournalEntry = startNewJournalEntry;

    function cancelJournalEditor() {
      closeJournalEditor();
    }
    window.cancelJournalEditor = cancelJournalEditor;

    function viewJournalEntry(entryId) {
      const entry = findJournalEntryById(entryId);
      if (!entry) return;
      openJournalEditor('view', entry);
    }

    function toggleJournalPromptPanel() {
      if (!el.journalPromptPanel || journalEditorMode === 'view') return;
      journalPromptPanelOpen = !journalPromptPanelOpen;
      el.journalPromptPanel.classList.toggle('visible', journalPromptPanelOpen);
      el.journalPromptToggleBtn.textContent = journalPromptPanelOpen ? 'Hide prompts' : 'Need a prompt?';
    }
    window.toggleJournalPromptPanel = toggleJournalPromptPanel;

    function insertJournalPrompt(prompt) {
      if (!el.journalBodyInput || !prompt || el.journalBodyInput.readOnly) return;
      const current = el.journalBodyInput.value.trim();
      el.journalBodyInput.value = current ? (current + '\n\n' + prompt + '\n') : (prompt + '\n');
      el.journalBodyInput.focus();
    }

    function saveJournalEntry() {
      if (!el.journalBodyInput || !el.journalTitleInput) return;
      if (journalEditorMode === 'view') {
        const entry = findJournalEntryById(journalDraftId);
        if (!entry) return;
        openJournalEditor('edit', entry);
        return;
      }

      const body = el.journalBodyInput.value.trim();
      const title = el.journalTitleInput.value.trim();
      if (!body) {
        el.journalBodyInput.focus();
        return;
      }

      const entries = loadJournalEntries();
      const now = new Date().toISOString();
      if (journalEditorMode === 'edit' && journalDraftId) {
        const index = entries.findIndex((entry) => entry.id === journalDraftId);
        if (index >= 0) {
          entries[index] = {
            ...entries[index],
            title,
            body,
            updatedAt: now
          };
        }
      } else {
        entries.push({
          id: 'jrnl_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7),
          title,
          body,
          createdAt: now,
          updatedAt: now
        });
      }

      saveJournalEntries(entries);
      closeJournalEditor();
      renderJournalList();
    }
    window.saveJournalEntry = saveJournalEntry;

    function deleteCurrentJournalEntry() {
      if (!journalDraftId) return;
      if (!window.confirm('Delete this journal entry? This cannot be undone.')) return;
      const entries = loadJournalEntries().filter((entry) => entry.id !== journalDraftId);
      saveJournalEntries(entries);
      closeJournalEditor();
      renderJournalList();
    }
    window.deleteCurrentJournalEntry = deleteCurrentJournalEntry;

    function toDayKey(iso) {
      return String(iso || '').slice(0, 10);
    }

    function getDayDifference(aIso, bIso) {
      if (!aIso || !bIso) return 0;
      const a = new Date(toDayKey(aIso) + 'T00:00:00Z').getTime();
      const b = new Date(toDayKey(bIso) + 'T00:00:00Z').getTime();
      if (!Number.isFinite(a) || !Number.isFinite(b)) return 0;
      return Math.round((b - a) / 86400000);
    }

    function getDayWindow(history, days) {
      const since = Date.now() - (days * 86400000);
      return history.filter((entry) => {
        const timestamp = new Date(entry.timestamp || '').getTime();
        return Number.isFinite(timestamp) && timestamp >= since;
      });
    }

    function inferSessionPeriod(iso) {
      const date = new Date(iso || '');
      if (Number.isNaN(date.getTime())) return 'unknown';
      const hour = date.getHours();
      if (hour < 12) return 'morning';
      if (hour < 17) return 'afternoon';
      return 'evening';
    }

    function countPracticeDays(history) {
      return new Set(history.map((entry) => toDayKey(entry.timestamp)).filter(Boolean)).size;
    }

    function formatSessionCountLabel(count) {
      return count + ' time' + (count === 1 ? '' : 's');
    }

    function generateInsightBlocksV1({ history }) {
      const safeHistory = Array.isArray(history) ? history : [];
      if (!safeHistory.length) {
        return [{
          id: 'insight-empty',
          type: 'Weekly Summary',
          text: 'No sessions yet. Start one short practice to begin your weekly summary.'
        }];
      }

      const sessions7 = getDayWindow(safeHistory, 7);
      const sessionCount7 = sessions7.length;
      const practiceDays7 = countPracticeDays(sessions7);
      const practiceCounts7 = {};
      sessions7.forEach((entry) => {
        const key = entry?.practice;
        if (!key) return;
        practiceCounts7[key] = (practiceCounts7[key] || 0) + 1;
      });
      const topPracticeKey = Object.entries(practiceCounts7).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
      const topPracticeLabel = PRACTICE_GUIDANCE[topPracticeKey]?.label || formatPracticeLabel(topPracticeKey);
      const weeklySummaryText = sessionCount7
        ? `You practiced ${formatSessionCountLabel(sessionCount7)} this week${topPracticeLabel ? ` and returned most often to ${topPracticeLabel}.` : '.'}`
        : 'No sessions in the last 7 days. A short reset will restart your weekly pattern.';

      const recentDurations = sessions7
        .map((entry) => Number(entry.durationSeconds) / 60)
        .filter((minutes) => Number.isFinite(minutes) && minutes > 0);
      const avgDuration = recentDurations.length
        ? (recentDurations.reduce((sum, value) => sum + value, 0) / recentDurations.length)
        : 0;

      let patternText = 'Your pattern is still forming. Keep sessions simple and repeatable.';
      if (practiceDays7 >= 4 && avgDuration > 0 && avgDuration <= 10) {
        patternText = 'Your sessions have been short and consistent. That points to habit formation.';
      } else if (practiceDays7 >= 4 && avgDuration > 10) {
        patternText = 'You are showing up consistently with longer sessions. Endurance is building.';
      } else if (practiceDays7 >= 2) {
        patternText = 'You are returning regularly. A fixed session window may strengthen consistency.';
      } else if (sessionCount7 >= 1) {
        patternText = 'Your recent sessions are sparse. Lowering session length can reduce friction.';
      }

      return [
        { id: 'insight-weekly-summary', type: 'Weekly Summary', text: weeklySummaryText },
        { id: 'insight-pattern-mirror', type: 'Pattern Mirror', text: patternText }
      ];
    }

    function buildPatternInsights(history, journalEntries) {
      const insights = [];
      const addInsight = (id, score, text, category) => {
        if (!text) return;
        if (insights.some((item) => item.id === id)) return;
        insights.push({ id, score, text, category });
      };

      if (!history.length) {
        return [{
          id: 'fallback-empty',
          text: 'More sessions will reveal your patterns.',
          score: 1,
          category: 'fallback'
        }];
      }

      const sessions30 = getDayWindow(history, 30);
      const sessions14 = getDayWindow(history, 14);
      const sessions7 = getDayWindow(history, 7);
      const prior14 = history.filter((entry) => {
        const time = new Date(entry.timestamp || '').getTime();
        const now = Date.now();
        return Number.isFinite(time) && time >= (now - 28 * 86400000) && time < (now - 14 * 86400000);
      });

      const recentPracticeDays7 = countPracticeDays(sessions7);
      const priorPracticeDays14 = countPracticeDays(prior14);
      const recentPracticeDays14 = countPracticeDays(sessions14);

      if (recentPracticeDays7 >= 4) {
        addInsight('consistency-steady', 92, 'Your practice rhythm has been steady this week.', 'consistency');
      }

      if (recentPracticeDays14 >= Math.max(4, priorPracticeDays14 + 2)) {
        addInsight('consistency-improving', 88, 'Your consistency has strengthened over the last two weeks.', 'consistency');
      }

      const sessionDays = Array.from(new Set(history.map((entry) => toDayKey(entry.timestamp)).filter(Boolean))).sort();
      const gaps = [];
      for (let i = 1; i < sessionDays.length; i += 1) {
        const gap = getDayDifference(sessionDays[i - 1], sessionDays[i]) - 1;
        if (gap > 0) gaps.push(gap);
      }
      if (gaps.length >= 2) {
        const averageGap = gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length;
        if (averageGap <= 2) {
          addInsight('recovery-quick-return', 86, 'You tend to return quickly after missed days. That shows resilience.', 'recovery');
        } else if (averageGap >= 4) {
          addInsight('recovery-wide-gaps', 62, 'Your practice returns after longer gaps. Re-entry is still part of your rhythm.', 'recovery');
        }
      }

      const periodCounts = { morning: 0, afternoon: 0, evening: 0 };
      sessions30.forEach((entry) => {
        const period = inferSessionPeriod(entry.timestamp);
        if (periodCounts[period] !== undefined) periodCounts[period] += 1;
      });
      const dominantPeriod = Object.entries(periodCounts).sort((a, b) => b[1] - a[1])[0];
      if (dominantPeriod && dominantPeriod[1] >= 4 && dominantPeriod[1] / Math.max(1, sessions30.length) >= 0.5) {
        addInsight(
          'time-dominant',
          84,
          'Your ' + dominantPeriod[0] + ' sessions appear to be your most consistent window.',
          'time_of_day'
        );
      }

      const durations = history
        .map((entry) => Number(entry.durationSeconds) / 60)
        .filter((minutes) => Number.isFinite(minutes) && minutes > 0);
      const recentDurations = getDayWindow(history.filter((entry) => Number(entry.durationSeconds) > 0), 7)
        .map((entry) => Number(entry.durationSeconds) / 60)
        .filter((minutes) => Number.isFinite(minutes) && minutes > 0);
      const priorDurations = history
        .filter((entry) => {
          const time = new Date(entry.timestamp || '').getTime();
          const now = Date.now();
          return Number(entry.durationSeconds) > 0 && Number.isFinite(time) && time >= (now - 14 * 86400000) && time < (now - 7 * 86400000);
        })
        .map((entry) => Number(entry.durationSeconds) / 60)
        .filter((minutes) => Number.isFinite(minutes) && minutes > 0);

      if (recentDurations.length >= 3 && priorDurations.length >= 3) {
        const recentAvg = recentDurations.reduce((sum, value) => sum + value, 0) / recentDurations.length;
        const priorAvg = priorDurations.reduce((sum, value) => sum + value, 0) / priorDurations.length;
        if (recentAvg >= priorAvg + 1.2) {
          addInsight('duration-increasing', 82, 'Your session length has been gradually increasing lately.', 'duration');
        } else if (recentAvg <= priorAvg - 1) {
          addInsight('duration-shortening', 70, 'Shorter sessions seem to be supporting your rhythm right now.', 'duration');
        }
      } else if (durations.length >= 5) {
        const avgDuration = durations.reduce((sum, value) => sum + value, 0) / durations.length;
        if (avgDuration <= 8) {
          addInsight('duration-compact', 66, 'Short sessions appear to be your reliable baseline at the moment.', 'duration');
        }
      }

      const entries30 = journalEntries.filter((entry) => {
        const stamp = new Date(entry.updatedAt || entry.createdAt || '').getTime();
        return Number.isFinite(stamp) && stamp >= (Date.now() - 30 * 86400000);
      });
      if (entries30.length >= 4) {
        const sessionCount30 = Math.max(1, sessions30.length);
        const reflectionRate = entries30.length / sessionCount30;
        if (reflectionRate >= 0.4) {
          addInsight('journal-regular', 80, 'Your reflection habit is becoming more regular.', 'journal');
        }
      }

      const keywordGroups = {
        calm: ['calm', 'ease', 'settled', 'still'],
        focus: ['focus', 'focused', 'attention', 'present'],
        distraction: ['distraction', 'distracted', 'wander', 'wandering', 'restless'],
        clarity: ['clarity', 'clear', 'clearer', 'understand'],
        resistance: ['resistance', 'resist', 'avoid', 'avoiding', 'stuck']
      };
      if (entries30.length >= 3) {
        const themeCounts = { calm: 0, focus: 0, distraction: 0, clarity: 0, resistance: 0 };
        entries30.forEach((entry) => {
          const body = String(entry.body || '').toLowerCase();
          Object.entries(keywordGroups).forEach(([theme, words]) => {
            if (words.some((word) => body.includes(word))) themeCounts[theme] += 1;
          });
        });
        const topTheme = Object.entries(themeCounts).sort((a, b) => b[1] - a[1])[0];
        if (topTheme && topTheme[1] >= 3) {
          const labels = {
            calm: 'Calm and settling themes appear repeatedly in your reflections.',
            focus: 'Focus and presence are recurring themes in your recent reflections.',
            distraction: 'You often notice distraction directly in your reflections. That awareness is part of the practice.',
            clarity: 'Clarity is showing up more often in your recent notes.',
            resistance: 'You are honestly naming resistance in your reflections, which supports awareness.'
          };
          addInsight('journal-theme-' + topTheme[0], 72, labels[topTheme[0]], 'journal_signal');
        }
      }

      const sorted = insights.sort((a, b) => b.score - a.score).slice(0, 3);
      if (!sorted.length) {
        return [{
          id: 'fallback-building',
          text: 'Keep practicing to unlock personal insights.',
          score: 1,
          category: 'fallback'
        }];
      }
      return sorted;
    }

    function getPracticeCategory(practiceKey) {
      if (!practiceKey) return 'Guided Action';
      if (foundationGroups.CoreStability.includes(practiceKey)) return 'Core Stability';
      if (foundationGroups.AppliedAwareness.includes(practiceKey)) return 'Applied Awareness';
      return 'Guided Action';
    }

    function hasPlayablePracticeAudio(practiceKey) {
      const practice = practiceContent.Foundation?.subcategories?.[practiceKey]
        || practiceContent.Intuition?.subcategories?.[practiceKey];
      if (!practice?.audio) return false;
      const playlist = Array.isArray(practice.audio) ? practice.audio : [practice.audio];
      return playlist.some((item) => typeof item === 'string' && item.trim().length > 0);
    }

    function getCompletedPracticeSet(history) {
      const completed = new Set();
      if (!Array.isArray(history)) return completed;

      history.forEach((entry) => {
        const key = typeof entry?.practice === 'string' ? entry.practice.trim() : '';
        if (!key || key === 'Unknown') return;
        if (practiceContent.Foundation?.subcategories?.[key]) {
          completed.add(key);
        }
      });

      return completed;
    }

    function getCompletedSessionCount(history) {
      const safeHistory = Array.isArray(history) ? history : [];
      const completedPractices = getCompletedPracticeSet(safeHistory);
      return safeHistory.filter((entry) => {
        const key = typeof entry?.practice === 'string' ? entry.practice.trim() : '';
        return completedPractices.has(key);
      }).length;
    }

    function getFoundationProgressMetrics(history = loadSessionHistory()) {
      const safeHistory = Array.isArray(history) ? history : [];
      const completedSet = getCompletedPracticeSet(safeHistory);
      const practices = foundationOrder.filter((key) => practiceContent.Foundation?.subcategories?.[key] && hasPlayablePracticeAudio(key));
      const totalPractices = practices.length;
      const completedPractices = practices.filter((key) => completedSet.has(key));
      const completedCount = completedPractices.length;
      const completionPercent = totalPractices ? Math.round((completedCount / totalPractices) * 100) : 0;

      const coreTotal = foundationGroups.CoreStability.filter((key) => practices.includes(key)).length;
      const appliedTotal = foundationGroups.AppliedAwareness.filter((key) => practices.includes(key)).length;
      const coreCompleted = foundationGroups.CoreStability.filter((key) => completedSet.has(key) && practices.includes(key)).length;
      const appliedCompleted = foundationGroups.AppliedAwareness.filter((key) => completedSet.has(key) && practices.includes(key)).length;

      return {
        completedSet,
        practices,
        totalPractices,
        completedCount,
        completionPercent,
        coreCompleted,
        coreTotal,
        appliedCompleted,
        appliedTotal
      };
    }

    function hasCompletedSessionHistory(history = loadSessionHistory()) {
      return getCompletedSessionCount(history) > 0;
    }

    function isFoundationFullyCompleted(history = loadSessionHistory()) {
      const progress = getFoundationProgressMetrics(history);
      return progress.totalPractices > 0 && progress.completedCount >= progress.totalPractices;
    }

    function getDefaultOpeningMode() {
      return hasCompletedSessionHistory() ? 'Profile' : 'Introduction';
    }

    function getTrainingInsights() {
      const history = loadSessionHistory();
      const journalEntries = loadJournalEntries();
      const total = history.length;

      const empty = {
        total: 0,
        streak: 0,
        topReflection: '',
        lastReflection: '',
        topPractice: '',
        assessment: '',
        feedback: '',
        title: 'You are building consistency.',
        body: 'Complete a few sessions and Ataraxia will start noticing what your practice is revealing over time.',
        patternInsights: [{ id: 'fallback-empty', text: 'More sessions will reveal your patterns.' }],
        recommendationKey: 'BreathAwareness',
        recommendationLabel: 'Breath Awareness',
        recommendationReason: 'Start with one clear anchor and repeat it.',
        readiness: 'starting',
        recentTrend: 'forming',
        nextThreeSessions: [
          'Repeat Breath Awareness.',
          'Keep the session short and clean.',
          'Notice one thing clearly and return.'
        ],
        coachState: 'starting',
        insightBlocks: [{
          id: 'insight-empty',
          type: 'Weekly Summary',
          text: 'No sessions yet. Start one short practice to begin your weekly summary.'
        }],
        scores: {
          consistency: 0,
          stability: 0,
          depth: 0,
          consistencyLabel: 'Still building regularity.',
          stabilityLabel: 'Needs more clean returns.',
          depthLabel: 'Early-stage depth.'
        }
      };

      if (!total) return empty;

      const dayKey = (iso) => String(iso || '').slice(0, 10);
      const daySet = new Set(history.map((entry) => dayKey(entry.timestamp)).filter(Boolean));
      let streak = 0;
      let cursor = new Date();
      cursor = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), cursor.getUTCDate()));
      while (daySet.has(cursor.toISOString().slice(0, 10))) {
        streak += 1;
        cursor.setUTCDate(cursor.getUTCDate() - 1);
      }

      const reflectionCounts = {};
      const practiceCounts = {};
      const modeCounts = {};
      history.forEach((entry) => {
        if (entry.reflection) reflectionCounts[entry.reflection] = (reflectionCounts[entry.reflection] || 0) + 1;
        if (entry.practice) practiceCounts[entry.practice] = (practiceCounts[entry.practice] || 0) + 1;
        if (entry.mode) modeCounts[entry.mode] = (modeCounts[entry.mode] || 0) + 1;
      });

      const recent = history.slice(-8);
      const recentReflectionCounts = {};
      const recentPracticeCounts = {};
      recent.forEach((entry) => {
        if (entry.reflection) recentReflectionCounts[entry.reflection] = (recentReflectionCounts[entry.reflection] || 0) + 1;
        if (entry.practice) recentPracticeCounts[entry.practice] = (recentPracticeCounts[entry.practice] || 0) + 1;
      });

      const sortTop = (obj) => Object.entries(obj).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
      const topReflection = sortTop(reflectionCounts);
      const lastReflection = history[history.length - 1]?.reflection || '';
      const topPracticeKey = sortTop(practiceCounts);
      const recentPracticeKey = sortTop(recentPracticeCounts) || topPracticeKey;
      const dominantMode = sortTop(modeCounts);
      const topPracticeLabel = PRACTICE_GUIDANCE[topPracticeKey]?.label || (topPracticeKey ? topPracticeKey.replace(/([A-Z])/g, ' $1').trim() : '');

      const wanderingRate = total ? ((reflectionCounts['Mind wandering'] || 0) / total) : 0;
      const breathRate = total ? ((reflectionCounts['Breath'] || 0) / total) : 0;
      const sensationRate = total ? ((reflectionCounts['Sensations'] || 0) / total) : 0;
      const soundRate = total ? ((reflectionCounts['Sounds'] || 0) / total) : 0;
      const recentWanderingRate = recent.length ? ((recentReflectionCounts['Mind wandering'] || 0) / recent.length) : 0;
      const recentBreathRate = recent.length ? ((recentReflectionCounts['Breath'] || 0) / recent.length) : 0;
      const varietyScore = Object.keys(practiceCounts).length;

      let recentTrend = 'forming';
      if (recent.length >= 4) {
        if (recentBreathRate > breathRate || recentWanderingRate < wanderingRate * 0.8) recentTrend = 'improving';
        else if (recentWanderingRate > wanderingRate * 1.15) recentTrend = 'noisy';
        else recentTrend = 'steady';
      }

      let assessment = 'Your awareness is still taking shape.';
      let readiness = 'starting';
      let coachState = 'starting';
      let recommendationKey = recentPracticeKey || topPracticeKey || 'BreathAwareness';
      let recommendationReason = 'Start with one clear anchor and repeat it.';

      if (wanderingRate >= 0.5 || recentWanderingRate >= 0.55) {
        assessment = 'Attention is still scattering quickly, but your awareness is catching it more often.';
        readiness = 'stabilising';
        coachState = 'unsettled';
        recommendationKey = breathRate >= sensationRate ? 'BreathAwareness' : 'BodyAwareness';
        recommendationReason = 'Right now the priority is reducing noise and strengthening one reliable anchor.';
      } else if (breathRate >= 0.34 || recentBreathRate >= 0.34) {
        assessment = 'Your attention is beginning to stabilise around an anchor.';
        readiness = 'settling';
        coachState = 'anchoring';
        recommendationKey = topPracticeKey || 'BreathAwareness';
        recommendationReason = 'Your returns are getting cleaner. This is the phase where repetition creates depth.';
      } else if (sensationRate >= 0.3) {
        assessment = 'Your awareness is becoming more embodied and grounded.';
        readiness = 'grounded';
        coachState = 'grounding';
        recommendationKey = topPracticeKey || 'BodyAwareness';
        recommendationReason = 'Presence is landing in the body. That makes emotional and mental work steadier.';
      } else if (soundRate >= 0.26 || dominantMode === 'Stability') {
        assessment = 'Your awareness is widening beyond one object without fully collapsing.';
        readiness = 'opening';
        coachState = 'opening';
        recommendationKey = recentPracticeKey || 'DeepFocus';
        recommendationReason = 'You are ready to deepen steadiness while keeping one stable anchor in reserve.';
      }

      if (total >= 12 && wanderingRate < 0.24 && breathRate >= 0.28) {
        coachState = 'deepening';
        readiness = 'settling';
        recommendationKey = varietyScore >= 4 ? 'DeepFocus' : (recentPracticeKey || 'DeepFocus');
        recommendationReason = 'You have enough repetition now to turn steadiness into depth.';
        assessment = 'The baseline is becoming more stable. You are ready to deepen rather than only stabilise.';
      }

      if (recentTrend === 'noisy' && total >= 6) {
        coachState = 'overreaching';
        recommendationKey = breathRate >= sensationRate ? 'BreathAwareness' : 'BodyAwareness';
        recommendationReason = 'Recent sessions are noisier than your baseline. Step back into a simpler practice before pushing wider or harder.';
      }

      const guide = PRACTICE_GUIDANCE[recommendationKey] || PRACTICE_GUIDANCE.BreathAwareness;
      const feedbackParts = [];

      if (topReflection === 'Mind wandering') {
        feedbackParts.push('Catching distraction is progress, not failure. Awareness is showing up in the exact moment you notice drift.');
      } else if (topReflection === 'Breath') {
        feedbackParts.push('Your system is learning to trust one anchor instead of chasing every impulse.');
      } else if (topReflection === 'Sensations') {
        feedbackParts.push('Embodied awareness is growing. That usually means presence is becoming more immediate and less conceptual.');
      } else if (topReflection === 'Sounds') {
        feedbackParts.push('Awareness is learning to stay open without needing to control what appears.');
      }

      if (streak >= 3) {
        feedbackParts.push('You have shown up for ' + streak + ' days in a row. Consistency is no longer separate from the training — it is the training.');
      }

      if (recentTrend === 'improving') {
        feedbackParts.push('Recent sessions suggest cleaner returns and better settling than your baseline.');
      } else if (recentTrend === 'noisy') {
        feedbackParts.push('Recent sessions look more restless than your normal pattern. Reduce complexity and make the next few sessions simpler.');
      } else if (recentTrend === 'steady') {
        feedbackParts.push('Your recent pattern is steady. This is the right time to keep the method stable and let depth accumulate.');
      }

      let nextThreeSessions;
      if (coachState === 'unsettled' || coachState === 'overreaching') {
        nextThreeSessions = [
          'Repeat ' + guide.label + '.',
          'Keep the session shorter and cleaner than usual.',
          'Judge the session by how often you returned, not how calm it felt.'
        ];
      } else if (coachState === 'anchoring' || coachState === 'grounding') {
        nextThreeSessions = [
          'Stay with ' + guide.label + '.',
          'Let the method stay simple and repeatable.',
          'Notice whether returning is becoming easier by the third session.'
        ];
      } else if (coachState === 'opening' || coachState === 'deepening') {
        nextThreeSessions = [
          'Begin with ' + (topPracticeLabel || 'your anchor') + ' for a moment.',
          'Then continue into ' + guide.label + '.',
          'End each session by noticing whether awareness stayed open without losing steadiness.'
        ];
      } else {
        nextThreeSessions = [
          'Repeat ' + guide.label + '.',
          'Keep the next session simple.',
          'Notice one thing clearly and return.'
        ];
      }

      const clampScore = (value) => Math.max(0, Math.min(100, Math.round(value)));
      const recentSessionCount = recent.length;
      const consistencyScore = clampScore((Math.min(streak, 7) / 7) * 55 + (Math.min(recentSessionCount, 8) / 8) * 45);
      const stabilityRaw = ((1 - wanderingRate) * 55) + (breathRate * 25) + (sensationRate * 12) + (soundRate * 8);
      const trendBonus = recentTrend === 'improving' ? 10 : recentTrend === 'noisy' ? -10 : recentTrend === 'steady' ? 4 : 0;
      const stabilityScore = clampScore(stabilityRaw + trendBonus);
      const readinessDepthMap = { starting: 18, stabilising: 28, settling: 52, grounded: 64, opening: 78 };
      const coachDepthBonus = { starting: 0, unsettled: -6, anchoring: 4, grounding: 8, opening: 10, deepening: 18, overreaching: -8 };
      const depthScore = clampScore((readinessDepthMap[readiness] || 20) + (varietyScore * 4) + (total >= 12 ? 8 : total >= 6 ? 4 : 0) + (coachDepthBonus[coachState] || 0));

      const consistencyLabel = consistencyScore >= 80
        ? 'Your practice rhythm is becoming dependable.'
        : consistencyScore >= 55
          ? 'You are building a usable rhythm.'
          : 'Still building regularity.';
      const stabilityLabel = stabilityScore >= 80
        ? 'Attention is returning cleanly and steadily.'
        : stabilityScore >= 55
          ? 'Stability is building, but still fluctuates.'
          : 'Needs more clean returns and simpler anchors.';
      const depthLabel = depthScore >= 80
        ? 'You are ready for deeper or wider work.'
        : depthScore >= 55
          ? 'Depth is forming on top of your base.'
          : 'Early-stage depth. Keep strengthening the base.';

      const title = streak >= 2
        ? (streak + ' days of showing up.')
        : total >= 10
          ? 'Your pattern is becoming clearer.'
          : ('You\'ve completed ' + total + ' session' + (total === 1 ? '' : 's') + '.');

      const trendLabel = recentTrend === 'improving'
        ? 'Improving'
        : recentTrend === 'noisy'
          ? 'More restless lately'
          : recentTrend === 'steady'
            ? 'Steady'
            : 'Still forming';

      const feedback = feedbackParts.join(' ');
      const bodyParts = [
        'What Ataraxia is noticing:',
        assessment,
        '',
        'Pattern emerging: ' + (topReflection || 'Still emerging') + (topPracticeLabel ? ' • Most used practice: ' + topPracticeLabel : ''),
        'Recent direction: ' + trendLabel,
        'Coach state: ' + coachState,
        'Scores — Consistency: ' + consistencyScore + ' • Stability: ' + stabilityScore + ' • Depth: ' + depthScore,
        'Last session: ' + (lastReflection || 'No reflection saved'),
        '',
        'Observations:',
        feedbackParts.join('\n\n')
      ];

      return {
        total,
        streak,
        topReflection,
        lastReflection,
        topPractice: topPracticeLabel,
        assessment,
        feedback,
        title,
        body: bodyParts.join('\n'),
        recommendationLabel: guide.label,
        recommendationKey,
        recommendationReason,
        insightBlocks: generateInsightBlocksV1({ history }),
        patternInsights: buildPatternInsights(history, journalEntries),
        readiness,
        recentTrend,
        nextThreeSessions,
        coachState,
        scores: {
          consistency: consistencyScore,
          stability: stabilityScore,
          depth: depthScore,
          consistencyLabel,
          stabilityLabel,
          depthLabel
        }
      };
    }

    function getAccountProgressStats(history = loadSessionHistory()) {
      const safeHistory = Array.isArray(history) ? history.filter((entry) => entry && entry.timestamp) : [];
      const dayKeys = Array.from(new Set(safeHistory.map((entry) => String(entry.timestamp).slice(0, 10)).filter(Boolean))).sort();
      const daySet = new Set(dayKeys);

      let currentStreak = 0;
      let cursor = new Date();
      cursor = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), cursor.getUTCDate()));
      while (daySet.has(cursor.toISOString().slice(0, 10))) {
        currentStreak += 1;
        cursor.setUTCDate(cursor.getUTCDate() - 1);
      }

      let bestStreak = 0;
      let runningStreak = 0;
      let previousDay = null;
      dayKeys.forEach((day) => {
        if (!previousDay) {
          runningStreak = 1;
          bestStreak = 1;
          previousDay = day;
          return;
        }
        const prior = new Date(previousDay + 'T00:00:00.000Z');
        const current = new Date(day + 'T00:00:00.000Z');
        const gapDays = Math.round((current.getTime() - prior.getTime()) / 86400000);
        runningStreak = gapDays === 1 ? runningStreak + 1 : 1;
        if (runningStreak > bestStreak) bestStreak = runningStreak;
        previousDay = day;
      });

      const totalDurationSeconds = safeHistory.reduce((sum, entry) => {
        const durationSeconds = Number(entry.durationSeconds);
        return Number.isFinite(durationSeconds) && durationSeconds > 0 ? sum + durationSeconds : sum;
      }, 0);
      const totalMinutes = Math.round(totalDurationSeconds / 60);
      const completedFoundationCount = safeHistory.filter((entry) => foundationOrder.includes(entry.practice)).length;
      const uniquePractices = new Set(safeHistory.map((entry) => entry.practice).filter(Boolean)).size;

      const completedByMode = {};
      safeHistory.forEach((entry) => {
        const modeKey = entry.mode || 'Unknown';
        completedByMode[modeKey] = (completedByMode[modeKey] || 0) + 1;
      });

      return {
        totalSessions: safeHistory.length,
        totalMinutes,
        currentStreak,
        bestStreak,
        completedFoundationCount,
        uniquePractices,
        completedByMode
      };
    }

    function getModeConfig() {
      if (activePractice === 'Foundation') return practiceContent.Foundation;
      if (activePractice === 'Intuition') return practiceContent.Intuition;
      return null;
    }

    function getSubcategoryData() {
      if (activePractice === 'Foundation') return practiceContent.Foundation.subcategories[activeSubcategory] || null;
      if (activePractice === 'Intuition') return practiceContent.Intuition.subcategories[activeSubcategory] || null;
      return null;
    }

    function getFoundationSkillLabel(practiceKey = '') {
      return FOUNDATION_SKILL_IDENTITIES[practiceKey] || '';
    }

    function getSkillLabel(practiceKey = '', practiceMode = activePractice) {
      if (practiceMode === 'Intuition') return INTUITION_SKILL_IDENTITIES[practiceKey] || '';
      return FOUNDATION_SKILL_IDENTITIES[practiceKey] || '';
    }

    function getPracticeCompletionLoop(practiceKey = '', practiceMode = activePractice) {
      const completionCopy = practiceMode === 'Intuition'
        ? (INTUITION_COMPLETION_LOOP[practiceKey] || {})
        : (FOUNDATION_COMPLETION_LOOP[practiceKey] || {});
      const skillLabel = getSkillLabel(practiceKey, practiceMode);
      const normalizedSkill = skillLabel ? skillLabel.charAt(0).toLowerCase() + skillLabel.slice(1) : '';
      return {
        acknowledgment: 'Well done.',
        trained: completionCopy.trained || (normalizedSkill ? `You trained ${normalizedSkill}.` : 'You trained today.'),
        why: completionCopy.why || 'This strengthens how quickly you can return to steadiness.'
      };
    }

    function formatSkillBadge(skillLabel = '') {
      return skillLabel ? `Skill · ${skillLabel}` : '';
    }

    function currentViewData() {
      if (activePractice === 'Welcome') return practiceContent.Welcome;
      if (activePractice === 'Introduction') return practiceContent.Introduction;
      if (activePractice === 'FoundationHome') return practiceContent.FoundationHome;
      if (activePractice === 'Profile') return practiceContent.Profile;
      return getSubcategoryData() || practiceContent.Introduction;
    }

    function buildPlaylist() {
      if (activePractice === 'Welcome') return [];
      if (activePractice === 'Introduction') return practiceContent.Introduction.audio;
      const sub = getSubcategoryData();
      if (!sub?.audio) return [];
      return Array.isArray(sub.audio) ? sub.audio : [sub.audio];
    }

    function isLegacyMultiTrackSession() {
      return currentPlaylist.length > 1;
    }

    function formatTimeDisplay(seconds) {
      if (!Number.isFinite(seconds)) return '00:00';
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function getCurrentVolume() {
      return Number(el.volumeSlider?.value || 70) / 100;
    }

    function setAudioStatus(text, isPlaying = false) {
      if (!el.audioText || !el.audioStatus) return;
      el.audioText.textContent = text;
      el.audioStatus.classList.toggle('playing', isPlaying);
    }

    function refreshCurrentMode() {
      initAudio();
      syncUI();
    }

    function clearSessionTimers() {
      clearTimeout(singleTapTimeout);
      singleTapTimeout = null;
      clearTimeout(groundingTimeout);
      clearTimeout(transitionTimeout);
      pendingTrackAdvance = false;
    }

    function openWelcomeIntroOverlay() {
      document.body.classList.add('session-active');
      el.welcomeIntroOverlay.classList.add('active');
    }

    function closeWelcomeIntroOverlay() {
      el.welcomeIntroOverlay.classList.remove('active');
      document.body.classList.remove('session-active');
    }

    function resetWelcomeIntroUI() {
      welcomeIntroMode = 'welcome';
      if (el.welcomeIntroKicker) el.welcomeIntroKicker.textContent = 'Before You Begin';
      el.welcomeIntroState.textContent = DEFAULT_WELCOME_STATE;
      el.welcomeIntroLabel.textContent = DEFAULT_WELCOME_LABEL;
      el.welcomeIntroCaption.textContent = DEFAULT_WELCOME_CAPTION;
      if (el.welcomeIntroActionBtn) {
        el.welcomeIntroActionBtn.classList.add('hidden');
        el.welcomeIntroActionBtn.textContent = 'Begin Introduction';
        el.welcomeIntroActionBtn.onclick = null;
      }
      if (el.welcomeIntroSkipBtn) {
        el.welcomeIntroSkipBtn.classList.remove('hidden');
        el.welcomeIntroSkipBtn.textContent = 'Skip';
      }
      welcomeVisualState = {
        rms: 0,
        low: 0,
        mid: 0,
        high: 0,
        presence: 0,
        silence: 1
      };
    }

    function ensureWelcomeIntroAudioGraph() {
      if (!el.welcomeIntroAudio || welcomeAudioAnalyser || typeof AudioContext === 'undefined') return;
      try {
        welcomeAudioCtx = welcomeAudioCtx || new AudioContext();
        if (welcomeAudioCtx.state === 'suspended') {
          welcomeAudioCtx.resume().catch(() => {});
        }
        if (!welcomeAudioSource) {
          welcomeAudioSource = welcomeAudioCtx.createMediaElementSource(el.welcomeIntroAudio);
        }
        welcomeAudioAnalyser = welcomeAudioCtx.createAnalyser();
        welcomeAudioAnalyser.fftSize = 1024;
        welcomeAudioAnalyser.smoothingTimeConstant = 0.72;
        welcomeAudioData = new Uint8Array(welcomeAudioAnalyser.frequencyBinCount);
        welcomeAudioWaveData = new Uint8Array(welcomeAudioAnalyser.fftSize);
        welcomeAudioSource.connect(welcomeAudioAnalyser);
        welcomeAudioAnalyser.connect(welcomeAudioCtx.destination);
      } catch (error) {
        console.warn('Welcome audio analyser unavailable.', error);
        welcomeAudioAnalyser = null;
        welcomeAudioData = null;
        welcomeAudioWaveData = null;
      }
    }
    

    function stopWelcomeParticles() {
      if (welcomeParticlesRaf) {
        cancelAnimationFrame(welcomeParticlesRaf);
        welcomeParticlesRaf = null;
      }
      const canvas = el.welcomeIntroParticles;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function startWelcomeParticles() {
      const canvas = el.welcomeIntroParticles;
      if (!canvas) return;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const minSide = Math.max(1, Math.min(w, h));
      const cx = w * 0.5;
      const cy = h * 0.37;
      const outerRadius = Math.min(w * 0.38, minSide * 0.34);
      const innerRadius = outerRadius * 0.32;
      const radiusBand = Math.max(1, outerRadius - innerRadius);
      const mobileDensityFactor = Math.min(1, minSide / 430);
      const particleCount = Math.max(2500, Math.min(4500, Math.floor(2500 + (mobileDensityFactor * 2000))));

      // particle-only grain vortex: dense ring body, empty center, soft edge scatter
      const particles = Array.from({ length: particleCount }, () => {
        const t = Math.random();
        const ringBias = Math.pow(t, 0.55);
        const baseRadius = innerRadius + (ringBias * radiusBand);
        const scatter = (Math.random() - 0.5) * outerRadius * 0.12;
        const baseAlpha = 0.25 + Math.random() * 0.65;
        const bodyBias = 0.72 + (ringBias * 0.45);
        return {
          baseRadius,
          scatter,
          angle: Math.random() * Math.PI * 2,
          angularDrift: (Math.random() - 0.5) * (0.00005 + (Math.random() * 0.0002)),
          radialDriftAmp: 0.5 + Math.random() * 1.5,
          radialDriftFreq: 0.25 + Math.random() * 0.4,
          radialDriftPhase: Math.random() * Math.PI * 2,
          alphaBase: Math.min(0.9, baseAlpha * bodyBias),
          size: 0.35 + Math.random() * 0.8,
          breatheWeight: 0.55 + Math.random() * 0.5,
          pulsePhase: Math.random() * Math.PI * 2
        };
      });

      const visual = {
        bodyScale: 1,
        edgeActivity: 0,
        shimmer: 0,
        inwardPull: 0,
        settle: 1,
        voiceMotion: 0
      };

      stopWelcomeParticles();

      const tick = () => {
        const {
          rms = 0,
          low = 0,
          mid = 0,
          high = 0,
          presence = 0,
          silence = 1
        } = welcomeVisualState || {};
        const t = performance.now();
        const breath = (Math.sin(t * 0.0007) + 1) / 2;
        const baseBreathScale = 0.965 + (breath * 0.05);
        const targetBodyScale = baseBreathScale + (rms * 0.09) + (mid * 0.05) + (low * 0.03);
        const targetEdgeActivity = (mid * 0.55) + (high * 0.45);
        const targetShimmer = high * (0.55 + (presence * 0.45));
        const targetInwardPull = (low * 1.45) + ((1 - breath) * 0.85) + (silence * 0.65);
        const targetSettle = 1 - (presence * 0.5) + (silence * 0.22);
        const targetVoiceMotion = (mid * 0.75) + (rms * 0.45);
        visual.bodyScale += (targetBodyScale - visual.bodyScale) * 0.08;
        visual.edgeActivity += (targetEdgeActivity - visual.edgeActivity) * 0.1;
        visual.shimmer += (targetShimmer - visual.shimmer) * 0.15;
        visual.inwardPull += (targetInwardPull - visual.inwardPull) * 0.06;
        visual.settle += (targetSettle - visual.settle) * 0.08;
        visual.voiceMotion += (targetVoiceMotion - visual.voiceMotion) * 0.11;

        ctx.fillStyle = 'rgba(0,0,0,1)';
        ctx.fillRect(0, 0, w, h);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const edgeFactor = Math.pow(Math.min(1, Math.max(0, (p.baseRadius - innerRadius) / radiusBand)), 1.2);
          p.angle += p.angularDrift * (0.55 + (visual.edgeActivity * 1.05));
          const drift = Math.sin((t * 0.001 * p.radialDriftFreq) + p.radialDriftPhase) * p.radialDriftAmp;
          const pulse = Math.sin((t * 0.00055 * (0.85 + visual.voiceMotion)) + p.pulsePhase) * (0.52 + (visual.edgeActivity * 0.45));
          const shimmerWave = Math.sin((t * 0.0023) + (p.pulsePhase * 1.6)) * (visual.shimmer * 0.9) * (0.2 + (edgeFactor * 0.8));
          const bodyDrift = Math.sin((t * 0.00042) + p.radialDriftPhase) * (low * 1.8);
          let radius = ((p.baseRadius + p.scatter + drift + pulse + shimmerWave + bodyDrift) * visual.bodyScale) - visual.inwardPull;
          if (radius <= innerRadius) continue;

          const x = cx + Math.cos(p.angle) * radius;
          const y = cy + Math.sin(p.angle) * radius;
          const alphaBoost = (0.82 + (visual.voiceMotion * 0.22) + (visual.shimmer * 0.18)) * visual.settle;
          const alpha = Math.min(0.9, p.alphaBase * alphaBoost * p.breatheWeight * (0.9 + (edgeFactor * visual.edgeActivity * 0.2)));
          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.fill();
        }

        welcomeParticlesRaf = requestAnimationFrame(tick);
      };

      welcomeParticlesRaf = requestAnimationFrame(tick);
    }

    function stopWelcomeReactiveTicker() {
      if (welcomeReactiveRaf) {
        cancelAnimationFrame(welcomeReactiveRaf);
        welcomeReactiveRaf = null;
      }
      welcomeVisualState = {
        rms: 0,
        low: 0,
        mid: 0,
        high: 0,
        presence: 0,
        silence: 1
      };
    }

    function startWelcomeReactiveTicker() {
      if (!welcomeAudioAnalyser || !welcomeAudioData || !welcomeAudioWaveData) return;
      stopWelcomeReactiveTicker();
      const smoothed = {
        rms: 0,
        low: 0,
        mid: 0,
        high: 0,
        presence: 0
      };
      const applySmooth = (current, target) => {
        const attack = 0.24;
        const release = 0.06;
        return current + ((target - current) * (target > current ? attack : release));
      };
      const tick = () => {
        if (!el.welcomeIntroAudio || el.welcomeIntroAudio.paused || el.welcomeIntroAudio.ended) {
          welcomeReactiveRaf = null;
          welcomeVisualState = {
            rms: 0,
            low: 0,
            mid: 0,
            high: 0,
            presence: 0,
            silence: 1
          };
          return;
        }
        welcomeAudioAnalyser.getByteFrequencyData(welcomeAudioData);
        welcomeAudioAnalyser.getByteTimeDomainData(welcomeAudioWaveData);
        const sampleCount = welcomeAudioWaveData.length || 1;
        let squareSum = 0;
        for (let i = 0; i < sampleCount; i += 1) {
          const centered = (welcomeAudioWaveData[i] - 128) / 128;
          squareSum += centered * centered;
        }
        const rmsRaw = Math.sqrt(squareSum / sampleCount);
        const normalizedRms = Math.max(0, Math.min(1, (rmsRaw - 0.012) / 0.22));

        const bandAvg = (start, end) => {
          const cappedStart = Math.max(0, Math.min(welcomeAudioData.length - 1, start));
          const cappedEnd = Math.max(cappedStart + 1, Math.min(welcomeAudioData.length, end));
          let total = 0;
          for (let i = cappedStart; i < cappedEnd; i += 1) total += welcomeAudioData[i];
          return (total / Math.max(1, cappedEnd - cappedStart)) / 255;
        };
        const lowRaw = bandAvg(2, 18);
        const midRaw = bandAvg(18, 72);
        const highRaw = bandAvg(72, 160);
        const presenceRaw = Math.max(normalizedRms, (midRaw * 0.75) + (lowRaw * 0.18) + (highRaw * 0.07));
        const silenceGate = 0.04;
        const gatedPresence = presenceRaw < silenceGate ? 0 : (presenceRaw - silenceGate) / (1 - silenceGate);

        smoothed.rms = applySmooth(smoothed.rms, normalizedRms);
        smoothed.low = applySmooth(smoothed.low, lowRaw);
        smoothed.mid = applySmooth(smoothed.mid, midRaw);
        smoothed.high = applySmooth(smoothed.high, highRaw);
        smoothed.presence = applySmooth(smoothed.presence, gatedPresence);

        const silence = 1 - Math.min(1, smoothed.presence * 1.18);
        welcomeVisualState = {
          rms: smoothed.rms,
          low: smoothed.low,
          mid: smoothed.mid,
          high: smoothed.high,
          presence: smoothed.presence,
          silence
        };
        welcomeReactiveRaf = requestAnimationFrame(tick);
      };
      welcomeReactiveRaf = requestAnimationFrame(tick);
    }

    function updateSeekUI() {
      if (!el.sessionSeekBar) warnMissingUiRef('sessionSeekBar', 'session');
      if (!el.sessionCurrentTime) warnMissingUiRef('sessionCurrentTime', 'session');
      if (!el.sessionDuration) warnMissingUiRef('sessionDuration', 'session');
      if (!el.sessionProgressRing) warnMissingUiRef('sessionProgressRing', 'session');

      if (!currentAudio) {
        if (el.sessionSeekBar) el.sessionSeekBar.value = 0;
        if (el.sessionCurrentTime) el.sessionCurrentTime.textContent = '00:00';
        if (el.sessionDuration) el.sessionDuration.textContent = '00:00';
        if (el.sessionProgressRing) el.sessionProgressRing.style.strokeDashoffset = circumference;
        return;
      }
      const duration = Number.isFinite(currentAudio.duration) ? currentAudio.duration : 0;
      const current = Number.isFinite(currentAudio.currentTime) ? currentAudio.currentTime : 0;
      const progress = duration > 0 ? (current / duration) * 100 : 0;
      if (el.sessionSeekBar) el.sessionSeekBar.value = progress;
      if (el.sessionCurrentTime) el.sessionCurrentTime.textContent = formatTimeDisplay(current);
      if (el.sessionDuration) el.sessionDuration.textContent = formatTimeDisplay(duration);
      if (el.sessionProgressRing) el.sessionProgressRing.style.strokeDashoffset = circumference * (1 - progress / 100);
    }

    function seekToPercent(percent) {
      if (!currentAudio || !Number.isFinite(currentAudio.duration) || currentAudio.duration <= 0) return;
      currentAudio.currentTime = Math.max(0, Math.min(currentAudio.duration, currentAudio.duration * (percent / 100)));
      updateSeekUI();
    }

    function detachAudio() {
      if (!currentAudio) return;
      currentAudio.pause();
      currentAudio.ontimeupdate = null;
      currentAudio.onended = null;
      currentAudio.onpause = null;
      currentAudio.onloadedmetadata = null;
      currentAudio.removeAttribute('src');
      currentAudio.load();
      currentAudio = null;
    }

    function preloadNextTrack() {
      const nextSrc = currentPlaylist[currentTrackIndex + 1];
      if (!nextSrc) return;
      const preloader = new Audio();
      preloader.preload = 'auto';
      preloader.src = resolveAssetPath(nextSrc);
    }

    function setCircleState(state) {
      if (!el.sessionCircleShell) {
        warnMissingUiRef('sessionCircleShell', 'session');
        return;
      }
      el.sessionCircleShell.classList.remove('state-idle', 'state-grounding', 'state-playing', 'state-paused', 'state-ending', 'state-complete', 'stability-mode', 'running');
      if (foundationGroups.AppliedAwareness.includes(activeSubcategory)) el.sessionCircleShell.classList.add('stability-mode');
      if (state) el.sessionCircleShell.classList.add(`state-${state}`);
      if (state === 'playing' || state === 'ending') el.sessionCircleShell.classList.add('running');
    }

    function updateMenuState() {
      if (el.foundationMenuBtn) el.foundationMenuBtn.classList.toggle('active', activeTrainTrack === 'Foundation');
      if (el.intuitionMenuBtn) el.intuitionMenuBtn.classList.toggle('active', activeTrainTrack === 'Intuition');
      if (el.flowMenuBtn) el.flowMenuBtn.classList.toggle('active', activeTrainTrack === 'Flow');
      if (el.foundationSubsection) el.foundationSubsection.classList.toggle('visible', activeTrainTrack === 'Foundation' && (foundationMenuOpen || activePractice === 'Foundation' || activePractice === 'FoundationHome'));
      if (activePractice === 'Foundation') {
        openFoundationGroup = activeFoundationGroup;
      }
      if (el.coreStabilityBtn) el.coreStabilityBtn.classList.toggle('active', openFoundationGroup === 'CoreStability');
      if (el.appliedAwarenessBtn) el.appliedAwarenessBtn.classList.toggle('active', openFoundationGroup === 'AppliedAwareness');
      if (el.coreStabilityList) el.coreStabilityList.classList.toggle('visible', foundationMenuOpen && openFoundationGroup === 'CoreStability');
      if (el.appliedAwarenessList) el.appliedAwarenessList.classList.toggle('visible', foundationMenuOpen && openFoundationGroup === 'AppliedAwareness');

      foundationOrder.forEach((key) => {
        const btn = document.getElementById(`${key}Btn`);
        if (btn) btn.classList.toggle('active', activeSubcategory === key);
      });
    }

    function updateTopNavigationShell() {
      // Major Screen Section: V2 destination shell containers
      DESTINATION_TABS.forEach((tab) => {
        const button = el[`${tab.toLowerCase()}TabBtn`];
        if (button) button.classList.toggle('active', activeDestination === tab);
      });

      const topLevelScreens = [
        { node: el.homeScreen, destination: 'Home' },
        { node: el.trainScreen, destination: 'Train' },
        { node: el.progressScreen, destination: 'Progress' },
        { node: el.accountScreen, destination: 'Account' }
      ];

      topLevelScreens.forEach(({ node, destination }) => {
        if (!node) return;
        const isActive = activeDestination === destination;
        node.classList.toggle('hidden', !isActive);
        node.toggleAttribute('hidden', !isActive);
        node.setAttribute('aria-hidden', String(!isActive));
        if (!isActive) node.setAttribute('inert', '');
        else node.removeAttribute('inert');
      });
      if (el.navMenuBtn) el.navMenuBtn.style.visibility = activeDestination === 'Train' ? 'visible' : 'hidden';
    }

    function updateJourneyButtons() {
      const inTrainMode = activeDestination === 'Train';
      const inSessionView = inTrainMode && (activePractice === 'Foundation' || activePractice === 'Intuition');
      const inFoundationDetailView = inSessionView
        && activePractice === 'Foundation'
        && trainHierarchyLevel === TRAIN_HIERARCHY_LEVEL.FOUNDATION_LESSON;
      const selectedPracticeIndex = foundationOrder.indexOf(activeSubcategory);
      const hasPreviousPractice = selectedPracticeIndex > 0;
      const hasNextPractice = selectedPracticeIndex >= 0 && selectedPracticeIndex < foundationOrder.length - 1;

      const shouldShowFoundationHomePanel = inTrainMode && !inSessionView;
      if (el.foundationHomePanel) {
        el.foundationHomePanel.classList.toggle('hidden', !shouldShowFoundationHomePanel);
        el.foundationHomePanel.toggleAttribute('hidden', !shouldShowFoundationHomePanel);
      }
      if (el.profilePagePanel) el.profilePagePanel.classList.toggle('hidden', activeDestination !== 'Progress');

      // Keep V2 session CTA scoped to Train only.
      if (el.journeyPanel) el.journeyPanel.classList.toggle('hidden', !inTrainMode);

      if (!el.startSessionBtn) {
        warnMissingUiRef('startSessionBtn', 'session');
        return;
      }

      // Keep only one primary CTA on Home. Train owns this control for practice launches.
      el.startSessionBtn.style.display = inSessionView ? 'inline-flex' : 'none';
      const current = currentViewData();
      el.startSessionBtn.textContent = current.startLabel || 'Start Session';
      const canStartSelectedPractice = !((activePractice === 'Foundation' || activePractice === 'Intuition') && !hasPlayablePracticeAudio(activeSubcategory));
      el.startSessionBtn.disabled = !canStartSelectedPractice;
      el.startSessionBtn.classList.toggle('disabled', !canStartSelectedPractice);

      if (el.trainPracticeNavRow) {
        el.trainPracticeNavRow.classList.toggle('hidden', !inFoundationDetailView);
        el.trainPracticeNavRow.toggleAttribute('hidden', !inFoundationDetailView);
      }
      if (el.previousPracticeBtn) {
        el.previousPracticeBtn.disabled = !hasPreviousPractice;
        el.previousPracticeBtn.classList.toggle('disabled', !hasPreviousPractice);
      }
      if (el.nextPracticeBtn) {
        el.nextPracticeBtn.disabled = !hasNextPractice;
        el.nextPracticeBtn.classList.toggle('disabled', !hasNextPractice);
      }
    }

    function updateTrainViewVisibility() {
      if (activeDestination !== 'Train') return;
      const isDetailView = (activePractice === 'Foundation' || activePractice === 'Intuition')
        && trainHierarchyLevel === TRAIN_HIERARCHY_LEVEL.FOUNDATION_LESSON
        && Boolean(activeSubcategory);
      const isFoundationDetailView = isDetailView && activePractice === 'Foundation';
      const trainSkillCard = el.trainPracticeCopyLabel?.closest('.practice-copy');

      if (el.foundationHomePanel) {
        el.foundationHomePanel.classList.toggle('hidden', isDetailView);
        el.foundationHomePanel.toggleAttribute('hidden', isDetailView);
      }

      if (trainSkillCard) {
        trainSkillCard.classList.toggle('hidden', !isDetailView);
        trainSkillCard.toggleAttribute('hidden', !isDetailView);
      }

      if (el.trainLessonCard) {
        el.trainLessonCard.classList.add('hidden');
        el.trainLessonCard.toggleAttribute('hidden', true);
      }

      if (el.trainHierarchyBackBtn) {
        const showHierarchyBackButton = !isFoundationDetailView && trainHierarchyLevel !== TRAIN_HIERARCHY_LEVEL.ROOT;
        el.trainHierarchyBackBtn.classList.toggle('hidden', !showHierarchyBackButton);
        el.trainHierarchyBackBtn.toggleAttribute('hidden', !showHierarchyBackButton);
      }

      if (el.trainDetailBackBtn) {
        el.trainDetailBackBtn.classList.add('hidden');
        el.trainDetailBackBtn.toggleAttribute('hidden', true);
      }
    }

    function hideLessonOverlayImmediate() {
      clearTimeout(lessonOverlayTimeout);
      clearTimeout(lessonOverlayExitTimeout);
      if (!el.lessonOverlay) {
        warnMissingUiRef('lessonOverlay');
        return;
      }
      el.lessonOverlay.classList.remove('active', 'exit');
    }

    function getActiveHeroElements() {
      if (activeDestination === 'Train') {
        return {
          eyebrow: el.trainEyebrowText,
          title: el.trainHeroTitle,
          subtitle: el.trainHeroSubtitle,
          copyLabel: el.trainPracticeCopyLabel,
          copyTitle: el.trainPracticeCopyTitle,
          copyBody: el.trainPracticeCopyBody,
          lessonCard: el.trainLessonCard,
          lessonTitle: el.trainLessonTitle,
          lessonBody: el.trainLessonBody
        };
      }
      return {
        eyebrow: el.eyebrowText,
        title: el.heroTitle,
        subtitle: el.heroSubtitle,
        copyLabel: el.practiceCopyLabel,
        copyTitle: el.practiceCopyTitle,
        copyBody: el.practiceCopyBody,
        lessonCard: el.lessonCard,
        lessonTitle: el.lessonTitle,
        lessonBody: el.lessonBody
      };
    }

    function maybeShowLessonOverlay(data) {
      const lessonKey = `${activePractice}:${activeSubcategory}:${data.lesson || ''}`;
      if (!data.lesson || shownLessonKey === lessonKey) return;
      shownLessonKey = lessonKey;
      hideLessonOverlayImmediate();
      if (!el.lessonOverlay) {
        warnMissingUiRef('lessonOverlay');
        return;
      }
      el.lessonOverlay.classList.add('active');
      lessonOverlayTimeout = setTimeout(() => {
        el.lessonOverlay.classList.add('exit');
        const activeLessonCard = activeDestination === 'Train' ? el.trainLessonCard : el.lessonCard;
        if (activeLessonCard) activeLessonCard.classList.add('highlight');
        else warnMissingUiRef(activeDestination === 'Train' ? 'trainLessonCard' : 'lessonCard');
        lessonOverlayExitTimeout = setTimeout(() => {
          el.lessonOverlay.classList.remove('active', 'exit');
          setTimeout(() => {
            if (activeLessonCard) activeLessonCard.classList.remove('highlight');
          }, 250);
        }, 560);
      }, 4400);
    }

    function updateContentUI() {
      let data = currentViewData();
      if (activePractice === 'FoundationHome' && TRAIN_SECTION_CONTENT[activeTrainTrack]) {
        data = {
          ...data,
          ...TRAIN_SECTION_CONTENT[activeTrainTrack]
        };
      }
      const view = getActiveHeroElements();
      const skillLabel = (activePractice === 'Foundation' || activePractice === 'Intuition')
        ? (data.skillLabel || getSkillLabel(activeSubcategory, activePractice))
        : '';
      const skillBadge = formatSkillBadge(skillLabel);
      if (el.sessionCircleShell) el.sessionCircleShell.classList.toggle('welcome-disclaimer', activePractice === 'Welcome');
      else warnMissingUiRef('sessionCircleShell', 'session');
      if (view.eyebrow) view.eyebrow.textContent = data.eyebrow;
      if (view.title) view.title.innerHTML = data.hero;
      if (view.subtitle) view.subtitle.innerHTML = (data.subtitle || []).map((s) => `<span>${s}</span>`).join('');
      if (view.copyLabel) view.copyLabel.textContent = skillBadge || data.copyLabel;
      if (view.copyTitle) view.copyTitle.textContent = data.copyTitle;
      if (view.copyBody) view.copyBody.textContent = data.copyBody;
      if (el.sessionModeBadge) el.sessionModeBadge.textContent = skillBadge || data.badge || data.eyebrow;
      else warnMissingUiRef('sessionModeBadge', 'session');
      if (el.sessionTitle) el.sessionTitle.innerHTML = data.hero;
      else warnMissingUiRef('sessionTitle', 'session');
      if (el.sessionSubtitle) el.sessionSubtitle.innerHTML = (data.subtitle || []).map((s) => `<span>${s}</span>`).join('');
      else warnMissingUiRef('sessionSubtitle', 'session');

      const shouldShowTrainLessonCard = false;

      if (data.lesson && shouldShowTrainLessonCard) {
        if (view.lessonCard) view.lessonCard.style.display = 'block';
        if (view.lessonTitle) view.lessonTitle.textContent = data.copyTitle || 'Before you begin';
        if (view.lessonBody) view.lessonBody.textContent = data.lesson;
        el.lessonOverlayTitle.textContent = data.copyTitle || 'Before you begin';
        el.lessonOverlayBody.textContent = data.lesson;
        maybeShowLessonOverlay(data);
      } else {
        if (el.lessonCard) el.lessonCard.style.display = 'none';
        if (el.trainLessonCard) el.trainLessonCard.style.display = 'none';
        if (el.lessonTitle) el.lessonTitle.textContent = 'Before you begin';
        if (el.lessonBody) el.lessonBody.textContent = '';
        if (el.trainLessonTitle) el.trainLessonTitle.textContent = 'Before you begin';
        if (el.trainLessonBody) el.trainLessonBody.textContent = '';
        hideLessonOverlayImmediate();
      }
    }

    function updateAudioStatus() {
      if (activePractice === 'Welcome') setAudioStatus('Before You Begin');
      else if (activePractice === 'Introduction') setAudioStatus('Introduction Ready');
      else if (activePractice === 'FoundationHome') {
        const label = activeTrainTrack === 'Foundation'
          ? 'Choose a Foundation Practice'
          : `${activeTrainTrack} Coming Next`;
        setAudioStatus(label);
      }
      else if (activePractice === 'Foundation') setAudioStatus(practiceContent.Foundation.readyAudioText);
      else if (activePractice === 'Intuition') setAudioStatus(practiceContent.Intuition.readyAudioText);
      else if (activeDestination === 'Progress' || activeDestination === 'Account') setAudioStatus('Training Status');
    }

    function updateInsightCard() {
      const insights = getTrainingInsights();
      const showOnThisScreen = activeDestination === 'Progress';
      if (!insights.total || !showOnThisScreen) {
        el.insightCard.classList.remove('visible');
        return;
      }
      el.insightCard.classList.add('visible');
      el.insightTitle.textContent = insights.title;
      el.insightBody.textContent = insights.body;
    }

    function getFoundationHomeRecommendation() {
      const progressMetrics = getFoundationProgressMetrics();
      const { practices } = progressMetrics;
      const history = loadSessionHistory();
      const recommendation = createPracticeRecommendation({
        history,
        progress: loadProgress(),
        foundationOrder: progressMetrics.practices,
        hasCompletedDisclaimer: hasCompletedDisclaimer(),
        introAvailable: Boolean(practiceContent.Introduction?.audio)
      });
      const currentStepKey = progressMetrics.practices.find((key) => !progressMetrics.completedSet.has(key)) || null;
      const fallbackKey = practices[0] || foundationOrder[0] || 'BreathAwareness';
      const recommendedKey = (recommendation.practiceKey && recommendation.practiceKey !== 'Introduction')
        ? recommendation.practiceKey
        : (currentStepKey || fallbackKey);
      const recommendationLabel = PRACTICE_GUIDANCE[recommendedKey]?.label || formatPracticeLabel(recommendedKey);
      const recommendationCategory = getPracticeCategory(recommendedKey);
      const recommendationReason = recommendation.reason || (currentStepKey
        ? 'Follow the path in order. Keep this step steady before widening.'
        : 'Path complete. Revisit any step to keep attention stable.');
      return {
        progressMetrics,
        currentStepKey,
        recommendedKey,
        recommendationLabel,
        recommendationCategory,
        recommendationReason,
        recommendationPriority: recommendation.priority,
        resumeIncompletePracticeKey: recommendation.resumeIncompletePracticeKey || null
      };
    }

    function renderFoundationHomeCards() {
      if (!el.foundationCardsContainer) return;
      el.foundationCardsContainer.innerHTML = '';

      if (el.comingNextPanel) el.comingNextPanel.classList.add('hidden');
      if (el.trainHierarchyBackBtn) el.trainHierarchyBackBtn.classList.toggle('hidden', trainHierarchyLevel === TRAIN_HIERARCHY_LEVEL.ROOT);

      const createTrackCard = (title, description, onClick, isActive = false) => {
        const btn = document.createElement('button');
        btn.className = 'train-track-btn';
        if (isActive) btn.classList.add('active');
        btn.innerHTML = `<div class="train-track-title">${title}</div><div class="train-track-desc">${description}</div>`;
        btn.addEventListener('click', onClick);
        return btn;
      };

      const createSubcategoryCard = (groupKey) => {
        const isCore = groupKey === 'CoreStability';
        const btn = document.createElement('button');
        btn.className = 'foundation-subgroup-btn';
        btn.innerHTML = isCore
          ? '<strong>Core Stability</strong><span>Breath, body, thought, emotional awareness, and deep focus.</span>'
          : '<strong>Applied Awareness</strong><span>Open, sensory, walking, stress reset, and pre-sleep.</span>';
        btn.addEventListener('click', () => setFoundationSubgroup(groupKey));
        return btn;
      };

      const foundationReadyForIntuition = isFoundationFullyCompleted();
      const intuitionIntroCompleted = hasCompletedIntuitionIntro();

      if (trainHierarchyLevel === TRAIN_HIERARCHY_LEVEL.ROOT) {
        if (el.trainHierarchyTitle) el.trainHierarchyTitle.textContent = 'Train Map';
        el.foundationCardsContainer.appendChild(createTrackCard('Foundation', 'Build stable attention and awareness.', () => setTrainTrack('Foundation'), activeTrainTrack === 'Foundation'));
        const intuitionTrackCopy = foundationReadyForIntuition
          ? (intuitionIntroCompleted ? 'Unlocked. Enter Intuition track.' : 'Ready to unlock. Begin Intuition Introduction.')
          : 'Complete Foundation first to unlock Intuition.';
        el.foundationCardsContainer.appendChild(createTrackCard('Intuition', intuitionTrackCopy, () => setTrainTrack('Intuition'), activeTrainTrack === 'Intuition'));
        el.foundationCardsContainer.appendChild(createTrackCard('Flow', 'Coming next system section.', () => setTrainTrack('Flow')));
        return;
      }

      if (activeTrainTrack === 'Intuition') {
        if (el.trainHierarchyTitle) el.trainHierarchyTitle.textContent = 'Intuition';
        if (el.comingNextPanel) el.comingNextPanel.classList.remove('hidden');
        if (!foundationReadyForIntuition) {
          if (el.comingNextTitle) el.comingNextTitle.textContent = 'Complete Foundation first.';
          if (el.comingNextBody) el.comingNextBody.textContent = 'Intuition training opens once stable awareness is built.';
          return;
        }
        if (!intuitionIntroCompleted) {
          if (el.comingNextTitle) el.comingNextTitle.textContent = 'Intuition Introduction ready.';
          if (el.comingNextBody) el.comingNextBody.textContent = 'Open Intuition to begin the introduction.';
          return;
        }
        if (el.comingNextTitle) el.comingNextTitle.textContent = 'Signal Detection';
        if (el.comingNextBody) el.comingNextBody.textContent = 'Notice subtle signals before the mind explains them.';
        const signalData = practiceContent.Intuition?.subcategories?.SignalDetection;
        const btn = document.createElement('button');
        btn.className = 'foundation-card-btn';
        btn.innerHTML = `<div class="foundation-card-top"><div><div class="foundation-card-kicker">Intuition · Step 01</div><div class="foundation-card-title">${signalData?.copyTitle || 'Signal Detection'}</div></div><div class="foundation-card-status">Open</div></div><div class="foundation-card-desc">${signalData?.shortPurpose || ''}</div>`;
        btn.addEventListener('click', () => setSubcategory('SignalDetection', false));
        el.foundationCardsContainer.appendChild(btn);
        return;
      }

      if (activeTrainTrack !== 'Foundation') {
        if (el.trainHierarchyTitle) el.trainHierarchyTitle.textContent = `${activeTrainTrack} · Coming Next`;
        if (el.comingNextPanel) el.comingNextPanel.classList.remove('hidden');
        if (el.comingNextTitle) el.comingNextTitle.textContent = `${activeTrainTrack} · Coming Next`;
        if (el.comingNextBody) el.comingNextBody.textContent = `${activeTrainTrack} is reserved as a system section. Foundation remains fully wired while this section is being built.`;
        return;
      }

      if (trainHierarchyLevel === TRAIN_HIERARCHY_LEVEL.FOUNDATION_SUBCATEGORY) {
        if (el.trainHierarchyTitle) el.trainHierarchyTitle.textContent = 'Foundation';
        el.foundationCardsContainer.appendChild(createSubcategoryCard('CoreStability'));
        el.foundationCardsContainer.appendChild(createSubcategoryCard('AppliedAwareness'));
        return;
      }

      const subgroupKeys = foundationGroups[activeFoundationSubgroup] || [];
      const subgroupTitle = activeFoundationSubgroup === 'CoreStability' ? 'Core Stability' : 'Applied Awareness';
      if (el.trainHierarchyTitle) el.trainHierarchyTitle.textContent = subgroupTitle;

      subgroupKeys.forEach((key, index) => {
        const data = practiceContent.Foundation.subcategories[key];
        if (!data) return;
        const hasAudio = hasPlayablePracticeAudio(key);
        const btn = document.createElement('button');
        btn.className = 'foundation-card-btn';
        if (!hasAudio) btn.classList.add('muted');
        const estimated = FOUNDATION_ESTIMATED_MINUTES[key];
        const metadataLine = [estimated ? `${estimated} min` : '', `Step ${String(index + 1).padStart(2, '0')}`].filter(Boolean).join(' · ');
        const statusLabel = hasAudio ? 'Open' : 'Audio Soon';

        btn.innerHTML = `<div class="foundation-card-top"><div><div class="foundation-card-kicker">${metadataLine}</div><div class="foundation-card-title">${data.copyTitle}</div></div><div class="foundation-card-status">${statusLabel}</div></div><div class="foundation-card-desc">${data.shortPurpose || data.note || ''}</div>`;
        btn.addEventListener('click', () => setSubcategory(key, false));
        el.foundationCardsContainer.appendChild(btn);
      });
    }

    function renderStabilityHomeCards() {}

    function formatHistoryDate(iso) {
      if (!iso) return 'Unknown date';
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return 'Unknown date';
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }

    function formatPracticeLabel(key) {
      if (!key) return 'Unknown Practice';
      return key.replace(/([A-Z])/g, ' $1').trim();
    }

    function getQuoteOfTheDay() {
      if (!quotes.length) return { text: 'Begin where you are.', author: 'Ataraxia' };
      const now = new Date();
      const startOfYear = Date.UTC(now.getUTCFullYear(), 0, 0);
      const dayOfYear = Math.floor((Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - startOfYear) / 86400000);
      return quotes[dayOfYear % quotes.length] || quotes[0];
    }

    function getHomeRecommendation(history = loadSessionHistory()) {
      const safeHistory = Array.isArray(history) ? history : [];
      const progress = getFoundationProgressMetrics(safeHistory);
      const recommendation = createPracticeRecommendation({
        history: safeHistory,
        progress: loadProgress(),
        foundationOrder: progress.practices,
        hasCompletedDisclaimer: hasCompletedDisclaimer(),
        introAvailable: Boolean(practiceContent.Introduction?.audio)
      });
      const practiceKey = recommendation.practiceKey || recommendation.fallbackPracticeKey || 'BreathAwareness';
      return {
        practiceKey,
        title: practiceKey === 'Introduction'
          ? 'Introduction'
          : (PRACTICE_GUIDANCE[practiceKey]?.label || formatPracticeLabel(practiceKey)),
        reason: recommendation.reason,
        priority: recommendation.priority,
        resumeIncompletePracticeKey: recommendation.resumeIncompletePracticeKey || null
      };
    }

    function getPracticeRecommendationDebug(history = loadSessionHistory()) {
      const safeHistory = Array.isArray(history) ? history : [];
      const progress = getFoundationProgressMetrics(safeHistory);
      return createPracticeRecommendation({
        history: safeHistory,
        progress: loadProgress(),
        foundationOrder: progress.practices,
        hasCompletedDisclaimer: hasCompletedDisclaimer(),
        introAvailable: Boolean(practiceContent.Introduction?.audio)
      });
    }
    window.getPracticeRecommendationDebug = getPracticeRecommendationDebug;

    // Home render path: intentionally minimal and focused for the V2 shell.
    function renderHome() {
      if (!el.homeScreen) return;
      const history = loadSessionHistory();
      const quote = getQuoteOfTheDay();
      const recommendation = getHomeRecommendation(history);
      homeNextMove = recommendation;

      if (el.homeQuoteText) el.homeQuoteText.textContent = `“${quote.text}”`;
      if (el.homeQuoteAuthor) el.homeQuoteAuthor.textContent = quote.author || 'Unknown';
      if (el.homeNextMoveTitle) el.homeNextMoveTitle.textContent = recommendation.title;
      if (el.homeNextMoveReason) el.homeNextMoveReason.textContent = recommendation.reason;

    }

    // Single Home CTA entrypoint. Resume/new-user logic is delegated to recommendation selection.
    function startTodaysSession() {
      const recommendation = homeNextMove || getHomeRecommendation(loadSessionHistory());
      if (!recommendation?.practiceKey) return;
      if (recommendation.practiceKey === 'Introduction') {
        selectMainMode('Introduction');
        startSessionButton();
        return;
      }
      setSubcategory(recommendation.practiceKey, false);
      startSessionButton();
    }
    window.startTodaysSession = startTodaysSession;
    window.startTodaySessionFromHome = startTodaysSession;

    function renderProfilePage() {
      if (!el.profilePagePanel) return;
      renderJournalPromptPanel();
      const historyAll = loadSessionHistory();
      const insights = getTrainingInsights();
      const accountStats = getAccountProgressStats(historyAll);
      const history = historyAll.slice(-8).reverse();

      el.profileCoachTitle.textContent = insights.title;
      el.profileCoachBody.textContent = insights.body;
      el.profileTotalSessions.textContent = String(accountStats.totalSessions || 0);
      if (el.profileTotalMinutes) el.profileTotalMinutes.textContent = String(accountStats.totalMinutes || 0);
      el.profileStreak.textContent = String(accountStats.currentStreak || 0);
      if (el.profileBestStreak) el.profileBestStreak.textContent = String(accountStats.bestStreak || 0);
      if (el.profileFoundationCompletions) el.profileFoundationCompletions.textContent = String(accountStats.completedFoundationCount || 0);
      if (el.profileUniquePractices) el.profileUniquePractices.textContent = String(accountStats.uniquePractices || 0);
      if (el.profileTopReflection) el.profileTopReflection.textContent = insights.topReflection || '—';
      if (el.profileTopPractice) el.profileTopPractice.textContent = insights.topPractice || '—';
      if (el.profileConsistencyScore) el.profileConsistencyScore.textContent = String(insights.scores?.consistency || 0);
      if (el.profileStabilityScore) el.profileStabilityScore.textContent = String(insights.scores?.stability || 0);
      if (el.profileDepthScore) el.profileDepthScore.textContent = String(insights.scores?.depth || 0);
      if (el.profileConsistencyCaption) el.profileConsistencyCaption.textContent = insights.scores?.consistencyLabel || 'Still building regularity.';
      if (el.profileStabilityCaption) el.profileStabilityCaption.textContent = insights.scores?.stabilityLabel || 'Needs more clean returns and simpler anchors.';
      if (el.profileDepthCaption) el.profileDepthCaption.textContent = insights.scores?.depthLabel || 'Early-stage depth. Keep strengthening the base.';

      if (el.profileInsightsList) {
        const insightBlocks = Array.isArray(insights.insightBlocks) && insights.insightBlocks.length
          ? insights.insightBlocks.slice(0, 3)
          : [{ id: 'insight-fallback', type: 'Weekly Summary', text: 'More sessions will clarify your pattern.' }];
        el.profileInsightsList.innerHTML = '';
        insightBlocks.forEach((insight) => {
          const node = document.createElement('div');
          node.className = 'profile-insight-item';
          const typeLabel = insight.type ? insight.type + ': ' : '';
          node.textContent = typeLabel + (insight.text || '');
          el.profileInsightsList.appendChild(node);
        });
      }

      el.profileHistoryList.innerHTML = '';
      if (!history.length) {
        const empty = document.createElement('div');
        empty.className = 'profile-history-empty';
        empty.textContent = 'Your recent sessions will appear here after you begin.';
        el.profileHistoryList.appendChild(empty);
        renderJournalList();
        return;
      }

      history.forEach((entry) => {
        const item = document.createElement('div');
        item.className = 'profile-history-item';

        const title = formatPracticeLabel(entry.practice);
        const date = formatHistoryDate(entry.timestamp);
        const meta = (entry.mode || 'Practice') + ' session';
        const reflection = entry.reflection ? ('Reflection: ' + entry.reflection) : 'No reflection saved';

        item.innerHTML = '<div class="profile-history-top">' +
          '<div class="profile-history-title">' + title + '</div>' +
          '<div class="profile-history-meta">' + date + '</div>' +
          '</div>' +
          '<div class="profile-history-meta">' + meta + '</div>' +
          '<div class="profile-history-reflection">' + reflection + '</div>';

        el.profileHistoryList.appendChild(item);
      });
      renderJournalList();
    }

    function getStartTrainingRecommendedPracticeKey() {
      return getFoundationHomeRecommendation().recommendedKey || 'BreathAwareness';
    }

    function startRecommendedFoundationPractice() {
      const recommendedKey = getStartTrainingRecommendedPracticeKey();
      if (recommendedKey === 'Introduction') {
        selectMainMode('Introduction');
        startSessionButton();
        return;
      }
      if (recommendedKey && practiceContent.Foundation?.subcategories?.[recommendedKey]) {
        setSubcategory(recommendedKey, false);
        startSessionButton();
      }
    }
    window.startRecommendedFoundationPractice = startRecommendedFoundationPractice;

    function resetVisualSessionState() {
      setSessionState(SESSION_STATE.IDLE, { phase: 'idle', skipMediaSync: true });
      updateSeekUI();
    }

    function syncUI() {
      updateTopNavigationShell();
      updateContentUI();
      updateTrainViewVisibility();
      updateMenuState();
      updateJourneyButtons();
      updateAudioStatus();
      renderHome();
      if (activeDestination === 'Train') {
        renderFoundationHomeCards();
        renderStabilityHomeCards();
      }
      if (activeDestination === 'Progress') {
        renderProfilePage();
        updateInsightCard();
      }
      if (!el.sessionOverlay) {
        warnMissingUiRef('sessionOverlay', 'session');
        return;
      }
      if (!el.sessionOverlay.classList.contains('active')) {
        resetVisualSessionState();
      }
    }

    function setSessionState(state, options = {}) {
      sessionState = state;
      if (options.phase) sessionPlaybackPhase = options.phase;
      if (!options.skipMediaSync) syncMediaPlaybackState();
      syncSessionUIToAudioState(sessionState);
    }

    function syncSessionUIToAudioState(state = sessionState) {
      const modeConfig = getModeConfig();
      const sub = getSubcategoryData();
      const inGroundingPhase = sessionPlaybackPhase === 'grounding';
      const inEndingPhase = sessionPlaybackPhase === 'ending';

      if (state === SESSION_STATE.IDLE) {
        setCircleState('idle');
        if (el.sessionStateText) el.sessionStateText.textContent = 'Ready';
        if (el.sessionStateLabel) el.sessionStateLabel.textContent = 'Awaiting Start';
        if (el.sessionTapHint) el.sessionTapHint.textContent = 'Tap to pause or resume · Double tap to restart';
        return;
      }

      if (state === SESSION_STATE.READY && inGroundingPhase) {
        setCircleState('grounding');
        if (el.sessionStateText) el.sessionStateText.textContent = 'Settle';
        if (el.sessionStateLabel) el.sessionStateLabel.textContent = 'Grounding';
        if (el.sessionTapHint) el.sessionTapHint.textContent = 'Tap to pause or resume · Double tap to restart';
        return;
      }

      if (state === SESSION_STATE.READY) {
        setCircleState('paused');
        if (el.sessionStateText) el.sessionStateText.textContent = 'Ready';
        if (el.sessionStateLabel) el.sessionStateLabel.textContent = 'Tap to Start';
        if (el.sessionTapHint) el.sessionTapHint.textContent = 'Tap to pause or resume · Double tap to restart';
        return;
      }

      if (state === SESSION_STATE.PLAYING) {
        setCircleState(inEndingPhase ? 'ending' : 'playing');
        if (el.sessionStateText) el.sessionStateText.textContent = inEndingPhase
          ? (sub?.endingText || 'Closing')
          : (sub?.activeText || modeConfig?.activeText || 'Playing');
        if (el.sessionStateLabel) el.sessionStateLabel.textContent = inEndingPhase
          ? (sub?.endingLabel || 'Ending Audio')
          : (sub?.activeLabel || modeConfig?.activeLabel || 'Session Active');
        if (el.sessionTapHint) el.sessionTapHint.textContent = 'Tap to pause or resume · Double tap to restart';
        return;
      }

      if (state === SESSION_STATE.PAUSED) {
        setCircleState('paused');
        if (el.sessionStateText) el.sessionStateText.textContent = modeConfig?.pausedText || 'Paused';
        if (el.sessionStateLabel) el.sessionStateLabel.textContent = modeConfig?.pausedLabel || 'Session Paused';
        if (el.sessionTapHint) el.sessionTapHint.textContent = 'Tap to resume · Double tap to restart';
        return;
      }

      if (state === SESSION_STATE.ENDED) {
        setCircleState('complete');
        if (el.sessionStateText) el.sessionStateText.textContent = 'Complete';
        if (el.sessionStateLabel) el.sessionStateLabel.textContent = 'Session Complete';
        if (el.sessionTapHint) el.sessionTapHint.textContent = 'Session complete';
        return;
      }
    }

    function loadTrack(index) {
      const src = currentPlaylist[index];
      if (!src) return false;
      if (!el.sessionAudio) {
        warnMissingUiRef('sessionAudio', 'session');
        return false;
      }

      currentTrackIndex = index;
      currentAudio = el.sessionAudio;
      currentAudio.pause();
      playRequestPending = false;
      sessionAudioReady = false;
      currentAudio.ontimeupdate = null;
      currentAudio.onended = null;
      currentAudio.onpause = null;
      currentAudio.onloadedmetadata = null;
      currentAudio.oncanplay = null;
      currentAudio.onplay = null;
      currentAudio.onplaying = null;
      currentAudio.onerror = null;
      currentAudio.src = resolveAssetPath(src);
      logSessionAudioEvent('resolved-source', {
        trackIndex: index,
        src,
        resolvedSrc: currentAudio.src
      });
      currentAudio.preload = 'auto';
      currentAudio.volume = getCurrentVolume();
      currentAudio.currentTime = 0;
      currentAudio.ontimeupdate = updateSeekUI;
      currentAudio.onended = handleTrackEnd;
      currentAudio.onpause = () => {
        logSessionAudioEvent('pause', {
          trackIndex: currentTrackIndex,
          currentTime: currentAudio?.currentTime || 0
        });
        updateSeekUI();
        if (sessionState !== SESSION_STATE.ENDED && sessionState !== SESSION_STATE.IDLE && !playRequestPending) {
          setSessionState(SESSION_STATE.PAUSED, { phase: 'paused' });
        }
      };
      currentAudio.onloadedmetadata = () => {
        logSessionAudioEvent('loadedmetadata', {
          duration: Number.isFinite(currentAudio?.duration) ? currentAudio.duration : 0
        });
        updateSeekUI();
      };
      currentAudio.oncanplay = () => {
        sessionAudioReady = true;
        logSessionAudioEvent('canplay', {
          trackIndex: currentTrackIndex,
          duration: Number.isFinite(currentAudio?.duration) ? currentAudio.duration : 0
        });
        if (pendingPlaybackStart && sessionState === SESSION_STATE.READY) {
          startPlayback();
        }
      };
      currentAudio.onplay = () => {
        logSessionAudioEvent('play', {
          trackIndex: currentTrackIndex,
          currentTime: currentAudio?.currentTime || 0
        });
        playRequestPending = false;
        setSessionState(SESSION_STATE.PLAYING, {
          phase: isLegacyMultiTrackSession() && currentTrackIndex > 0 ? 'ending' : 'active'
        });
        setAudioStatus(el.audioText?.textContent || 'Session Active', true);
      };
      currentAudio.onplaying = () => {
        logSessionAudioEvent('playing', {
          trackIndex: currentTrackIndex,
          currentTime: currentAudio?.currentTime || 0
        });
        playRequestPending = false;
        setSessionState(SESSION_STATE.PLAYING, {
          phase: isLegacyMultiTrackSession() && currentTrackIndex > 0 ? 'ending' : 'active'
        });
        setAudioStatus(el.audioText?.textContent || 'Session Active', true);
      };
      currentAudio.onerror = () => {
        const mediaError = currentAudio?.error;
        logSessionAudioEvent('error', {
          code: mediaError?.code || null,
          message: mediaError?.message || 'Unknown media error'
        });
        if (sessionState !== SESSION_STATE.ENDED && sessionState !== SESSION_STATE.IDLE) {
          setSessionState(SESSION_STATE.PAUSED, { phase: 'paused' });
        }
      };
      currentAudio.load();
      preloadNextTrack();
      updateSeekUI();
      return true;
    }

    function initAudio() {
      currentPlaylist = buildPlaylist();
      if (currentPlaylist.length) loadTrack(0);
      else {
        detachAudio();
        updateSeekUI();
      }
    }

    function configureBackgroundAudio() {
      try {
        if ('audioSession' in navigator && navigator.audioSession && navigator.audioSession.type !== 'playback') {
          navigator.audioSession.type = 'playback';
        }
      } catch (error) {
        console.warn('Audio session playback mode unavailable.', error);
      }

      if ('mediaSession' in navigator) {
        try {
          navigator.mediaSession.playbackState = (sessionState === SESSION_STATE.PLAYING) ? 'playing' : 'paused';
          if (!navigator.mediaSession.metadata) {
            navigator.mediaSession.metadata = new MediaMetadata({
              title: 'Ataraxia',
              artist: 'Meditation Session',
              album: 'Ataraxia'
            });
          }
        } catch (error) {
          console.warn('Media Session metadata unavailable.', error);
        }
      }
    }

    function syncMediaPlaybackState() {
      if (!('mediaSession' in navigator)) return;
      try {
        navigator.mediaSession.playbackState = (sessionState === SESSION_STATE.PLAYING) ? 'playing' : 'paused';
      } catch {}
    }

    function hideReflectionTakeover() {
      if (!el.reflectionScreen) {
        warnMissingUiRef('reflectionScreen', 'session');
        return;
      }
      if (!el.reflectionOptionsTakeover) {
        warnMissingUiRef('reflectionOptionsTakeover', 'session');
        el.reflectionScreen.classList.remove('active');
        return;
      }
      el.reflectionScreen.classList.remove('active');
      el.reflectionOptionsTakeover.querySelectorAll('.reflection-option-btn').forEach((btn) => btn.classList.remove('active'));
    }

    function generateSessionFeedback() {
      const history = loadSessionHistory();
      const last = history[history.length - 1];
      const prev = history[history.length - 2];
      const insights = getTrainingInsights();

      if (!last) {
        return {
          title: 'You showed up.',
          body: 'Showing up is the practice.'
        };
      }

      let title = 'Good work.';
      let body = '';

      if (last.reflection === 'Mind wandering') {
        title = 'You caught distraction.';
        body = 'That moment of noticing is the training.';
      } else if (last.reflection === 'Breath') {
        title = 'You stayed with the breath.';
        body = 'Attention is stabilizing.';
      } else if (last.reflection === 'Sensations') {
        title = 'You felt the body clearly.';
        body = 'Presence is settling.';
      } else if (last.reflection === 'Sounds') {
        title = 'You stayed open.';
        body = 'Awareness is widening.';
      }

      if (prev) {
        if (prev.reflection === 'Mind wandering' && last.reflection !== 'Mind wandering') {
          body += '\n\nLess pull than last session.';
        } else if (prev.reflection !== 'Mind wandering' && last.reflection === 'Mind wandering') {
          body += '\n\nMore pull than last session. Still part of training.';
        }
      }

      if (insights.recentTrend === 'improving') {
        body += '\n\nTrend is improving. Keep it steady.';
      } else if (insights.recentTrend === 'noisy') {
        body += '\n\nRecent sessions are noisier. Keep the next one simple.';
      }

      if (insights.streak >= 3) {
        body += '\n\nYour consistency is compounding.';
      }

      return { title, body };
    }

    function showSessionFeedback() {
      if (!el.sessionFeedbackOverlay) return;

      const feedback = generateSessionFeedback();

      el.sessionFeedbackTitle.textContent = feedback.title;
      el.sessionFeedbackBody.textContent = feedback.body;
      el.sessionFeedbackOverlay.classList.remove('hidden');

      requestAnimationFrame(() => {
        el.sessionFeedbackOverlay.classList.add('active');
      });
    }

    function hideSessionFeedback() {
      if (!el.sessionFeedbackOverlay) return;

      el.sessionFeedbackOverlay.classList.remove('active');

      setTimeout(() => {
        el.sessionFeedbackOverlay.classList.add('hidden');
      }, 400);
    }

    function showReflectionTakeover() {
      if (!el.reflectionScreen) {
        warnMissingUiRef('reflectionScreen', 'session');
        return;
      }
      el.reflectionScreen.classList.add('active');
    }

    function hideCompletionTakeover() {
      if (!el.completionScreen) {
        warnMissingUiRef('completionScreen', 'session');
        return;
      }
      el.completionScreen.classList.remove('active');
    }

    function showCompletionTakeover(reflection = '') {
      if (!el.completionScreen || !el.completionScreenTitle || !el.completionScreenSubtitle) {
        warnMissingUiRef('completionScreen', 'session');
        warnMissingUiRef('completionScreenTitle', 'session');
        warnMissingUiRef('completionScreenSubtitle', 'session');
        return;
      }
      const completionLoop = getPracticeCompletionLoop(activeSubcategory, activePractice);
      el.completionScreenTitle.textContent = 'Well done';
      el.completionScreenSubtitle.textContent = `${completionLoop.trained} ${completionLoop.why}`;
      el.completionScreen.classList.add('active');
    }

    Object.entries(practiceContent.Foundation.subcategories).forEach(([practiceKey, data]) => {
      data.skillLabel = getSkillLabel(practiceKey, 'Foundation');
    });
    Object.entries(practiceContent.Intuition.subcategories).forEach(([practiceKey, data]) => {
      data.skillLabel = getSkillLabel(practiceKey, 'Intuition');
    });

    const sessionModeController = createSessionModeController({
      getOverlay: () => el.sessionOverlay,
      getStage: () => el.sessionStage,
      sessionState: () => sessionState,
      isTerminalState: (state) => state === SESSION_STATE.ENDED || state === SESSION_STATE.IDLE,
      onStart: () => {
        if (!isIntroSessionExperience()) return;
        initSessionGrainCircle();
        if (sessionGrainCircle) sessionGrainCircle.start();
      },
      onStop: () => {
        if (sessionGrainCircle) sessionGrainCircle.stop({ clear: true });
      },
      onWarn: warnMissingUiRef
    });

    function updateSessionScrollability() {
      sessionModeController.updateScrollability();
    }

    async function requestWakeLock() {
      return sessionModeController.requestWakeLock();
    }

    async function releaseWakeLock() {
      return sessionModeController.releaseWakeLock();
    }

    function ensureSessionUiRefs() {
      const requiredRefs = [
        'sessionOverlay',
        'sessionStage',
        'sessionCircleShell',
        'sessionProgressRing',
        'sessionStateText',
        'sessionStateLabel',
        'sessionTapHint',
        'sessionTitle',
        'sessionSubtitle',
        'sessionSeekBar',
        'sessionCurrentTime',
        'sessionDuration',
        'sessionAudio'
      ];
      let missing = false;
      requiredRefs.forEach((refName) => {
        if (!el[refName]) {
          warnMissingUiRef(refName, 'session');
          missing = true;
        }
      });
      if (missing) {
        console.warn('[Ataraxia] Session launch blocked: one or more required session refs are missing.');
      }
      return !missing;
    }

    async function primeSessionAudioFromGesture() {
      if (!currentAudio) return;
      try {
        // iOS/Safari autoplay safeguard: unlock audio during the launch tap so delayed playback can start.
        await currentAudio.play();
        currentAudio.pause();
        currentAudio.currentTime = 0;
        logSessionAudioEvent('primed-from-gesture', { success: true });
      } catch (error) {
        console.warn('[Ataraxia] Session audio priming failed; playback may require another tap.', error);
        logSessionAudioEvent('primed-from-gesture', { success: false, reason: error?.message || 'play rejected' });
      }
    }

    function wait(ms = 0) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function waitForSessionUiReady(launchToken) {
      await wait(0);
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await wait(SESSION_UI_READY_DELAY);
      if (launchToken !== sessionLaunchToken) return false;
      const overlayVisible = Boolean(el.sessionOverlay?.classList.contains('active'));
      logSessionAudioEvent('ui-ready-check', { overlayVisible, launchToken });
      return overlayVisible;
    }

    async function waitForAudioCanPlay(launchToken, timeoutMs = 7000) {
      if (!currentAudio) return false;
      if (sessionAudioReady || currentAudio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        sessionAudioReady = true;
        return true;
      }

      return new Promise((resolve) => {
        let settled = false;
        const cleanup = () => {
          currentAudio?.removeEventListener('canplay', onCanPlay);
          currentAudio?.removeEventListener('error', onError);
        };
        const finish = (ready) => {
          if (settled) return;
          settled = true;
          cleanup();
          resolve(ready);
        };
        const onCanPlay = () => finish(true);
        const onError = () => finish(false);

        currentAudio.addEventListener('canplay', onCanPlay, { once: true });
        currentAudio.addEventListener('error', onError, { once: true });
        setTimeout(() => {
          const stillCurrentLaunch = launchToken === sessionLaunchToken;
          if (!stillCurrentLaunch) {
            finish(false);
            return;
          }
          finish(Boolean(currentAudio.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA));
        }, timeoutMs);
      });
    }

    async function prepareSessionAudio(launchToken) {
      initAudio();
      if (!currentPlaylist.length || !currentAudio) return false;
      logSessionAudioEvent('selected-practice', {
        launchToken,
        selectedPracticeKey: getSelectedPracticeKey(),
        playlist: currentPlaylist.slice()
      });
      await primeSessionAudioFromGesture();
      const audioReady = await waitForAudioCanPlay(launchToken);
      logSessionAudioEvent('audio-ready-check', {
        launchToken,
        audioReady,
        readyState: currentAudio?.readyState
      });
      return audioReady;
    }

    function renderSessionUI() {
      return enterSessionMode();
    }

    async function openSession(launchToken) {
      if (!ensureSessionUiRefs()) {
        exitSessionMode();
        return false;
      }
      syncSessionGrainCircleScope();
      const enteredSessionMode = renderSessionUI();
      if (!enteredSessionMode) {
        exitSessionMode();
        return false;
      }
      const uiReady = await waitForSessionUiReady(launchToken);
      if (!uiReady || launchToken !== sessionLaunchToken) {
        console.warn('[Ataraxia] Session launch aborted: session UI failed readiness check.');
        exitSessionMode();
        return false;
      }
      return true;
    }

    // Session boot path (selection -> overlay takeover -> grounding/ready -> playback):
    // 1) startSessionButton validates playlist/audio refs.
    // 2) enterSessionMode guarantees the takeover layer becomes visible.
    // 3) beginSessionGroundingPhase transitions to active playback state.
    function enterSessionMode() {
      hideReflectionTakeover();
      hideCompletionTakeover();
      return sessionModeController.start();
    }

    function exitSessionMode() {
      sessionModeController.stop();
      hideReflectionTakeover();
      hideCompletionTakeover();
    }

    function isIntroSessionExperience() {
      return activePractice === 'Introduction';
    }

    function syncSessionGrainCircleScope() {
      if (!el.sessionGrainCanvas) return;
      const enableIntroGrainCircle = isIntroSessionExperience();
      el.sessionGrainCanvas.hidden = !enableIntroGrainCircle;
      if (!enableIntroGrainCircle && sessionGrainCircle) {
        sessionGrainCircle.stop({ clear: true });
      }
    }

    function initSessionGrainCircle() {
      if (!el.sessionGrainCanvas) {
        warnMissingUiRef('sessionGrainCanvas', 'session');
        return;
      }
      if (sessionGrainCircle) return;
      sessionGrainCircle = new GrainCircle(el.sessionGrainCanvas);
    }

    function startPlayback() {
      if (!currentAudio || sessionState === SESSION_STATE.ENDED || sessionState === SESSION_STATE.IDLE) return;
      if (playRequestPending || !currentAudio.paused) return;
      if (!sessionAudioReady) {
        pendingPlaybackStart = true;
        setSessionState(SESSION_STATE.READY, { phase: 'buffering' });
        if (el.sessionStateText) el.sessionStateText.textContent = 'Preparing';
        if (el.sessionStateLabel) el.sessionStateLabel.textContent = 'Buffering Audio';
        logSessionAudioEvent('start-blocked-waiting-canplay', {
          trackIndex: currentTrackIndex
        });
        return;
      }
      configureBackgroundAudio();
      playRequestPending = true;
      pendingPlaybackStart = false;
      currentAudio.play().then(() => {
        setSessionState(SESSION_STATE.PLAYING, {
          phase: isLegacyMultiTrackSession() && currentTrackIndex > 0 ? 'ending' : 'active'
        });
        if (el.volumeControl) el.volumeControl.classList.add('active');
        requestWakeLock();
      }).catch(() => {
        playRequestPending = false;
        setSessionState(SESSION_STATE.PAUSED, { phase: 'paused' });
      });
    }

    function pausePlayback() {
      if (!currentAudio) return;
      pendingPlaybackStart = false;
      playRequestPending = false;
      setSessionState(SESSION_STATE.PAUSED, { phase: 'paused' });
      currentAudio.pause();
      setAudioStatus(el.audioText?.textContent || 'Session Paused', false);

      releaseWakeLock();
    }

    function advanceToNextTrackIfNeeded(force = false) {
      if (!isLegacyMultiTrackSession()) return false;
      if (currentTrackIndex >= currentPlaylist.length - 1) return false;
      if (!currentAudio) return false;

      const duration = Number.isFinite(currentAudio.duration) ? currentAudio.duration : 0;
      const reachedEnd = currentAudio.ended || (duration > 0 && currentAudio.currentTime >= Math.max(0, duration - 0.25));
      if (!force && !pendingTrackAdvance && !reachedEnd) return false;

      pendingTrackAdvance = false;
      clearTimeout(transitionTimeout);
      loadTrack(currentTrackIndex + 1);
      pendingPlaybackStart = true;
      startPlayback();
      return true;
    }

    function maybeRecoverAudioState() {
      if (!el.sessionOverlay || sessionState === SESSION_STATE.IDLE || sessionState === SESSION_STATE.ENDED || !el.sessionOverlay.classList.contains('active')) return;

      if (isLegacyMultiTrackSession() && currentTrackIndex < currentPlaylist.length - 1) {
        const recovered = advanceToNextTrackIfNeeded();
        if (recovered) return;
      }

      if (currentAudio && sessionState === SESSION_STATE.PLAYING && currentAudio.paused && !document.hidden) {
        configureBackgroundAudio();
        currentAudio.play().catch(() => {});
      }
    }

    function handleTrackEnd() {
      logSessionAudioEvent('ended', {
        trackIndex: currentTrackIndex,
        isLegacyMultiTrack: isLegacyMultiTrackSession()
      });
      if (isLegacyMultiTrackSession() && currentTrackIndex < currentPlaylist.length - 1) {
        pendingTrackAdvance = true;
        clearTimeout(transitionTimeout);
        setSessionState(SESSION_STATE.PLAYING, { phase: 'ending' });

        const continueNow = document.hidden || document.visibilityState === 'hidden';
        if (continueNow) {
          advanceToNextTrackIfNeeded(true);
          return;
        }

        transitionTimeout = setTimeout(() => {
          advanceToNextTrackIfNeeded(true);
        }, TRANSITION_DELAY);
        return;
      }

      setSessionState(SESSION_STATE.ENDED, { phase: 'ended' });
      pendingPlaybackStart = false;
      playRequestPending = false;
      setAudioStatus(el.audioText?.textContent || 'Session Complete', false);
      if (el.volumeControl) el.volumeControl.classList.remove('active');
      releaseWakeLock();
      const elapsedSeconds = activeSessionStartedAt > 0 ? Math.round((Date.now() - activeSessionStartedAt) / 1000) : 0;
      const playbackDurationSeconds = Number.isFinite(currentAudio?.duration) && currentAudio.duration > 0 ? Math.round(currentAudio.duration) : 0;
      completedSessionDurationSeconds = Math.max(elapsedSeconds, playbackDurationSeconds);

      if (activePractice === 'Introduction') {
        setTimeout(() => {
          detachAudio();
          initAudio();
          exitSessionMode();
          resetVisualSessionState();
        }, 700);
        return;
      }

      if ((activePractice === 'Foundation' || activePractice === 'Intuition') && activeSubcategory) {
        savePracticeComplete(activeSubcategory);
      }

      setTimeout(() => {
          showSessionFeedback();
          setTimeout(showReflectionTakeover, 1200);
        }, 900);
    }

    function handleCircleTap() {
      if (!currentAudio || sessionState === SESSION_STATE.ENDED) return;

      if (singleTapTimeout) {
        clearTimeout(singleTapTimeout);
        singleTapTimeout = null;
        resetSessionFromDoubleTap();
        return;
      }

      singleTapTimeout = setTimeout(() => {
        if (sessionState === SESSION_STATE.PLAYING) pausePlayback();
        else startPlayback();
        singleTapTimeout = null;
      }, 220);
    }

    function beginSessionGroundingPhase() {
      clearTimeout(groundingTimeout);
      clearTimeout(transitionTimeout);
      pendingTrackAdvance = false;
      pendingPlaybackStart = false;

      setSessionState(SESSION_STATE.READY, { phase: 'grounding' });
      activeSessionStartedAt = Date.now();
      completedSessionDurationSeconds = 0;
      setAudioStatus(el.audioText?.textContent || 'Grounding', false);
      if (el.volumeControl) el.volumeControl.classList.add('active');
      updateSeekUI();

      groundingTimeout = setTimeout(() => {
        if (sessionState !== SESSION_STATE.READY || sessionPlaybackPhase !== 'grounding') return;
        setSessionState(SESSION_STATE.READY, { phase: 'ready' });
        if (SESSION_AUTOSTART_ON_READY) {
          pendingPlaybackStart = true;
          startPlayback();
        }
      }, 2000);
    }

    function resetSession() {
      clearSessionTimers();
      detachAudio();
      initAudio();
      resetVisualSessionState();
      if (!currentPlaylist.length || !currentAudio) {
        exitSessionMode();
        return;
      }
      beginSessionGroundingPhase();
    }

    function resetSessionFromDoubleTap() {
      resetSession();
    }

    async function startSessionButton() {
      const needsDisclaimer = !hasCompletedDisclaimer() && (activePractice === 'Introduction' || activePractice === 'Foundation');
      if (needsDisclaimer) {
        startWelcomeIntro({
          markCompleteOnFinish: true,
          returnTarget: {
            destination: 'Home',
            practice: 'Introduction'
          }
        });
        return;
      }

      if (activePractice === 'Welcome') {
        startWelcomeIntro({
          markCompleteOnFinish: true,
          returnTarget: {
            destination: 'Home',
            practice: 'Introduction'
          }
        });
        return;
      }

      // Defensive session launch guard: avoid a black screen when refs are missing.
      clearSessionTimers();
      pendingPlaybackStart = false;
      playRequestPending = false;
      sessionAudioReady = false;
      const launchToken = Date.now();
      sessionLaunchToken = launchToken;
      logSessionAudioEvent('session-start-state', {
        launchToken,
        activePractice,
        selectedPracticeKey: getSelectedPracticeKey(),
        destination: activeDestination
      });

      const sessionOpened = await openSession(launchToken);
      if (!sessionOpened) {
        exitSessionMode();
        return;
      }

      const audioReady = await prepareSessionAudio(launchToken);
      if (!audioReady || !currentPlaylist.length || !currentAudio || launchToken !== sessionLaunchToken) {
        console.warn('[Ataraxia] Session launch aborted: missing playlist/audio readiness.');
        exitSessionMode();
        return;
      }

      beginSessionGroundingPhase();
    }
    window.startSessionButton = startSessionButton;

    function openDisclaimerFromAccount() {
      startWelcomeIntro({
        markCompleteOnFinish: false,
        returnTarget: {
          destination: 'Account',
          practice: 'Profile'
        }
      });
    }
    window.openDisclaimerFromAccount = openDisclaimerFromAccount;

    function setVolume(value) {
      const v = Number(value) / 100;
      if (el.volumeSlider && String(el.volumeSlider.value) !== String(value)) {
        el.volumeSlider.value = value;
      }
      if (currentAudio) currentAudio.volume = v;
      if (el.sessionAudio) el.sessionAudio.volume = v;
      if (el.welcomeIntroAudio) el.welcomeIntroAudio.volume = v;
    }
    window.setVolume = setVolume;

    function exitSessionEarly() {
      clearSessionTimers();
      sessionLaunchToken += 1;
      sessionAudioReady = false;
      pendingPlaybackStart = false;
      playRequestPending = false;
      setSessionState(SESSION_STATE.IDLE, { phase: 'idle' });
      activeSessionStartedAt = 0;
      completedSessionDurationSeconds = 0;
      detachAudio();
      initAudio();
      setAudioStatus(el.audioText?.textContent || 'Session', false);
      if (el.volumeControl) el.volumeControl.classList.remove('active');
      resetVisualSessionState();
      exitSessionMode();
    }
    window.exitSessionEarly = exitSessionEarly;

    function toggleMenu() {
      if (activeDestination !== 'Train') return;
      el.menuOverlay.classList.toggle('active');
    }
    window.toggleMenu = toggleMenu;

    function closeMenu() {
      el.menuOverlay.classList.remove('active');
    }
    window.closeMenu = closeMenu;

    function setTopDestination(destination) {
      // Navigation Controller Section: destination switch entrypoint
      if (!DESTINATION_TABS.includes(destination)) return;
      shownLessonKey = '';
      hideLessonOverlayImmediate();

      if (destination === 'Train') {
        activeDestination = 'Train';
        trainViewState = TRAIN_VIEW_STATE.LIST;
        if (trainHierarchyLevel === TRAIN_HIERARCHY_LEVEL.FOUNDATION_LESSON) {
          trainHierarchyLevel = TRAIN_HIERARCHY_LEVEL.FOUNDATION_MEDITATION_LIST;
        }
        // Top-level tab entry should never auto-open a lesson card.
        activePractice = 'FoundationHome';
      } else {
        // Keep Train hierarchy state isolated from non-Train destinations.
        if (activePractice === 'Foundation') {
          trainHierarchyLevel = TRAIN_HIERARCHY_LEVEL.FOUNDATION_MEDITATION_LIST;
        }
        trainViewState = TRAIN_VIEW_STATE.LIST;
        activeDestination = destination;
        activePractice = destination === 'Home' ? getDefaultOpeningMode() : 'Profile';
      }

      refreshCurrentMode();
      closeMenu();
    }
    window.setTopDestination = setTopDestination;

    function selectMainMode(name) {
      activePractice = name;
      activeDestination = inferDestinationFromPractice(name);
      if (activeDestination !== 'Train') trainViewState = TRAIN_VIEW_STATE.LIST;
      foundationMenuOpen = false;
      shownLessonKey = '';
      if (name === 'Introduction' || name === 'Welcome') activeSubcategory = 'BreathAwareness';
      refreshCurrentMode();
      closeMenu();
    }
    window.selectMainMode = selectMainMode;

    function setTrainTrack(name = 'Foundation', closeAfter = false) {
      if (!['Foundation', 'Intuition', 'Flow'].includes(name)) return;
      if (name === 'Intuition') {
        const foundationReadyForIntuition = isFoundationFullyCompleted();
        if (!foundationReadyForIntuition) {
          activeDestination = 'Train';
          activePractice = 'FoundationHome';
          activeTrainTrack = 'Intuition';
          trainViewState = TRAIN_VIEW_STATE.LIST;
          trainHierarchyLevel = TRAIN_HIERARCHY_LEVEL.ROOT;
          foundationMenuOpen = false;
          shownLessonKey = '';
          refreshCurrentMode();
          if (closeAfter) closeMenu();
          return;
        }
        if (!hasCompletedIntuitionIntro()) {
          startIntuitionIntro({
            returnTarget: {
              destination: 'Train',
              practice: 'FoundationHome',
              trainTrack: 'Intuition'
            }
          });
          if (closeAfter) closeMenu();
          return;
        }
      }
      activeDestination = 'Train';
      activePractice = 'FoundationHome';
      activeTrainTrack = name;
      trainViewState = TRAIN_VIEW_STATE.LIST;
      trainHierarchyLevel = name === 'Foundation'
        ? TRAIN_HIERARCHY_LEVEL.FOUNDATION_SUBCATEGORY
        : TRAIN_HIERARCHY_LEVEL.ROOT;
      foundationMenuOpen = name === 'Foundation';
      shownLessonKey = '';
      refreshCurrentMode();
      if (closeAfter) closeMenu();
    }
    window.setTrainTrack = setTrainTrack;

    function setFoundationSubgroup(group = 'CoreStability') {
      if (!foundationGroups[group]) return;
      activePractice = 'FoundationHome';
      activeTrainTrack = 'Foundation';
      activeFoundationSubgroup = group;
      activeFoundationGroup = group;
      openFoundationGroup = group;
      trainViewState = TRAIN_VIEW_STATE.LIST;
      trainHierarchyLevel = TRAIN_HIERARCHY_LEVEL.FOUNDATION_MEDITATION_LIST;
      foundationMenuOpen = true;
      refreshCurrentMode();
    }
    window.setFoundationSubgroup = setFoundationSubgroup;

    function toggleFoundationMenu() {
      setTrainTrack('Foundation');
      foundationMenuOpen = !foundationMenuOpen;
      refreshCurrentMode();
    }
    window.toggleFoundationMenu = toggleFoundationMenu;

    function toggleFoundationGroup(name, event = null) {
      if (event) event.stopPropagation();
      activePractice = 'FoundationHome';
      activeFoundationGroup = name;
      activeFoundationSubgroup = name;
      openFoundationGroup = name;
      activeTrainTrack = 'Foundation';
      foundationMenuOpen = true;
      trainViewState = TRAIN_VIEW_STATE.LIST;
      refreshCurrentMode();
    }
    window.toggleFoundationGroup = toggleFoundationGroup;

    function setSubcategory(name, fromMenu = false, event = null) {
      if (event) event.stopPropagation();
      if (name === 'Introduction') {
        selectMainMode('Introduction');
        if (fromMenu) closeMenu();
        return;
      }
      activeDestination = 'Train';
      activePractice = activeTrainTrack === 'Intuition' ? 'Intuition' : 'Foundation';
      activeSubcategory = name;
      if (activePractice === 'Foundation') {
        activeFoundationGroup = foundationGroups.AppliedAwareness.includes(name) ? 'AppliedAwareness' : 'CoreStability';
        activeFoundationSubgroup = activeFoundationGroup;
        if (activeFoundationGroup === 'CoreStability') {
          lastCoreStabilitySubcategory = name;
        }
        openFoundationGroup = activeFoundationGroup;
      }
      foundationMenuOpen = true;
      activeTrainTrack = activePractice === 'Intuition' ? 'Intuition' : 'Foundation';
      trainViewState = TRAIN_VIEW_STATE.DETAIL;
      trainHierarchyLevel = TRAIN_HIERARCHY_LEVEL.FOUNDATION_LESSON;
      shownLessonKey = '';
      refreshCurrentMode();
      if (fromMenu) closeMenu();
    }
    window.setSubcategory = setSubcategory;

    function toggleStabilityMenu() {
      setFoundationSubgroup('AppliedAwareness');
    }
    window.toggleStabilityMenu = toggleStabilityMenu;

    function setStabilitySubcategory(name, fromMenu = false, event = null) {
      setSubcategory(name, fromMenu, event);
    }
    window.setStabilitySubcategory = setStabilitySubcategory;

    function goToFoundationHome() {
      activeDestination = 'Train';
      activeTrainTrack = 'Foundation';
      activePractice = 'FoundationHome';
      trainHierarchyLevel = TRAIN_HIERARCHY_LEVEL.FOUNDATION_SUBCATEGORY;
      trainViewState = TRAIN_VIEW_STATE.LIST;
      foundationMenuOpen = true;
      shownLessonKey = '';
      refreshCurrentMode();
    }
    window.goToFoundationHome = goToFoundationHome;

    function goBackInTrain() {
      // Train navigation logic: one unified back handler for all hierarchy levels.
      if (activeDestination !== 'Train') return;

      if (trainHierarchyLevel === TRAIN_HIERARCHY_LEVEL.FOUNDATION_MEDITATION_LIST) {
        trainHierarchyLevel = TRAIN_HIERARCHY_LEVEL.FOUNDATION_SUBCATEGORY;
        trainViewState = TRAIN_VIEW_STATE.LIST;
        activePractice = 'FoundationHome';
        activeTrainTrack = 'Foundation';
        refreshCurrentMode();
        return;
      }

      if (trainHierarchyLevel === TRAIN_HIERARCHY_LEVEL.FOUNDATION_LESSON) {
        if (activeTrainTrack === 'Intuition') {
          trainHierarchyLevel = TRAIN_HIERARCHY_LEVEL.ROOT;
          trainViewState = TRAIN_VIEW_STATE.LIST;
          activePractice = 'FoundationHome';
          activeTrainTrack = 'Intuition';
          refreshCurrentMode();
          return;
        }
        trainHierarchyLevel = TRAIN_HIERARCHY_LEVEL.FOUNDATION_MEDITATION_LIST;
        trainViewState = TRAIN_VIEW_STATE.LIST;
        activePractice = 'FoundationHome';
        activeTrainTrack = 'Foundation';
        refreshCurrentMode();
        return;
      }

      if (trainHierarchyLevel === TRAIN_HIERARCHY_LEVEL.FOUNDATION_SUBCATEGORY) {
        trainHierarchyLevel = TRAIN_HIERARCHY_LEVEL.ROOT;
        trainViewState = TRAIN_VIEW_STATE.LIST;
        activePractice = 'FoundationHome';
        activeTrainTrack = 'Foundation';
        refreshCurrentMode();
        return;
      }

      trainHierarchyLevel = TRAIN_HIERARCHY_LEVEL.ROOT;
      trainViewState = TRAIN_VIEW_STATE.LIST;
      activePractice = 'FoundationHome';
      refreshCurrentMode();
    }
    window.goBackInTrain = goBackInTrain;

    function backToFoundationPath() {
      activeDestination = 'Train';
      activeTrainTrack = 'Foundation';
      activePractice = 'FoundationHome';
      activeSubcategory = '';
      trainViewState = TRAIN_VIEW_STATE.LIST;
      trainHierarchyLevel = TRAIN_HIERARCHY_LEVEL.FOUNDATION_MEDITATION_LIST;
      foundationMenuOpen = true;
      shownLessonKey = '';
      refreshCurrentMode();
    }
    window.backToFoundationPath = backToFoundationPath;

    function goToPreviousPractice() {
      const index = foundationOrder.indexOf(activeSubcategory);
      if (index <= 0) return;
      const previous = foundationOrder[index - 1];
      setSubcategory(previous, false);
    }
    window.goToPreviousPractice = goToPreviousPractice;

    function goToNextPractice() {
      const index = foundationOrder.indexOf(activeSubcategory);
      if (index < 0 || index >= foundationOrder.length - 1) return;
      const next = foundationOrder[index + 1];
      setSubcategory(next, false);
    }
    window.goToNextPractice = goToNextPractice;

    function repeatCurrentPractice() {
      hideCompletionTakeover();
      startSessionButton();
    }
    window.repeatCurrentPractice = repeatCurrentPractice;

    function goToNextPracticeFromCompletion() {
      hideCompletionTakeover();
      exitSessionMode();
      const recommendedKey = getHomeRecommendation(loadSessionHistory())?.practiceKey || getStartTrainingRecommendedPracticeKey();
      if (recommendedKey === 'Introduction') {
        selectMainMode('Introduction');
        return;
      }
      if (hasPlayablePracticeAudio(recommendedKey) && practiceContent.Foundation?.subcategories?.[recommendedKey]) {
        setSubcategory(recommendedKey, false);
        return;
      }
      goToNextPractice();
    }
    window.goToNextPracticeFromCompletion = goToNextPracticeFromCompletion;

    function goToTrainFromCompletion() {
      hideCompletionTakeover();
      exitSessionMode();
      goToFoundationHome();
    }
    window.goToTrainFromCompletion = goToTrainFromCompletion;

    function goToFoundationFromCompletion() {
      goToTrainFromCompletion();
    }
    window.goToFoundationFromCompletion = goToFoundationFromCompletion;

window.__ataraxia = {
  loadProgress,
  savePracticeComplete,
  saveReflectionEntry,
  loadSessionHistory,
  saveSessionHistory,
  recordCompletedSession,
  getTrainingInsights,
  generateSessionFeedback,
  formatHistoryDate,
  formatPracticeLabel,
  renderProfilePage,
  updateInsightCard,
  formatTimeDisplay,
  getCurrentVolume,
  setAudioStatus,
  updateSeekUI,
  seekToPercent,
  detachAudio,
  preloadNextTrack,
  loadTrack,
  initAudio,
  startPlayback,
  pausePlayback,
  advanceToNextTrackIfNeeded,
  maybeRecoverAudioState,
  handleTrackEnd,
  setVolume,
  preloadMeditationAudio,
  buildPlaylist,
  isLegacyMultiTrackSession,
  clearSessionTimers,
  resetVisualSessionState,
  setCircleState,
  updateSessionScrollability,
  requestWakeLock,
  releaseWakeLock,
  enterSessionMode,
  exitSessionMode,
  handleCircleTap,
  startSessionButton,
  exitSessionEarly,
  showReflectionTakeover,
  hideReflectionTakeover,
  showCompletionTakeover,
  hideCompletionTakeover,
  handleReflectionChoice,
  repeatCurrentPractice,
  goToNextPracticeFromCompletion,
  goToTrainFromCompletion,
  goToFoundationFromCompletion,
  openWelcomeIntroOverlay,
  closeWelcomeIntroOverlay,
  resetWelcomeIntroUI,
  ensureWelcomeIntroAudioGraph,
  stopWelcomeParticles,
  startWelcomeParticles,
  stopWelcomeReactiveTicker,
  startWelcomeReactiveTicker,
  stopWelcomeIntroAudio,
  ensureWelcomeIntroTextTrack,
  renderWelcomeIntroCue,
  startWelcomeIntroTicker,
  endWelcomeIntro,
  skipWelcomeIntro,
  startWelcomeIntro,
  getModeConfig,
  getSubcategoryData,
  currentViewData,
  updateMenuState,
  hideLessonOverlayImmediate,
  maybeShowLessonOverlay,
  updateContentUI,
  updateAudioStatus,
  updateJourneyButtons,
  renderFoundationHomeCards,
  renderStabilityHomeCards,
  renderHome,
  startTodaysSession,
  openSession,
  renderSessionUI,
  prepareSessionAudio,
  bindSessionControls,
  syncSessionUIToAudioState,
  resetSession,
  getHomeRecommendation,
  getPracticeRecommendationDebug,
  refreshCurrentMode,
  syncUI,
  bootstrapApp,
  toggleMenu,
  closeMenu,
  selectMainMode,
  toggleFoundationMenu,
  setSubcategory,
  toggleStabilityMenu,
  setStabilitySubcategory,
  goToFoundationHome,
  goToNextPractice,
  goBackInTrain
};

    function handleReflectionChoice(button) {
      if (!button) return;
      el.reflectionOptionsTakeover.querySelectorAll('.reflection-option-btn').forEach((btn) => btn.classList.toggle('active', btn === button));
      const reflection = button.dataset.reflection || '';
      saveReflectionEntry(reflection);
      recordCompletedSession(reflection);
      hideReflectionTakeover();
      syncUI();
      showCompletionTakeover(reflection);
    }

    function stopWelcomeIntroAudio() {
  if (welcomeIntroTickRaf) {
    cancelAnimationFrame(welcomeIntroTickRaf);
    welcomeIntroTickRaf = null;
  }
  stopWelcomeReactiveTicker();
  stopWelcomeParticles();
  if (!el.welcomeIntroAudio) return;
  el.welcomeIntroAudio.pause();
  el.welcomeIntroAudio.currentTime = 0;
  el.welcomeIntroAudio.ontimeupdate = null;
  el.welcomeIntroAudio.onended = null;
  el.welcomeIntroAudio.onloadedmetadata = null;
}

    function ensureWelcomeIntroTextTrack() {
      if (!el.welcomeIntroAudio || welcomeIntroTextTrack || typeof VTTCue === 'undefined') return null;
      const track = el.welcomeIntroAudio.addTextTrack('captions', 'Welcome Script', 'en');
      track.mode = 'hidden';
      WELCOME_SCRIPT_CUES.forEach((cue) => {
        track.addCue(new VTTCue(cue.start, cue.end, cue.text));
      });
      track.oncuechange = () => {
        const activeCue = track.activeCues && track.activeCues.length ? track.activeCues[0] : null;
        if (activeCue && el.welcomeIntroCaption) {
          el.welcomeIntroCaption.textContent = activeCue.text;
        }
      };
      welcomeIntroTextTrack = track;
      return track;
    }

    function renderWelcomeIntroCue(time = 0) {
      if (!el.welcomeIntroCaption) return;
      let activeText = WELCOME_SCRIPT_CUES[0]?.text || 'Welcome to Ataraxia.';
      for (let i = 0; i < WELCOME_SCRIPT_CUES.length; i++) {
        if (time >= WELCOME_SCRIPT_CUES[i].start) {
          activeText = WELCOME_SCRIPT_CUES[i].text;
        }
      }
      if (el.welcomeIntroCaption.textContent !== activeText) {
        el.welcomeIntroCaption.textContent = activeText;
      }
    }

    function startWelcomeIntroTicker() {
      if (welcomeIntroTextTrack) return;
      if (welcomeIntroTickRaf) cancelAnimationFrame(welcomeIntroTickRaf);
      const tick = () => {
        if (!el.welcomeIntroAudio || el.welcomeIntroAudio.paused || el.welcomeIntroAudio.ended) {
          welcomeIntroTickRaf = null;
          return;
        }
        renderWelcomeIntroCue(el.welcomeIntroAudio.currentTime || 0);
        welcomeIntroTickRaf = requestAnimationFrame(tick);
      };
      welcomeIntroTickRaf = requestAnimationFrame(tick);
    }

    function endWelcomeIntro(goToIntro = true, markCompleteOnFinish = false) {
      const completedIntuitionIntro = welcomeIntroMode === 'intuition';
      stopWelcomeIntroAudio();
      closeWelcomeIntroOverlay();
      resetWelcomeIntroUI();
      if (completedIntuitionIntro) markIntuitionIntroCompleted();
      else if (markCompleteOnFinish) markDisclaimerCompleted();
      const target = pendingWelcomeIntroTarget;
      pendingWelcomeIntroTarget = null;
      if (target) {
        activeDestination = target.destination || 'Home';
        activePractice = target.practice || (goToIntro ? 'Introduction' : activePractice);
        if (target.trainTrack) activeTrainTrack = target.trainTrack;
        if (activeTrainTrack === 'Intuition') {
          trainHierarchyLevel = TRAIN_HIERARCHY_LEVEL.ROOT;
          trainViewState = TRAIN_VIEW_STATE.LIST;
        }
        refreshCurrentMode();
        return;
      }
      if (goToIntro) {
        activePractice = 'Introduction';
        activeDestination = 'Home';
        refreshCurrentMode();
      }
    }

    function skipWelcomeIntro() {
      endWelcomeIntro(true, Boolean(pendingWelcomeIntroTarget?.markCompleteOnFinish));
    }
    window.skipWelcomeIntro = skipWelcomeIntro;

    function startWelcomeIntro(options = {}) {
      const {
        returnTarget = { destination: 'Home', practice: 'Introduction' },
        markCompleteOnFinish = false
      } = options;
      if (!el.welcomeIntroOverlay || !el.welcomeIntroAudio) {
        if (markCompleteOnFinish) markDisclaimerCompleted();
        activePractice = returnTarget.practice || 'Introduction';
        activeDestination = returnTarget.destination || inferDestinationFromPractice(activePractice);
        refreshCurrentMode();
        return;
      }

      pendingWelcomeIntroTarget = {
        destination: returnTarget.destination || 'Home',
        practice: returnTarget.practice || 'Introduction',
        trainTrack: returnTarget.trainTrack || '',
        markCompleteOnFinish
      };
      welcomeIntroMode = 'welcome';
      closeMenu();
      openWelcomeIntroOverlay();
      resetWelcomeIntroUI();
      startWelcomeParticles();
      el.welcomeIntroState.textContent = 'Welcome';
      el.welcomeIntroLabel.textContent = 'Playing';
      el.welcomeIntroCaption.textContent = WELCOME_SCRIPT_CUES[0]?.text || DEFAULT_WELCOME_CAPTION;
      el.welcomeIntroAudio.src = resolveAssetPath(WELCOME_AUDIO);
      el.welcomeIntroAudio.load();
      el.welcomeIntroAudio.volume = getCurrentVolume();
      el.welcomeIntroAudio.currentTime = 0;
      const cueTrack = ensureWelcomeIntroTextTrack();
      ensureWelcomeIntroAudioGraph();
      el.welcomeIntroAudio.onloadedmetadata = () => renderWelcomeIntroCue(0);
      el.welcomeIntroAudio.ontimeupdate = cueTrack ? null : () => renderWelcomeIntroCue(el.welcomeIntroAudio.currentTime || 0);
      el.welcomeIntroAudio.onended = () => endWelcomeIntro(true, markCompleteOnFinish);
      configureBackgroundAudio();
      const playPromise = el.welcomeIntroAudio.play();
      if (!cueTrack) startWelcomeIntroTicker();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.then(() => {
          el.welcomeIntroLabel.textContent = 'Playing';
          startWelcomeReactiveTicker();
        }).catch(() => {
          el.welcomeIntroLabel.textContent = 'Tap Begin Again';
        });
      }
    }

    function startIntuitionIntro(options = {}) {
      const {
        returnTarget = { destination: 'Train', practice: 'FoundationHome', trainTrack: 'Intuition' }
      } = options;
      if (!el.welcomeIntroOverlay || !el.welcomeIntroAudio) {
        markIntuitionIntroCompleted();
        activePractice = returnTarget.practice || 'FoundationHome';
        activeDestination = returnTarget.destination || 'Train';
        activeTrainTrack = returnTarget.trainTrack || 'Intuition';
        refreshCurrentMode();
        return;
      }

      pendingWelcomeIntroTarget = {
        destination: returnTarget.destination || 'Train',
        practice: returnTarget.practice || 'FoundationHome',
        trainTrack: returnTarget.trainTrack || 'Intuition',
        markCompleteOnFinish: false
      };
      welcomeIntroMode = 'intuition';
      closeMenu();
      openWelcomeIntroOverlay();
      resetWelcomeIntroUI();
      welcomeIntroMode = 'intuition';
      startWelcomeParticles();
      if (el.welcomeIntroKicker) el.welcomeIntroKicker.textContent = 'Intuition Unlock';
      el.welcomeIntroState.textContent = 'Intuition Training';
      el.welcomeIntroLabel.textContent = 'Signal detection begins after awareness becomes stable.';
      el.welcomeIntroCaption.textContent = 'This next phase trains you to notice subtle signals before reaction takes over.';
      if (el.welcomeIntroSkipBtn) el.welcomeIntroSkipBtn.classList.add('hidden');
      if (el.welcomeIntroActionBtn) {
        el.welcomeIntroActionBtn.classList.remove('hidden');
        el.welcomeIntroActionBtn.textContent = 'Begin Introduction';
      }
      el.welcomeIntroAudio.src = resolveAssetPath(INTUITION_INTRO_AUDIO);
      el.welcomeIntroAudio.load();
      el.welcomeIntroAudio.volume = getCurrentVolume();
      el.welcomeIntroAudio.currentTime = 0;
      ensureWelcomeIntroAudioGraph();
      el.welcomeIntroAudio.onloadedmetadata = null;
      el.welcomeIntroAudio.ontimeupdate = null;
      el.welcomeIntroAudio.onended = () => {
        markIntuitionIntroCompleted();
        el.welcomeIntroLabel.textContent = 'Introduction Complete';
        if (el.welcomeIntroActionBtn) {
          el.welcomeIntroActionBtn.textContent = 'Enter Intuition';
          el.welcomeIntroActionBtn.onclick = () => endWelcomeIntro(false, false);
        }
      };
      configureBackgroundAudio();
      if (el.welcomeIntroActionBtn) {
        el.welcomeIntroActionBtn.onclick = () => {
          const playPromise = el.welcomeIntroAudio.play();
          if (playPromise && typeof playPromise.then === 'function') {
            playPromise.then(() => {
              el.welcomeIntroLabel.textContent = 'Playing';
              startWelcomeReactiveTicker();
            }).catch(() => {
              el.welcomeIntroLabel.textContent = 'Tap Begin Introduction';
            });
          }
        };
      }
    }

    function preloadMeditationAudio() {
      const audioFiles = [
        WELCOME_AUDIO,
        INTRODUCTION_AUDIO,
        INTUITION_INTRO_AUDIO,
        INTUITION_SIGNAL_DETECTION_AUDIO,
        ...FOUNDATION_BREATH_AWARENESS_AUDIO,
        ...FOUNDATION_BODY_AWARENESS_AUDIO,
        ...FOUNDATION_THOUGHT_AWARENESS_AUDIO,
        ...FOUNDATION_EMOTIONAL_AWARENESS_AUDIO,
        ...FOUNDATION_DEEP_FOCUS_AUDIO
      ].filter(Boolean);
      audioFiles.forEach((src) => {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = resolveAssetPath(src);
      });
    }

    function getRandomOpeningQuote() {
      return openingQuotes[Math.floor(Math.random() * openingQuotes.length)];
    }

    function showOpeningQuoteScene() {
      const q = getRandomOpeningQuote();
      el.appShell.classList.add('revealed');
      el.openingScene.classList.remove('fade-out');
      el.openingQuote.textContent = `“${q.text}”`;
      el.openingAuthor.textContent = q.author;
      setTimeout(() => {
        el.openingScene.classList.add('fade-out');
        activePractice = getDefaultOpeningMode();
        activeDestination = inferDestinationFromPractice(activePractice);
        try {
          refreshCurrentMode();
        } catch (error) {
          console.error('Ataraxia boot error:', error);
        }
      }, APP_BOOT_DELAY);
    }

    function bootstrapApp() {
      if (appBooted) return;
      appBooted = true;
      if (el.sessionFeedbackContinueBtn) {
        el.sessionFeedbackContinueBtn.addEventListener('click', hideSessionFeedback);
      }
      try {
        configureBackgroundAudio();
        initAudio();
        syncUI();
      } catch (error) {
        console.error('Ataraxia initial sync error:', error);
      }
      showOpeningQuoteScene();
      setTimeout(() => {
        try {
          preloadMeditationAudio();
        } catch (error) {
          console.error('Ataraxia preload error:', error);
        }
      }, 0);
    }

    function bindSessionControls() {
      if (el.reflectionOptionsTakeover) {
        el.reflectionOptionsTakeover.addEventListener('click', (event) => {
          const button = event.target.closest('.reflection-option-btn');
          handleReflectionChoice(button);
        });
      } else {
        warnMissingUiRef('reflectionOptionsTakeover', 'session');
      }

      if (el.sessionCircleShell) el.sessionCircleShell.addEventListener('click', handleCircleTap);
      else warnMissingUiRef('sessionCircleShell', 'session');
      if (el.sessionSeekBar) el.sessionSeekBar.addEventListener('input', (event) => seekToPercent(Number(event.target.value)));
      else warnMissingUiRef('sessionSeekBar', 'session');
    }

    bindSessionControls();
    sessionModeController.mount();

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', bootstrapApp);
    } else {
      setTimeout(bootstrapApp, 0);
    }

    window.addEventListener('load', bootstrapApp);

    window.addEventListener('resize', () => {
      if (el.welcomeIntroOverlay?.classList.contains('active')) {
        startWelcomeParticles();
      }
      if (sessionGrainCircle) {
        sessionGrainCircle.resize();
      }
      if (el.sessionOverlay?.classList.contains('active')) {
        updateSessionScrollability();
      }
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if (el.welcomeIntroOverlay?.classList.contains('active')) {
          skipWelcomeIntro();
          return;
        }
        closeMenu();
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && sessionGrainCircle) {
        sessionGrainCircle.resize();
      }
      if (document.hidden) {
        if (sessionModeController.hasWakeLock()) {
          releaseWakeLock();
        }
        return;
      }

      setTimeout(() => {
        maybeRecoverAudioState();
        if (el.sessionOverlay?.classList.contains('active') && sessionState !== SESSION_STATE.IDLE && sessionState !== SESSION_STATE.ENDED) {
          requestWakeLock();
          updateSessionScrollability();
        }
      }, 250);
    });

    function recoverSessionAfterReturn() {
      if (el.welcomeIntroOverlay?.classList.contains('active') && el.welcomeIntroAudio && el.welcomeIntroAudio.paused && el.welcomeIntroAudio.currentTime > 0) {
        el.welcomeIntroAudio.play().then(() => {
          el.welcomeIntroLabel.textContent = 'Playing';
          startWelcomeIntroTicker();
          startWelcomeReactiveTicker();
        }).catch(() => {});
      }
      setTimeout(() => {
        maybeRecoverAudioState();
        if (el.sessionOverlay?.classList.contains('active') && sessionState !== SESSION_STATE.IDLE && sessionState !== SESSION_STATE.ENDED) {
          requestWakeLock();
          updateSessionScrollability();
        }
      }, 250);
    }

    window.addEventListener('focus', recoverSessionAfterReturn);
    window.addEventListener('pageshow', recoverSessionAfterReturn);
    window.addEventListener('beforeunload', () => {
      sessionModeController.unmount();
    });
  
