

    

        const INTRODUCTION_AUDIO = 'audio/introduction audio 2.mp3';
    const FOUNDATION_BREATH_AWARENESS_AUDIO = ['audio/Breath only meditation foundation meditation.mp3', 'audio/ending audio foundation.mp3'];
    const FOUNDATION_BODY_AWARENESS_AUDIO = ['audio/body awareness meditation.mp3', 'audio/body awareness ending audio.mp3'];
    const FOUNDATION_THOUGHT_AWARENESS_AUDIO = ['audio/Thought awareness meditation.mp3', 'audio/thought awareness ending audio.mp3'];
    const FOUNDATION_EMOTIONAL_AWARENESS_AUDIO = ['audio/Emotional Awareness meditations.mp3', 'audio/emotional awareness ending audio.mp3'];
    const FOUNDATION_DEEP_FOCUS_AUDIO = ['audio/deep focus meditation.mp3', 'audio/deep focus ending audio.mp3'];
    const STABILITY_OPEN_AWARENESS_AUDIO = 'audio/open awareness meditation.mp3';
    const STABILITY_SENSORY_AWARENESS_AUDIO = 'audio/sensory awareness meditation.mp3';

    const WELCOME_AUDIO = 'audio/Brittney welcome audio.mp3';
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
    const REFLECTION_STORAGE_KEY = 'ataraxia_reflections_v1';
    const SESSION_HISTORY_STORAGE_KEY = 'ataraxia_session_history_v1';
    const TRANSITION_DELAY = 2000;
    const foundationOrder = ['BreathAwareness', 'BodyAwareness', 'ThoughtAwareness', 'EmotionalAwareness', 'DeepFocus'];
    const stabilityOrder = ['OpenAwareness', 'SensoryAwareness'];
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

    const quotes = [
      { text: 'The obstacle is the way.', author: 'Marcus Aurelius' },
      { text: 'He who conquers himself is the mightiest warrior.', author: 'Confucius' },
      { text: 'Calmness is the cradle of power.', author: 'Josiah Gilbert Holland' },
      { text: 'Return again. That is the training.', author: 'Unknown' }
    ];

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
        stabilise: 'Return briefly to one anchor, then reopen the field.',
        deepen: 'You are learning to remain open without losing stability.'
      },
      SensoryAwareness: {
        label: 'Sensory Awareness',
        stabilise: 'Let sensation come to you instead of searching for it.',
        deepen: 'This builds a calm, wide, embodied awareness.'
      }
    };

    const practiceContent = {
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

    const el = {
      welcomeIntroOverlay: document.getElementById('welcomeIntroOverlay'),
      welcomeIntroState: document.getElementById('welcomeIntroState'),
      welcomeIntroParticles: document.getElementById('welcomeIntroParticles'),
      welcomeIntroLabel: document.getElementById('welcomeIntroLabel'),
      welcomeIntroCaption: document.getElementById('welcomeIntroCaption'),
      welcomeIntroAudio: document.getElementById('welcomeIntroAudio'),
      sessionAudio: document.getElementById('sessionAudio'),
      welcomeMenuBtn: document.getElementById('welcomeMenuBtn'),
      profileMenuBtn: document.getElementById('profileMenuBtn'),
      openingScene: document.getElementById('openingScene'),
      openingQuote: document.getElementById('openingQuote'),
      openingAuthor: document.getElementById('openingAuthor'),
      appShell: document.getElementById('appShell'),
      menuOverlay: document.getElementById('menuOverlay'),
      introductionMenuBtn: document.getElementById('introductionMenuBtn'),
      foundationMenuBtn: document.getElementById('foundationMenuBtn'),
      stabilityMenuBtn: document.getElementById('stabilityMenuBtn'),
      foundationSubsection: document.getElementById('foundationSubsection'),
      stabilitySubsection: document.getElementById('stabilitySubsection'),
      eyebrowText: document.getElementById('eyebrowText'),
      heroTitle: document.getElementById('heroTitle'),
      heroSubtitle: document.getElementById('heroSubtitle'),
      practiceCopyLabel: document.getElementById('practiceCopyLabel'),
      practiceCopyTitle: document.getElementById('practiceCopyTitle'),
      practiceCopyBody: document.getElementById('practiceCopyBody'),
      lessonCard: document.getElementById('lessonCard'),
      lessonTitle: document.getElementById('lessonTitle'),
      lessonBody: document.getElementById('lessonBody'),
      lessonOverlay: document.getElementById('lessonOverlay'),
      lessonOverlayTitle: document.getElementById('lessonOverlayTitle'),
      lessonOverlayBody: document.getElementById('lessonOverlayBody'),
      foundationHomePanel: document.getElementById('foundationHomePanel'),
      foundationCardsContainer: document.getElementById('foundationCardsContainer'),
      stabilityHomePanel: document.getElementById('stabilityHomePanel'),
      stabilityCardsContainer: document.getElementById('stabilityCardsContainer'),
      profilePagePanel: document.getElementById('profilePagePanel'),
      profileCoachTitle: document.getElementById('profileCoachTitle'),
      profileCoachBody: document.getElementById('profileCoachBody'),
      profileTotalSessions: document.getElementById('profileTotalSessions'),
      profileStreak: document.getElementById('profileStreak'),
      profileTopReflection: document.getElementById('profileTopReflection'),
      profileTopPractice: document.getElementById('profileTopPractice'),
      profileRecommendationTitle: document.getElementById('profileRecommendationTitle'),
      profileRecommendationBody: document.getElementById('profileRecommendationBody'),
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
      backToFoundationBtn: document.getElementById('backToFoundationBtn'),
      nextPracticeBtn: document.getElementById('nextPracticeBtn'),
      startSessionBtn: document.getElementById('startSessionBtn'),
      audioStatus: document.getElementById('audioStatus'),
      audioText: document.getElementById('audioText'),
      volumeControl: document.getElementById('volumeControl'),
      volumeSlider: document.querySelector('.volume-slider'),
      bottomNote: document.getElementById('bottomNote'),
      sessionOverlay: document.getElementById('sessionOverlay'),
      sessionStage: document.querySelector('.session-stage'),
      sessionCircleShell: document.getElementById('sessionCircleShell'),
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
    el.sessionProgressRing.style.strokeDasharray = circumference;
    el.sessionProgressRing.style.strokeDashoffset = circumference;

    let activePractice = 'Welcome';
    let appBooted = false;
    let activeSubcategory = 'BreathAwareness';
    let foundationMenuOpen = false;
    let stabilityMenuOpen = false;
    let currentPlaylist = [];
    let currentTrackIndex = 0;
    let currentAudio = null;
    // Unified session state
    const SESSION_STATE = {
      IDLE: 'idle',
      GROUNDING: 'grounding',
      PLAYING: 'playing',
      PAUSED: 'paused',
      ENDING: 'ending',
      COMPLETE: 'complete'
    };

    let sessionState = SESSION_STATE.IDLE;
    let singleTapTimeout = null;
    let groundingTimeout = null;
    let transitionTimeout = null;
    let pendingTrackAdvance = false;
    let lessonOverlayTimeout = null;
    let lessonOverlayExitTimeout = null;
    let shownLessonKey = '';
    let wakeLockHandle = null;
    let welcomeIntroTickRaf = null;
    let welcomeIntroTextTrack = null;
    let welcomeReactiveRaf = null;
    let welcomeParticlesRaf = null;
    let welcomeAudioCtx = null;
    let welcomeAudioAnalyser = null;
    let welcomeAudioSource = null;
    let welcomeAudioData = null;

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
      history.push({
        timestamp: new Date().toISOString(),
        mode: activePractice,
        practice: activeSubcategory || 'Unknown',
        reflection: reflection || ''
      });

      saveSessionHistory(history.slice(-120));
    }

    function getTrainingInsights() {
      const history = loadSessionHistory();
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
        recommendationKey = recentPracticeKey || 'OpenAwareness';
        recommendationReason = 'You are ready to widen the field, but you should still keep one anchor in reserve.';
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

      feedbackParts.push('Recommended next practice: ' + guide.label + '. ' + ((readiness === 'stabilising' || readiness === 'starting') ? guide.stabilise : guide.deepen));

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
        'Suggested direction:',
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
        recommendationReason,
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

    function getModeConfig() {
      if (activePractice === 'Foundation') return practiceContent.Foundation;
      if (activePractice === 'Stability') return practiceContent.Stability;
      return null;
    }

    function getSubcategoryData() {
      if (activePractice === 'Foundation') return practiceContent.Foundation.subcategories[activeSubcategory] || null;
      if (activePractice === 'Stability') return practiceContent.Stability.subcategories[activeSubcategory] || null;
      return null;
    }

    function currentViewData() {
      if (activePractice === 'Welcome') return practiceContent.Welcome;
      if (activePractice === 'Introduction') return practiceContent.Introduction;
      if (activePractice === 'FoundationHome') return practiceContent.FoundationHome;
      if (activePractice === 'StabilityHome') return practiceContent.StabilityHome;
      if (activePractice === 'Profile') return practiceContent.Profile;
      return getSubcategoryData() || practiceContent.Introduction;
    }

    function buildPlaylist() {
      if (activePractice === 'Welcome') return [];
      if (activePractice === 'Introduction') return practiceContent.Introduction.audio;
      const sub = getSubcategoryData();
      if (!sub?.audio) return [];
      if (activePractice === 'Foundation') return Array.isArray(sub.audio) ? sub.audio : [sub.audio];
      return [Array.isArray(sub.audio) ? sub.audio[0] : sub.audio].filter(Boolean);
    }

    function isLegacyMultiTrackSession() {
      return activePractice === 'Foundation' && currentPlaylist.length > 1;
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

    if (el.sessionFeedbackContinueBtn) {
      el.sessionFeedbackContinueBtn.addEventListener('click', () => {
        hideSessionFeedback();
      });
    }
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
      el.welcomeIntroState.textContent = DEFAULT_WELCOME_STATE;
      el.welcomeIntroLabel.textContent = DEFAULT_WELCOME_LABEL;
      el.welcomeIntroCaption.textContent = DEFAULT_WELCOME_CAPTION;
      document.documentElement.style.setProperty('--welcome-audio-reactivity', '0');
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
        welcomeAudioAnalyser.fftSize = 256;
        welcomeAudioAnalyser.smoothingTimeConstant = 0.86;
        welcomeAudioData = new Uint8Array(welcomeAudioAnalyser.frequencyBinCount);
        welcomeAudioSource.connect(welcomeAudioAnalyser);
        welcomeAudioAnalyser.connect(welcomeAudioCtx.destination);
      } catch (error) {
        console.warn('Welcome audio analyser unavailable.', error);
        welcomeAudioAnalyser = null;
        welcomeAudioData = null;
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

      const cx = w / 2;
      const cy = h / 2 - Math.min(h * 0.03, 18);
      const baseRadius = Math.min(w, h) * 0.165;
      const innerRadius = baseRadius * 0.34;
      const lineCount = 34;
      const pointsPerLine = 520;

      const lineOffsets = Array.from({ length: lineCount }, (_, i) => ({
        radius: innerRadius + ((baseRadius - innerRadius) * i / (lineCount - 1)),
        wobble: 1.2 + i * 0.05,
        phase: Math.random() * Math.PI * 2,
        speed: 0.00028 + i * 0.000018,
        weight: 0.9 + (i / lineCount) * 0.18,
        alpha: 0.72 + (i / lineCount) * 0.16,
        twist: Math.random() * Math.PI * 2
      }));

      stopWelcomeParticles();

      const tick = () => {
        const reactivity = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--welcome-audio-reactivity')) || 0;
        const t = performance.now();
        const globalBreath = 1 + reactivity * 0.045;
        const rippleAmount = 0.55 + reactivity * 4.8;
        const fullWave = reactivity * 5.5;

        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 0; i < lineOffsets.length; i++) {
          const ring = lineOffsets[i];
          ctx.beginPath();
          for (let p = 0; p <= pointsPerLine; p++) {
            const a = (p / pointsPerLine) * Math.PI * 2;
            const radiusBreath = ring.radius * globalBreath;
            const wave1 = Math.sin(a * 2.0 + ring.phase + t * ring.speed) * ring.wobble;
            const wave2 = Math.sin(a * 5.2 - ring.phase * 0.7 + t * (ring.speed * 1.8)) * (rippleAmount * 0.42);
            const wave3 = Math.cos(a * 9.5 + ring.twist + t * 0.0012) * (rippleAmount * 0.18);
            const fullOrbitPulse = Math.sin(a + t * 0.001 + ring.phase) * fullWave;
            const densityWeight = Math.sin(a * 3.0 + t * 0.0009 + ring.twist) * (reactivity * 1.15);
            const r = radiusBreath + wave1 + wave2 + wave3 + fullOrbitPulse + densityWeight;
            const x = cx + Math.cos(a) * r;
            const y = cy + Math.sin(a) * r;
            if (p === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.strokeStyle = `rgba(255,255,255,${ring.alpha})`;
          ctx.lineWidth = ring.weight + reactivity * 0.08;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.fillStyle = '#000';
        ctx.arc(cx, cy, innerRadius * globalBreath - 2, 0, Math.PI * 2);
        ctx.fill();

        welcomeParticlesRaf = requestAnimationFrame(tick);
      };

      welcomeParticlesRaf = requestAnimationFrame(tick);
    }

    function stopWelcomeReactiveTicker() {
      if (welcomeReactiveRaf) {
        cancelAnimationFrame(welcomeReactiveRaf);
        welcomeReactiveRaf = null;
      }
      document.documentElement.style.setProperty('--welcome-audio-reactivity', '0');
    }

    function startWelcomeReactiveTicker() {
      if (!welcomeAudioAnalyser || !welcomeAudioData) return;
      stopWelcomeReactiveTicker();
      const tick = () => {
        if (!el.welcomeIntroAudio || el.welcomeIntroAudio.paused || el.welcomeIntroAudio.ended) {
          welcomeReactiveRaf = null;
          document.documentElement.style.setProperty('--welcome-audio-reactivity', '0');
          return;
        }
        welcomeAudioAnalyser.getByteFrequencyData(welcomeAudioData);
        let sum = 0;
        const sampleSize = Math.min(48, welcomeAudioData.length);
        for (let i = 0; i < sampleSize; i++) sum += welcomeAudioData[i];
        const avg = sampleSize ? sum / sampleSize : 0;
        const normalized = Math.min(1, Math.max(0, (avg / 255) * 1.85));
        document.documentElement.style.setProperty('--welcome-audio-reactivity', normalized.toFixed(3));
        welcomeReactiveRaf = requestAnimationFrame(tick);
      };
      welcomeReactiveRaf = requestAnimationFrame(tick);
    }

    function updateSeekUI() {
      if (!currentAudio) {
        el.sessionSeekBar.value = 0;
        el.sessionCurrentTime.textContent = '00:00';
        el.sessionDuration.textContent = '00:00';
        el.sessionProgressRing.style.strokeDashoffset = circumference;
        return;
      }
      const duration = Number.isFinite(currentAudio.duration) ? currentAudio.duration : 0;
      const current = Number.isFinite(currentAudio.currentTime) ? currentAudio.currentTime : 0;
      const progress = duration > 0 ? (current / duration) * 100 : 0;
      el.sessionSeekBar.value = progress;
      el.sessionCurrentTime.textContent = formatTimeDisplay(current);
      el.sessionDuration.textContent = formatTimeDisplay(duration);
      el.sessionProgressRing.style.strokeDashoffset = circumference * (1 - progress / 100);
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
      el.sessionCircleShell.classList.remove('state-idle', 'state-grounding', 'state-playing', 'state-paused', 'state-ending', 'state-complete', 'stability-mode', 'running');
      if (activePractice === 'Stability') el.sessionCircleShell.classList.add('stability-mode');
      if (state) el.sessionCircleShell.classList.add(`state-${state}`);
      if (state === 'playing' || state === 'ending') el.sessionCircleShell.classList.add('running');
    }

    function updateMenuState() {
      el.welcomeMenuBtn.classList.toggle('active', activePractice === 'Welcome');
      el.introductionMenuBtn.classList.toggle('active', activePractice === 'Introduction');
      el.foundationMenuBtn.classList.toggle('active', activePractice === 'FoundationHome' || activePractice === 'Foundation' || foundationMenuOpen);
      el.stabilityMenuBtn.classList.toggle('active', activePractice === 'StabilityHome' || activePractice === 'Stability' || stabilityMenuOpen);
      if (el.profileMenuBtn) el.profileMenuBtn.classList.toggle('active', activePractice === 'Profile');
      el.foundationSubsection.classList.toggle('visible', foundationMenuOpen || activePractice === 'Foundation' || activePractice === 'FoundationHome');
      el.stabilitySubsection.classList.toggle('visible', stabilityMenuOpen || activePractice === 'Stability' || activePractice === 'StabilityHome');

      [...foundationOrder, ...stabilityOrder].forEach((key) => {
        const btn = document.getElementById(`${key}Btn`);
        if (btn) btn.classList.toggle('active', activeSubcategory === key);
      });
    }

    function updateJourneyButtons() {
      el.foundationHomePanel.classList.toggle('hidden', activePractice !== 'FoundationHome');
      el.stabilityHomePanel.classList.toggle('hidden', activePractice !== 'StabilityHome');
      if (el.profilePagePanel) el.profilePagePanel.classList.toggle('hidden', activePractice !== 'Profile');
      el.backToFoundationBtn.classList.toggle('hidden', activePractice !== 'Foundation');
      el.nextPracticeBtn.classList.toggle('hidden', activePractice !== 'Foundation');
      el.startSessionBtn.style.display = (activePractice === 'FoundationHome' || activePractice === 'StabilityHome' || activePractice === 'Profile') ? 'none' : 'inline-flex';
      const current = currentViewData();
      el.startSessionBtn.textContent = current.startLabel || 'Begin Meditation';
    }

    function hideLessonOverlayImmediate() {
      clearTimeout(lessonOverlayTimeout);
      clearTimeout(lessonOverlayExitTimeout);
      el.lessonOverlay.classList.remove('active', 'exit');
    }

    function maybeShowLessonOverlay(data) {
      const lessonKey = `${activePractice}:${activeSubcategory}:${data.lesson || ''}`;
      if (!data.lesson || shownLessonKey === lessonKey) return;
      shownLessonKey = lessonKey;
      hideLessonOverlayImmediate();
      el.lessonOverlay.classList.add('active');
      lessonOverlayTimeout = setTimeout(() => {
        el.lessonOverlay.classList.add('exit');
        el.lessonCard.classList.add('highlight');
        lessonOverlayExitTimeout = setTimeout(() => {
          el.lessonOverlay.classList.remove('active', 'exit');
          setTimeout(() => el.lessonCard.classList.remove('highlight'), 250);
        }, 560);
      }, 4400);
    }

    function updateContentUI() {
      const data = currentViewData();
      el.sessionCircleShell.classList.toggle('welcome-disclaimer', activePractice === 'Welcome');
      el.eyebrowText.textContent = data.eyebrow;
      el.heroTitle.innerHTML = data.hero;
      el.heroSubtitle.innerHTML = (data.subtitle || []).map((s) => `<span>${s}</span>`).join('');
      el.practiceCopyLabel.textContent = data.copyLabel;
      el.practiceCopyTitle.textContent = data.copyTitle;
      el.practiceCopyBody.textContent = data.copyBody;
      el.sessionModeBadge.textContent = data.badge || data.eyebrow;
      el.sessionTitle.innerHTML = data.hero;
      el.sessionSubtitle.innerHTML = (data.subtitle || []).map((s) => `<span>${s}</span>`).join('');
      el.bottomNote.textContent = activePractice === 'Welcome'
        ? 'Read this first, then continue into the introduction.'
        : data.note;

      if (data.lesson && activePractice !== 'Introduction' && activePractice !== 'FoundationHome' && activePractice !== 'StabilityHome' && activePractice !== 'Welcome') {
        el.lessonCard.style.display = 'block';
        el.lessonTitle.textContent = data.copyTitle || 'Before you begin';
        el.lessonBody.textContent = data.lesson;
        el.lessonOverlayTitle.textContent = data.copyTitle || 'Before you begin';
        el.lessonOverlayBody.textContent = data.lesson;
        maybeShowLessonOverlay(data);
      } else {
        el.lessonCard.style.display = 'none';
        el.lessonTitle.textContent = 'Before you begin';
        el.lessonBody.textContent = '';
        hideLessonOverlayImmediate();
      }
    }

    function updateAudioStatus() {
      if (activePractice === 'Welcome') setAudioStatus('Before You Begin');
      else if (activePractice === 'Introduction') setAudioStatus('Introduction Ready');
      else if (activePractice === 'FoundationHome') setAudioStatus('Choose a Foundation Practice');
      else if (activePractice === 'Foundation') setAudioStatus(practiceContent.Foundation.readyAudioText);
      else if (activePractice === 'StabilityHome') setAudioStatus('Choose a Stability Practice');
      else if (activePractice === 'Stability') setAudioStatus(practiceContent.Stability.readyAudioText);
    }

    function updateInsightCard() {
      const insights = getTrainingInsights();
      const showOnThisScreen = activePractice === 'FoundationHome' || activePractice === 'Foundation' || activePractice === 'StabilityHome' || activePractice === 'Stability';
      if (!insights.total || !showOnThisScreen) {
        el.insightCard.classList.remove('visible');
        return;
      }
      el.insightCard.classList.add('visible');
      el.insightTitle.textContent = insights.title;
      el.insightBody.textContent = insights.body;
    }

    function renderFoundationHomeCards() {
      el.foundationCardsContainer.innerHTML = '';
      const progress = loadProgress();
      const nextKey = foundationOrder.find((key) => !progress[key]) || foundationOrder[0];
      foundationOrder.forEach((key) => {
        const data = practiceContent.Foundation.subcategories[key];
        const btn = document.createElement('button');
        btn.className = 'foundation-card-btn';
        if (key === nextKey) btn.classList.add('next');
        if (progress[key]) btn.classList.add('completed');
        btn.innerHTML = `<div class="foundation-card-top"><div><div class="foundation-card-kicker">Foundation Practice</div><div class="foundation-card-title">${data.copyTitle}</div></div><div class="foundation-card-status ${key === nextKey ? 'next' : ''}">${progress[key] ? 'Completed' : key === nextKey ? 'Next' : 'Available'}</div></div><div class="foundation-card-desc">${data.shortPurpose}</div>`;
        btn.addEventListener('click', () => setSubcategory(key, false));
        el.foundationCardsContainer.appendChild(btn);
      });
    }

    function renderStabilityHomeCards() {
      el.stabilityCardsContainer.innerHTML = '';
      const progress = loadProgress();
      const nextKey = stabilityOrder.find((key) => !progress[key]) || stabilityOrder[0];
      const history = loadSessionHistory();

      stabilityOrder.forEach((key) => {
        const data = practiceContent.Stability.subcategories[key];
        const btn = document.createElement('button');
        btn.className = 'foundation-card-btn';
        if (key === nextKey) btn.classList.add('next');
        if (progress[key]) btn.classList.add('completed');
        const sessionCount = history.filter((entry) => entry.practice === key).length;
        btn.innerHTML = `<div class="foundation-card-top"><div><div class="foundation-card-kicker">Stability Practice</div><div class="foundation-card-title">${data.copyTitle}</div></div><div class="foundation-card-status ${key === nextKey ? 'next' : ''}">${progress[key] ? 'Completed' : key === nextKey ? 'Next' : 'Available'}</div></div><div class="foundation-card-desc">${data.shortPurpose}${sessionCount ? `
Sessions completed: ${sessionCount}` : ''}</div>`;
        btn.addEventListener('click', () => setStabilitySubcategory(key, false));
        el.stabilityCardsContainer.appendChild(btn);
      });
    }

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

    function renderProfilePage() {
      if (!el.profilePagePanel) return;
      const insights = getTrainingInsights();
      const history = loadSessionHistory().slice(-8).reverse();

      el.profileCoachTitle.textContent = insights.title;
      el.profileCoachBody.textContent = insights.body;
      el.profileTotalSessions.textContent = String(insights.total || 0);
      el.profileStreak.textContent = String(insights.streak || 0);
      el.profileTopReflection.textContent = insights.topReflection || '—';
      el.profileTopPractice.textContent = insights.topPractice || '—';
      el.profileRecommendationTitle.textContent = insights.recommendationLabel ? ('Recommended: ' + insights.recommendationLabel) : 'Recommended direction';
      if (el.profileConsistencyScore) el.profileConsistencyScore.textContent = String(insights.scores?.consistency || 0);
      if (el.profileStabilityScore) el.profileStabilityScore.textContent = String(insights.scores?.stability || 0);
      if (el.profileDepthScore) el.profileDepthScore.textContent = String(insights.scores?.depth || 0);
      if (el.profileConsistencyCaption) el.profileConsistencyCaption.textContent = insights.scores?.consistencyLabel || 'Still building regularity.';
      if (el.profileStabilityCaption) el.profileStabilityCaption.textContent = insights.scores?.stabilityLabel || 'Needs more clean returns and simpler anchors.';
      if (el.profileDepthCaption) el.profileDepthCaption.textContent = insights.scores?.depthLabel || 'Early-stage depth. Keep strengthening the base.';

      let trendText = 'Recent trend: still forming.';
      if (insights.recentTrend === 'improving') trendText = 'Recent trend: improving.';
      else if (insights.recentTrend === 'noisy') trendText = 'Recent trend: more restless lately.';
      else if (insights.recentTrend === 'steady') trendText = 'Recent trend: steady.';

      const nextStepsText = (insights.nextThreeSessions || []).map((step, index) => (index + 1) + '. ' + step).join('\n');

      el.profileRecommendationBody.textContent = (insights.recommendationReason || 'Complete a few sessions and Ataraxia will start noticing what your practice is revealing over time.') + '\n\n' + trendText + '\nCoach state: ' + (insights.coachState || 'starting') + '\n\nNext 3 sessions:\n' + nextStepsText + '\n\nCoach note: ' + (insights.feedback || 'Keep showing up and the pattern will become clearer.');

      el.profileHistoryList.innerHTML = '';
      if (!history.length) {
        const empty = document.createElement('div');
        empty.className = 'profile-history-empty';
        empty.textContent = 'Your recent sessions will appear here once you begin practicing.';
        el.profileHistoryList.appendChild(empty);
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
    }

    function resetVisualSessionState() {
      setCircleState('idle');
      el.sessionStateText.textContent = 'Ready';
      el.sessionStateLabel.textContent = 'Awaiting Start';
      el.sessionTapHint.textContent = 'Tap to Pause · Tap Again to Resume · Double Tap to Reset';
      updateSeekUI();
    }

    function syncUI() {
      updateContentUI();
      updateMenuState();
      updateJourneyButtons();
      updateAudioStatus();
      renderFoundationHomeCards();
      renderStabilityHomeCards();
      renderProfilePage();
      updateInsightCard();
      if (!el.sessionOverlay.classList.contains('active')) {
        resetVisualSessionState();
      }
    }

    function loadTrack(index) {
      const src = currentPlaylist[index];
      if (!src || !el.sessionAudio) return false;

      currentTrackIndex = index;
      currentAudio = el.sessionAudio;
      currentAudio.pause();
      currentAudio.ontimeupdate = null;
      currentAudio.onended = null;
      currentAudio.onpause = null;
      currentAudio.onloadedmetadata = null;
      currentAudio.src = resolveAssetPath(src);
      currentAudio.preload = 'auto';
      currentAudio.volume = getCurrentVolume();
      currentAudio.currentTime = 0;
      currentAudio.ontimeupdate = updateSeekUI;
      currentAudio.onended = handleTrackEnd;
      currentAudio.onpause = () => {
        updateSeekUI();
      };
      currentAudio.onloadedmetadata = updateSeekUI;
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
          body: 'Consistency is the foundation. Keep going.'
        };
      }

      let title = 'Good work.';
      let body = '';

      if (last.reflection === 'Mind wandering') {
        title = 'You caught distraction.';
        body = 'That moment of noticing is the training.';
      } else if (last.reflection === 'Breath') {
        title = 'You stayed with the breath.';
        body = 'Your attention is stabilising.';
      } else if (last.reflection === 'Sensations') {
        title = 'You felt the body clearly.';
        body = 'Presence is becoming grounded.';
      } else if (last.reflection === 'Sounds') {
        title = 'You stayed open.';
        body = 'Awareness is widening.';
      }

      if (prev) {
        if (prev.reflection === 'Mind wandering' && last.reflection !== 'Mind wandering') {
          body += '\n\nYou improved from last session — less distraction.';
        } else if (prev.reflection !== 'Mind wandering' && last.reflection === 'Mind wandering') {
          body += '\n\nMore distraction than last time. Still part of the process.';
        }
      }

      if (last.reflection === 'Mind wandering') {
        body += '\n\nThis was a training session. This builds awareness.';
      } else {
        body += '\n\nThis was a clean session. Focus is sharpening.';
      }

      if (insights.recentTrend === 'improving') {
        body += '\n\nYou are trending upward. Stay consistent.';
      } else if (insights.recentTrend === 'noisy') {
        body += '\n\nMind is more restless lately. Simplify the next session.';
      }

      if (insights.streak >= 3) {
        body += '\n\nConsistency is compounding now.';
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
      el.reflectionScreen.classList.add('active');
    }

    function hideCompletionTakeover() {
      el.completionScreen.classList.remove('active');
    }

    function showCompletionTakeover(reflection = '') {
      const modeConfig = getModeConfig();
      const sub = getSubcategoryData();
      const reinforcement = REFLECTION_REINFORCEMENT[reflection] || null;
      const insights = getTrainingInsights();
      el.completionScreenTitle.textContent = reinforcement?.title || 'Well done.';
      el.completionScreenSubtitle.textContent = reinforcement?.body || sub?.reinforcement || modeConfig?.completionMessage || 'Take a moment to acknowledge the practice you just completed.';
      if (insights.streak >= 2) {
        el.completionScreenSubtitle.textContent += `

${insights.streak} days of showing up.`;
      }
      el.completionScreen.classList.add('active');
    }

    function updateSessionScrollability() {
      const topbarHeight = document.querySelector('.session-topbar')?.offsetHeight || 0;
      const stageHeight = el.sessionStage?.scrollHeight || 0;
      const needsScroll = stageHeight + topbarHeight > window.innerHeight - 8;
      el.sessionOverlay.classList.toggle('scrollable', needsScroll);
    }

    async function requestWakeLock() {
      try {
        if (!('wakeLock' in navigator) || wakeLockHandle || !el.sessionOverlay.classList.contains('active') || sessionState === SESSION_STATE.COMPLETE || sessionState === SESSION_STATE.IDLE) return;
        navigator.wakeLock.request('screen').then((handle) => {
          wakeLockHandle = handle;
          wakeLockHandle.addEventListener('release', () => {
            wakeLockHandle = null;
          });
        }).catch(() => {
          wakeLockHandle = null;
        });
      } catch {
        wakeLockHandle = null;
      }
    }

    async function releaseWakeLock() {
      try {
        await wakeLockHandle?.release();
      } catch {}
      wakeLockHandle = null;
    }

    function enterSessionMode() {
      hideReflectionTakeover();
      hideCompletionTakeover();
      document.body.classList.add('session-active');
      el.sessionOverlay.classList.add('active');
      updateSessionScrollability();
      requestWakeLock();
    }

    function exitSessionMode() {
      el.sessionOverlay.classList.remove('active', 'scrollable');
      document.body.classList.remove('session-active');
      hideReflectionTakeover();
      hideCompletionTakeover();
      releaseWakeLock();
    }

    function startPlayback() {
      if (!currentAudio) return;
      const modeConfig = getModeConfig();
      const sub = getSubcategoryData();

      configureBackgroundAudio();
      currentAudio.play().then(() => {
        sessionState = SESSION_STATE.PLAYING;
        syncMediaPlaybackState();
        setAudioStatus(el.audioText.textContent, true);
        el.volumeControl.classList.add('active');

        const inEndingPhase = isLegacyMultiTrackSession() && currentTrackIndex > 0;
        setCircleState(inEndingPhase ? 'ending' : 'playing');

        el.sessionStateText.textContent = inEndingPhase
          ? (sub?.endingText || 'Closing')
          : (sub?.activeText || modeConfig?.activeText || 'Playing');

        el.sessionStateLabel.textContent = inEndingPhase
          ? (sub?.endingLabel || 'Ending Audio')
          : (sub?.activeLabel || modeConfig?.activeLabel || 'Session Active');

        requestWakeLock();
      }).catch(() => {
        sessionState = SESSION_STATE.PAUSED;
        syncMediaPlaybackState();
        setCircleState('paused');
        el.sessionStateText.textContent = 'Paused';
        el.sessionStateLabel.textContent = 'Awaiting Resume';
      });
    }

    function pausePlayback() {
      if (!currentAudio) return;
      currentAudio.pause();
      sessionState = SESSION_STATE.PAUSED;
      syncMediaPlaybackState();

      const modeConfig = getModeConfig();
      setAudioStatus(el.audioText.textContent, false);
      setCircleState('paused');

      el.sessionStateText.textContent = modeConfig?.pausedText || 'Paused';
      el.sessionStateLabel.textContent = modeConfig?.pausedLabel || 'Session Paused';

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
      startPlayback();
      return true;
    }

    function maybeRecoverAudioState() {
      if (sessionState === SESSION_STATE.IDLE || sessionState === SESSION_STATE.COMPLETE || !el.sessionOverlay.classList.contains('active')) return;

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
      if (isLegacyMultiTrackSession() && currentTrackIndex < currentPlaylist.length - 1) {
        pendingTrackAdvance = true;
        clearTimeout(transitionTimeout);
        sessionState = SESSION_STATE.ENDING;
        setCircleState('ending');
        el.sessionStateText.textContent = getSubcategoryData()?.endingText || 'Closing';
        el.sessionStateLabel.textContent = getSubcategoryData()?.endingLabel || 'Ending Audio';

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

      sessionState = SESSION_STATE.COMPLETE;
      syncMediaPlaybackState();
      setCircleState('complete');
      setAudioStatus(el.audioText.textContent, false);
      el.volumeControl.classList.remove('active');
      releaseWakeLock();

      if (activePractice === 'Introduction') {
        setTimeout(() => {
          detachAudio();
          initAudio();
          exitSessionMode();
          resetVisualSessionState();
        }, 700);
        return;
      }

      if ((activePractice === 'Foundation' || activePractice === 'Stability') && activeSubcategory) {
        savePracticeComplete(activeSubcategory);
      }

      setTimeout(() => {
          showSessionFeedback();
          setTimeout(showReflectionTakeover, 1200);
        }, 900);
    }

    function handleCircleTap() {
      if (!currentAudio || sessionState === SESSION_STATE.COMPLETE) return;

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

    function resetSessionFromDoubleTap() {
      clearSessionTimers();
      sessionState = SESSION_STATE.IDLE;
      syncMediaPlaybackState();
      detachAudio();
      initAudio();
      resetVisualSessionState();
      exitSessionMode();
    }

    function startSessionButton() {
      if (activePractice === 'Welcome') {
        startWelcomeIntro();
        return;
      }

      clearSessionTimers();
      initAudio();
      if (!currentPlaylist.length || !currentAudio) return;

      clearTimeout(groundingTimeout);
      clearTimeout(transitionTimeout);
      pendingTrackAdvance = false;

      enterSessionMode();
      sessionState = SESSION_STATE.GROUNDING;
      syncMediaPlaybackState();
      setCircleState('grounding');
      setAudioStatus(el.audioText.textContent, false);
      el.volumeControl.classList.add('active');
      el.sessionStateText.textContent = 'Settle';
      el.sessionStateLabel.textContent = 'Grounding';
      el.sessionTapHint.textContent = 'Tap to Pause · Tap Again to Resume · Double Tap to Reset';
      updateSeekUI();

      groundingTimeout = setTimeout(() => {
        if (sessionState === SESSION_STATE.GROUNDING) startPlayback();
      }, 2000);
    }
    window.startSessionButton = startSessionButton;

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
      sessionState = SESSION_STATE.IDLE;
      syncMediaPlaybackState();
      detachAudio();
      initAudio();
      setAudioStatus(el.audioText.textContent, false);
      el.volumeControl.classList.remove('active');
      resetVisualSessionState();
      exitSessionMode();
    }
    window.exitSessionEarly = exitSessionEarly;

    function toggleMenu() {
      el.menuOverlay.classList.toggle('active');
    }
    window.toggleMenu = toggleMenu;

    function closeMenu() {
      el.menuOverlay.classList.remove('active');
    }
    window.closeMenu = closeMenu;

    function selectMainMode(name) {
      activePractice = name;
      foundationMenuOpen = false;
      stabilityMenuOpen = false;
      shownLessonKey = '';
      if (name === 'Introduction' || name === 'Welcome') activeSubcategory = 'BreathAwareness';
      refreshCurrentMode();
      closeMenu();
    }
    window.selectMainMode = selectMainMode;

    function toggleFoundationMenu() {
      if (activePractice !== 'FoundationHome' && activePractice !== 'Foundation') {
        activePractice = 'FoundationHome';
        stabilityMenuOpen = false;
        foundationMenuOpen = true;
      } else {
        foundationMenuOpen = !foundationMenuOpen;
      }
      refreshCurrentMode();
    }
    window.toggleFoundationMenu = toggleFoundationMenu;

    function setSubcategory(name, fromMenu = false, event = null) {
      if (event) event.stopPropagation();
      activePractice = 'Foundation';
      activeSubcategory = name;
      foundationMenuOpen = true;
      stabilityMenuOpen = false;
      shownLessonKey = '';
      refreshCurrentMode();
      if (fromMenu) closeMenu();
    }
    window.setSubcategory = setSubcategory;

    function toggleStabilityMenu() {
      if (activePractice !== 'StabilityHome' && activePractice !== 'Stability') {
        activePractice = 'StabilityHome';
        activeSubcategory = 'OpenAwareness';
        stabilityMenuOpen = true;
        foundationMenuOpen = false;
      } else {
        stabilityMenuOpen = !stabilityMenuOpen;
      }
      refreshCurrentMode();
    }
    window.toggleStabilityMenu = toggleStabilityMenu;

    function setStabilitySubcategory(name, fromMenu = false, event = null) {
      if (event) event.stopPropagation();
      activePractice = 'Stability';
      activeSubcategory = name;
      stabilityMenuOpen = true;
      foundationMenuOpen = false;
      shownLessonKey = '';
      refreshCurrentMode();
      if (fromMenu) closeMenu();
    }
    window.setStabilitySubcategory = setStabilitySubcategory;

    function goToFoundationHome() {
      activePractice = 'FoundationHome';
      foundationMenuOpen = true;
      shownLessonKey = '';
      refreshCurrentMode();
    }
    window.goToFoundationHome = goToFoundationHome;

    function goToNextPractice() {
      const index = foundationOrder.indexOf(activeSubcategory);
      const next = index >= 0 && index < foundationOrder.length - 1 ? foundationOrder[index + 1] : foundationOrder[0];
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
      if (activePractice === 'Stability') {
        const index = stabilityOrder.indexOf(activeSubcategory);
        const next = index >= 0 && index < stabilityOrder.length - 1 ? stabilityOrder[index + 1] : stabilityOrder[0];
        setStabilitySubcategory(next, false);
      } else {
        goToNextPractice();
      }
    }
    window.goToNextPracticeFromCompletion = goToNextPracticeFromCompletion;

    function goToFoundationFromCompletion() {
      hideCompletionTakeover();
      exitSessionMode();
      if (activePractice === 'Stability') {
        activePractice = 'StabilityHome';
        activeSubcategory = 'OpenAwareness';
        stabilityMenuOpen = true;
        foundationMenuOpen = false;
        shownLessonKey = '';
        refreshCurrentMode();
      } else {
        goToFoundationHome();
      }
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
  goToNextPractice
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

    function endWelcomeIntro(goToIntro = true) {
      stopWelcomeIntroAudio();
      closeWelcomeIntroOverlay();
      resetWelcomeIntroUI();
      if (goToIntro) {
        activePractice = 'Introduction';
        refreshCurrentMode();
      }
    }

    function skipWelcomeIntro() {
      endWelcomeIntro(true);
    }
    window.skipWelcomeIntro = skipWelcomeIntro;

    function startWelcomeIntro() {
      if (!el.welcomeIntroOverlay || !el.welcomeIntroAudio) {
        selectMainMode('Introduction');
        return;
      }

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
      el.welcomeIntroAudio.onended = () => endWelcomeIntro(true);
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

    function preloadMeditationAudio() {
      const audioFiles = [
        WELCOME_AUDIO,
        INTRODUCTION_AUDIO,
        ...FOUNDATION_BREATH_AWARENESS_AUDIO,
        ...FOUNDATION_BODY_AWARENESS_AUDIO,
        ...FOUNDATION_THOUGHT_AWARENESS_AUDIO,
        ...FOUNDATION_EMOTIONAL_AWARENESS_AUDIO,
        ...FOUNDATION_DEEP_FOCUS_AUDIO,
        STABILITY_OPEN_AWARENESS_AUDIO,
        STABILITY_SENSORY_AWARENESS_AUDIO
      ].filter(Boolean);
      audioFiles.forEach((src) => {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = resolveAssetPath(src);
      });
    }

    function showOpeningQuoteScene() {
      const q = quotes[Math.floor(Math.random() * quotes.length)];
      el.appShell.classList.add('revealed');
      el.openingScene.classList.remove('fade-out');
      el.openingQuote.textContent = `“${q.text}”`;
      el.openingAuthor.textContent = q.author;
      setTimeout(() => {
        el.openingScene.classList.add('fade-out');
        activePractice = 'Welcome';
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

    el.reflectionOptionsTakeover.addEventListener('click', (event) => {
      const button = event.target.closest('.reflection-option-btn');
      handleReflectionChoice(button);
    });

    el.sessionCircleShell.addEventListener('click', handleCircleTap);
    el.sessionSeekBar.addEventListener('input', (event) => seekToPercent(Number(event.target.value)));

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', bootstrapApp);
    } else {
      setTimeout(bootstrapApp, 0);
    }

    window.addEventListener('load', bootstrapApp);

    window.addEventListener('resize', () => {
      if (el.welcomeIntroOverlay.classList.contains('active')) {
        startWelcomeParticles();
      }
      if (el.sessionOverlay.classList.contains('active')) {
        updateSessionScrollability();
      }
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if (el.welcomeIntroOverlay.classList.contains('active')) {
          skipWelcomeIntro();
          return;
        }
        closeMenu();
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (wakeLockHandle) {
          releaseWakeLock();
        }
        return;
      }

      setTimeout(() => {
        maybeRecoverAudioState();
        if (el.sessionOverlay.classList.contains('active') && sessionState !== SESSION_STATE.IDLE && sessionState !== SESSION_STATE.COMPLETE) {
          requestWakeLock();
          updateSessionScrollability();
        }
      }, 250);
    });

    function recoverSessionAfterReturn() {
      if (el.welcomeIntroOverlay.classList.contains('active') && el.welcomeIntroAudio && el.welcomeIntroAudio.paused && el.welcomeIntroAudio.currentTime > 0) {
        el.welcomeIntroAudio.play().then(() => {
          el.welcomeIntroLabel.textContent = 'Playing';
          startWelcomeIntroTicker();
          startWelcomeReactiveTicker();
        }).catch(() => {});
      }
      setTimeout(() => {
        maybeRecoverAudioState();
        if (el.sessionOverlay.classList.contains('active') && sessionState !== SESSION_STATE.IDLE && sessionState !== SESSION_STATE.COMPLETE) {
          requestWakeLock();
          updateSessionScrollability();
        }
      }, 250);
    }

    window.addEventListener('focus', recoverSessionAfterReturn);
    window.addEventListener('pageshow', recoverSessionAfterReturn);
  

window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.selectMainMode = selectMainMode;
window.toggleFoundationMenu = toggleFoundationMenu;
window.setSubcategory = setSubcategory;
window.toggleStabilityMenu = toggleStabilityMenu;
window.setStabilitySubcategory = setStabilitySubcategory;
window.goToFoundationHome = goToFoundationHome;
window.goToNextPractice = goToNextPractice;
window.startSessionButton = startSessionButton;
window.exitSessionEarly = exitSessionEarly;
window.repeatCurrentPractice = repeatCurrentPractice;
window.goToNextPracticeFromCompletion = goToNextPracticeFromCompletion;
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
  goToNextPractice
};
