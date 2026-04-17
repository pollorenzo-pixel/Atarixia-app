export function getNextIncompleteFoundationPractice({ foundationOrder = [], completedSet = new Set() } = {}) {
  return foundationOrder.find((practiceKey) => !completedSet.has(practiceKey)) || null;
}

export function getResumeLastIncompletePractice({ history = [], completedSet = new Set(), foundationOrder = [] } = {}) {
  const safeHistory = Array.isArray(history) ? history : [];
  for (let i = safeHistory.length - 1; i >= 0; i -= 1) {
    const key = String(safeHistory[i]?.practice || '').trim();
    if (!key || !foundationOrder.includes(key)) continue;
    if (!completedSet.has(key)) return key;
  }
  return null;
}

export function getFollowUpPracticeForLastCompleted({ history = [], foundationOrder = [] } = {}) {
  const safeHistory = Array.isArray(history) ? history : [];
  const lastCompletedKey = [...safeHistory].reverse().find((entry) => {
    const key = String(entry?.practice || '').trim();
    return foundationOrder.includes(key);
  })?.practice;

  const lastIndex = foundationOrder.indexOf(lastCompletedKey);
  if (lastIndex < 0) return foundationOrder[0] || null;
  return foundationOrder[(lastIndex + 1) % foundationOrder.length] || null;
}

export function getLowRecencyLowRepetitionPractice({ history = [], foundationOrder = [], now = Date.now() } = {}) {
  const safeHistory = Array.isArray(history) ? history : [];
  const stats = foundationOrder.reduce((acc, key) => {
    acc[key] = { count: 0, lastTimestampMs: 0 };
    return acc;
  }, {});

  safeHistory.forEach((entry) => {
    const key = String(entry?.practice || '').trim();
    if (!stats[key]) return;
    stats[key].count += 1;
    const time = new Date(entry.timestamp || '').getTime();
    if (Number.isFinite(time) && time > stats[key].lastTimestampMs) {
      stats[key].lastTimestampMs = time;
    }
  });

  const maxCount = Math.max(1, ...foundationOrder.map((key) => stats[key]?.count || 0));
  const ranked = foundationOrder.map((key) => {
    const count = stats[key]?.count || 0;
    const lastTimestampMs = stats[key]?.lastTimestampMs || 0;
    const daysSince = lastTimestampMs > 0
      ? Math.max(0, Math.floor((now - lastTimestampMs) / 86400000))
      : 365;
    const repetitionGap = Math.max(0, maxCount - count);
    const score = (daysSince * 2) + repetitionGap;

    return { key, score, daysSince, count };
  }).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.count !== b.count) return a.count - b.count;
    return foundationOrder.indexOf(a.key) - foundationOrder.indexOf(b.key);
  });

  return ranked[0] || null;
}

export function createPracticeRecommendation({
  history = [],
  progress = {},
  foundationOrder = [],
  hasCompletedDisclaimer = false,
  introAvailable = true,
  now = Date.now()
} = {}) {
  const safeHistory = Array.isArray(history) ? history : [];
  const fallbackPracticeKey = foundationOrder[0] || 'BreathAwareness';
  const completedSet = new Set(
    foundationOrder.filter((key) => Boolean(progress?.[key]))
  );

  const resumeIncompletePracticeKey = getResumeLastIncompletePractice({
    history: safeHistory,
    completedSet,
    foundationOrder
  });

  const onboardingIncomplete = !hasCompletedDisclaimer || safeHistory.length === 0;
  if (onboardingIncomplete) {
    return {
      priority: 1,
      practiceKey: introAvailable ? 'Introduction' : fallbackPracticeKey,
      reason: introAvailable
        ? 'Finish onboarding first, then continue into Foundation.'
        : 'Finish onboarding, then begin with the first Foundation practice.',
      fallbackPracticeKey,
      resumeIncompletePracticeKey,
      debug: {
        onboardingIncomplete,
        nextIncompletePracticeKey: null,
        followUpPracticeKey: null
      }
    };
  }

  const nextIncompletePracticeKey = getNextIncompleteFoundationPractice({ foundationOrder, completedSet });
  if (nextIncompletePracticeKey) {
    return {
      priority: 2,
      practiceKey: nextIncompletePracticeKey,
      reason: 'Continue the Foundation sequence with the next incomplete practice.',
      fallbackPracticeKey,
      resumeIncompletePracticeKey,
      debug: {
        onboardingIncomplete,
        nextIncompletePracticeKey,
        followUpPracticeKey: null
      }
    };
  }

  const followUpPracticeKey = getFollowUpPracticeForLastCompleted({
    history: safeHistory,
    foundationOrder
  }) || fallbackPracticeKey;
  const repeatCandidate = getLowRecencyLowRepetitionPractice({
    history: safeHistory,
    foundationOrder,
    now
  });

  if (repeatCandidate?.key) {
    return {
      priority: 4,
      practiceKey: repeatCandidate.key,
      reason: `Foundation is complete. Repeat the least-recent or least-repeated practice (${repeatCandidate.daysSince}d since last, ${repeatCandidate.count} completions).`,
      fallbackPracticeKey,
      resumeIncompletePracticeKey,
      debug: {
        onboardingIncomplete,
        nextIncompletePracticeKey: null,
        followUpPracticeKey
      }
    };
  }

  return {
    priority: 3,
    practiceKey: followUpPracticeKey,
    reason: 'Continue with the most relevant follow-up based on your last completed practice.',
    fallbackPracticeKey,
    resumeIncompletePracticeKey,
    debug: {
      onboardingIncomplete,
      nextIncompletePracticeKey: null,
      followUpPracticeKey
    }
  };
}
