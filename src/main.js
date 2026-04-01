

    

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
    const foundationOrder = ['BreathAwareness', 'BodyAwareness', 'EmotionalAwareness', 'ThoughtAwareness', 'DeepFocus', 'OpenAwareness', 'SensoryAwareness'];
    const foundationGroups = {
      CoreStability: ['BreathAwareness', 'BodyAwareness', 'EmotionalAwareness', 'ThoughtAwareness', 'DeepFocus'],
      AppliedAwareness: ['OpenAwareness', 'SensoryAwareness']
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
        hero: 'Choose a track.<br>Then a practice.',
        subtitle: ['Core Stability', 'Applied Awareness', 'Repeatable'],
        note: 'Start with Core Stability, then expand into Applied Awareness.',
        badge: 'Foundation',
        copyLabel: 'Foundation Path',
        copyTitle: 'Foundation Phase',
        copyBody: 'Foundation includes Core Stability and Applied Awareness. Choose one practice and stay consistent.'
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
            badge: 'Foundation · Core Stability · Deep Focus',
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
          },
          OpenAwareness: {
            title: 'Open Awareness Meditation',
            shortPurpose: 'Let awareness open to everything at once.',
            eyebrow: 'Foundation · Applied Awareness',
            hero: 'Open the field.<br>Let everything appear.',
            subtitle: ['Open', 'Notice', 'Remain'],
            note: 'There is nothing to hold. Let awareness stay wide.',
            badge: 'Foundation · Applied Awareness · Open Awareness',
            copyLabel: 'Current Foundation Practice',
            copyTitle: 'Open Awareness',
            copyBody: 'There is nothing to focus on. Simply notice whatever is present.',
            audio: [STABILITY_OPEN_AWARENESS_AUDIO],
            lesson: 'Nothing needs to be chosen. Let the whole field be included.',
            reinforcement: 'Resting in openness trains stable awareness without force.',
            activeText: 'Playing',
            activeLabel: 'Open Awareness',
            endingText: 'Open',
            endingLabel: 'Complete'
          },
          SensoryAwareness: {
            title: 'Sensory Awareness Meditation',
            shortPurpose: 'Rest in the full field of sensation.',
            eyebrow: 'Foundation · Applied Awareness',
            hero: 'Feel the full field.<br>Include sensation.',
            subtitle: ['Sense', 'Include', 'Remain'],
            note: 'Nothing needs to be chosen. Let sensation be known.',
            badge: 'Foundation · Applied Awareness · Sensory Awareness',
            copyLabel: 'Current Foundation Practice',
            copyTitle: 'Sensory Awareness',
            copyBody: 'Allow awareness to rest in sensation. Notice sound, touch, temperature, pressure, and space.',
            audio: [STABILITY_SENSORY_AWARENESS_AUDIO],
            lesson: 'Let sensation come to you. Do not narrow attention.',
            reinforcement: 'Including the full sensory field widens and steadies awareness.',
            activeText: 'Playing',
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
      coreStabilityBtn: document.getElementById('coreStabilityBtn'),
      appliedAwarenessBtn: document.getElementById('appliedAwarenessBtn'),
      coreStabilityList: document.getElementById('coreStabilityList'),
      appliedAwarenessList: document.getElementById('appliedAwarenessList'),
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
      profileNextMoveCard: document.getElementById('profileNextMoveCard'),
      profileNextMoveTitle: document.getElementById('profileNextMoveTitle'),
      profileNextMoveCategory: document.getElementById('profileNextMoveCategory'),
      profileNextMoveDuration: document.getElementById('profileNextMoveDuration'),
      profileNextMoveReason: document.getElementById('profileNextMoveReason'),
      profileNextMoveActionBtn: document.getElementById('profileNextMoveActionBtn'),
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
    let openFoundationGroup = 'CoreStability';
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
    let profileNextMove = null;
    let journalDraftId = '';
    let journalEditorMode = 'create';
    let journalPromptPanelOpen = false;

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
      const durationSeconds = Number.isFinite(currentAudio?.duration) && currentAudio.duration > 0
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

    function hasCompletedSessionHistory(history = loadSessionHistory()) {
      return getCompletedSessionCount(history) > 0;
    }

    function getDefaultOpeningMode() {
      return hasCompletedSessionHistory() ? 'Profile' : 'Introduction';
    }

    function getRecommendedNextMove(history, journalEntries, insights) {
      const safeHistory = Array.isArray(history) ? history : [];
      const safeJournal = Array.isArray(journalEntries) ? journalEntries : [];
      const completedPractices = getCompletedPracticeSet(safeHistory);
      const completedSessionsCount = getCompletedSessionCount(safeHistory);
      const now = Date.now();
      const todayKey = toDayKey(new Date().toISOString());
      const practicedToday = safeHistory.some((entry) => toDayKey(entry.timestamp) === todayKey);
      const lastSession = safeHistory[safeHistory.length - 1] || null;
      const lastSessionTime = new Date(lastSession?.timestamp || '').getTime();
      const hasValidLastSession = Number.isFinite(lastSessionTime);
      const justCompletedSession = hasValidLastSession && ((now - lastSessionTime) <= 90 * 60000);
      const hasJournalAfterSession = hasValidLastSession && safeJournal.some((entry) => {
        const entryTime = new Date(entry.updatedAt || entry.createdAt || '').getTime();
        return Number.isFinite(entryTime) && entryTime >= lastSessionTime;
      });
      const coreSequence = foundationGroups.CoreStability;
      const nextCorePractice = coreSequence.find((practiceKey) => !completedPractices.has(practiceKey));
      const isConsistent = (insights?.streak || 0) >= 4 || (insights?.scores?.consistency || 0) >= 75;
      const nextAppliedPractice = foundationGroups.AppliedAwareness.find((practiceKey) => !completedPractices.has(practiceKey)) || 'OpenAwareness';

      if (!completedSessionsCount) {
        return {
          type: 'session',
          practiceKey: 'Introduction',
          title: 'Introduction to Meditation',
          category: 'Onboarding',
          duration: '',
          actionLabel: 'Start Session',
          reason: 'Start Your First Practice.'
        };
      }

      if (nextCorePractice) {
        const practiceLabel = PRACTICE_GUIDANCE[nextCorePractice]?.label || formatPracticeLabel(nextCorePractice);
        return {
          type: 'session',
          practiceKey: nextCorePractice,
          title: practiceLabel,
          category: 'Core Stability',
          duration: '',
          actionLabel: 'Start Session',
          reason: 'Continue the Core Stability sequence before expanding into wider practices.'
        };
      }

      if (!practicedToday) {
        return {
          type: 'session',
          practiceKey: 'BreathAwareness',
          title: 'Breath Awareness',
          category: 'Core Stability',
          duration: 'Short reset',
          actionLabel: 'Start Session',
          reason: 'You have not practiced today. Use a low-resistance session to re-enter quickly.'
        };
      }

      if (justCompletedSession && !hasJournalAfterSession) {
        return {
          type: 'journal',
          practiceKey: '',
          title: 'Capture the Session',
          category: 'Journal Integration',
          duration: '2 min reflection',
          actionLabel: 'Open Journal',
          reason: 'You just completed practice. Lock in insight with a short reflection before the signal fades.'
        };
      }

      if (isConsistent) {
        const appliedLabel = PRACTICE_GUIDANCE[nextAppliedPractice]?.label || formatPracticeLabel(nextAppliedPractice);
        return {
          type: 'session',
          practiceKey: nextAppliedPractice,
          title: appliedLabel,
          category: 'Applied Awareness',
          duration: '',
          actionLabel: 'Start Session',
          reason: 'Your consistency is strong enough to widen awareness while staying stable.'
        };
      }

      const fallbackKey = insights?.recommendationKey || 'BreathAwareness';
      return {
        type: 'session',
        practiceKey: fallbackKey,
        title: PRACTICE_GUIDANCE[fallbackKey]?.label || formatPracticeLabel(fallbackKey),
        category: getPracticeCategory(fallbackKey),
        duration: '',
        actionLabel: 'Start Session',
        reason: insights?.recommendationReason || 'Start Your First Practice.'
      };
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
        recommendationKey,
        recommendationReason,
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

    function getModeConfig() {
      if (activePractice === 'Foundation') return practiceContent.Foundation;
      return null;
    }

    function getSubcategoryData() {
      if (activePractice === 'Foundation') return practiceContent.Foundation.subcategories[activeSubcategory] || null;
      return null;
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
      if (foundationGroups.AppliedAwareness.includes(activeSubcategory)) el.sessionCircleShell.classList.add('stability-mode');
      if (state) el.sessionCircleShell.classList.add(`state-${state}`);
      if (state === 'playing' || state === 'ending') el.sessionCircleShell.classList.add('running');
    }

    function updateMenuState() {
      el.welcomeMenuBtn.classList.toggle('active', activePractice === 'Welcome');
      el.introductionMenuBtn.classList.toggle('active', activePractice === 'Introduction');
      el.foundationMenuBtn.classList.toggle('active', activePractice === 'FoundationHome' || activePractice === 'Foundation' || foundationMenuOpen);
      if (el.stabilityMenuBtn) el.stabilityMenuBtn.classList.toggle('active', false);
      if (el.profileMenuBtn) el.profileMenuBtn.classList.toggle('active', activePractice === 'Profile');
      el.foundationSubsection.classList.toggle('visible', foundationMenuOpen || activePractice === 'Foundation' || activePractice === 'FoundationHome');
      if (el.stabilitySubsection) el.stabilitySubsection.classList.toggle('visible', false);
      if (activePractice === 'Foundation' && foundationGroups.AppliedAwareness.includes(activeSubcategory)) {
        openFoundationGroup = 'AppliedAwareness';
      }
      if (activePractice === 'Foundation' && foundationGroups.CoreStability.includes(activeSubcategory)) {
        openFoundationGroup = 'CoreStability';
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

    function updateJourneyButtons() {
      el.foundationHomePanel.classList.toggle('hidden', activePractice !== 'FoundationHome');
      el.stabilityHomePanel.classList.add('hidden');
      if (el.profilePagePanel) el.profilePagePanel.classList.toggle('hidden', activePractice !== 'Profile');
      el.backToFoundationBtn.classList.toggle('hidden', activePractice !== 'Foundation');
      el.nextPracticeBtn.classList.toggle('hidden', activePractice !== 'Foundation');
      el.startSessionBtn.style.display = (activePractice === 'FoundationHome' || activePractice === 'Profile') ? 'none' : 'inline-flex';
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

      if (data.lesson && activePractice !== 'Introduction' && activePractice !== 'FoundationHome' && activePractice !== 'Welcome') {
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
    }

    function updateInsightCard() {
      const insights = getTrainingInsights();
      const showOnThisScreen = activePractice === 'FoundationHome' || activePractice === 'Foundation';
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
        const groupLabel = foundationGroups.AppliedAwareness.includes(key) ? 'Applied Awareness' : 'Core Stability';
        const btn = document.createElement('button');
        btn.className = 'foundation-card-btn';
        if (key === nextKey) btn.classList.add('next');
        if (progress[key]) btn.classList.add('completed');
        btn.innerHTML = `<div class="foundation-card-top"><div><div class="foundation-card-kicker">${groupLabel}</div><div class="foundation-card-title">${data.copyTitle}</div></div><div class="foundation-card-status ${key === nextKey ? 'next' : ''}">${progress[key] ? 'Completed' : key === nextKey ? 'Next' : 'Available'}</div></div><div class="foundation-card-desc">${data.shortPurpose || data.note || ''}</div>`;
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

    function renderProfilePage() {
      if (!el.profilePagePanel) return;
      renderJournalPromptPanel();
      const historyAll = loadSessionHistory();
      const insights = getTrainingInsights();
      const journalEntries = loadJournalEntries();
      profileNextMove = getRecommendedNextMove(historyAll, journalEntries, insights);
      const history = historyAll.slice(-8).reverse();

      el.profileCoachTitle.textContent = insights.title;
      el.profileCoachBody.textContent = insights.body;
      el.profileTotalSessions.textContent = String(insights.total || 0);
      el.profileStreak.textContent = String(insights.streak || 0);
      el.profileTopReflection.textContent = insights.topReflection || '—';
      el.profileTopPractice.textContent = insights.topPractice || '—';
      if (el.profileConsistencyScore) el.profileConsistencyScore.textContent = String(insights.scores?.consistency || 0);
      if (el.profileStabilityScore) el.profileStabilityScore.textContent = String(insights.scores?.stability || 0);
      if (el.profileDepthScore) el.profileDepthScore.textContent = String(insights.scores?.depth || 0);
      if (el.profileConsistencyCaption) el.profileConsistencyCaption.textContent = insights.scores?.consistencyLabel || 'Still building regularity.';
      if (el.profileStabilityCaption) el.profileStabilityCaption.textContent = insights.scores?.stabilityLabel || 'Needs more clean returns and simpler anchors.';
      if (el.profileDepthCaption) el.profileDepthCaption.textContent = insights.scores?.depthLabel || 'Early-stage depth. Keep strengthening the base.';

      if (el.profileRecommendationTitle) el.profileRecommendationTitle.textContent = profileNextMove?.title || 'Start Your First Practice';
      if (el.profileRecommendationBody) el.profileRecommendationBody.textContent = profileNextMove?.reason || 'A single focused session is the fastest way to build momentum.';
      if (el.profileNextMoveCategory) el.profileNextMoveCategory.textContent = profileNextMove?.category || 'Core Stability';
      if (el.profileNextMoveDuration) {
        const duration = profileNextMove?.duration || '';
        el.profileNextMoveDuration.textContent = duration;
        el.profileNextMoveDuration.classList.toggle('hidden', !duration);
      }
      if (el.profileNextMoveActionBtn) el.profileNextMoveActionBtn.textContent = profileNextMove?.actionLabel || 'Start Session';

      if (el.profileInsightsList) {
        const patternInsights = Array.isArray(insights.patternInsights) ? insights.patternInsights.slice(0, 2) : [];
        if (profileNextMove?.reason) {
          patternInsights.unshift({
            id: 'next-move-context',
            text: 'Why this next move: ' + profileNextMove.reason
          });
        }
        el.profileInsightsList.innerHTML = '';
        patternInsights.forEach((insight) => {
          const node = document.createElement('div');
          node.className = 'profile-insight-item';
          node.textContent = insight.text || '';
          el.profileInsightsList.appendChild(node);
        });
      }

      el.profileHistoryList.innerHTML = '';
      if (!history.length) {
        const empty = document.createElement('div');
        empty.className = 'profile-history-empty';
        empty.textContent = 'Your recent sessions will appear here once you begin practicing.';
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

    function handleRecommendedNextMove(event = null) {
      if (event && typeof event.stopPropagation === 'function') event.stopPropagation();
      const move = profileNextMove || getRecommendedNextMove(loadSessionHistory(), loadJournalEntries(), getTrainingInsights());
      if (!move) return;
      if (move.type === 'journal') {
        selectMainMode('Profile');
        startNewJournalEntry();
        return;
      }
      if (move.practiceKey === 'Introduction') {
        selectMainMode('Introduction');
      } else if (move.practiceKey) {
        setSubcategory(move.practiceKey, false);
      }
      startSessionButton();
    }
    window.handleRecommendedNextMove = handleRecommendedNextMove;

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

      if (activePractice === 'Foundation' && activeSubcategory) {
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

    function toggleFoundationGroup(name, event = null) {
      if (event) event.stopPropagation();
      openFoundationGroup = openFoundationGroup === name ? '' : name;
      foundationMenuOpen = true;
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
      activePractice = 'Foundation';
      activeSubcategory = name;
      foundationMenuOpen = true;
      stabilityMenuOpen = false;
      openFoundationGroup = foundationGroups.AppliedAwareness.includes(name) ? 'AppliedAwareness' : 'CoreStability';
      shownLessonKey = '';
      refreshCurrentMode();
      if (fromMenu) closeMenu();
    }
    window.setSubcategory = setSubcategory;

    function toggleStabilityMenu() {
      openFoundationGroup = 'AppliedAwareness';
      toggleFoundationMenu();
    }
    window.toggleStabilityMenu = toggleStabilityMenu;

    function setStabilitySubcategory(name, fromMenu = false, event = null) {
      setSubcategory(name, fromMenu, event);
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
      goToNextPractice();
    }
    window.goToNextPracticeFromCompletion = goToNextPracticeFromCompletion;

    function goToFoundationFromCompletion() {
      hideCompletionTakeover();
      exitSessionMode();
      goToFoundationHome();
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
