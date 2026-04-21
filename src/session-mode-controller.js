export function createSessionModeController(options = {}) {
  const {
    getOverlay = () => null,
    getStage = () => null,
    getRoot = () => document.documentElement,
    sessionState = () => 'idle',
    isTerminalState = () => false,
    onStart = () => {},
    onStop = () => {},
    onWarn = () => {},
    bodyClassName = 'session-active'
  } = options;

  let mounted = false;
  let wakeLockHandle = null;

  function updateScrollability() {
    const overlay = getOverlay();
    if (!overlay) {
      onWarn('sessionOverlay', 'session');
      return;
    }
    const topbarHeight = document.querySelector('.session-topbar')?.offsetHeight || 0;
    const stageHeight = getStage()?.scrollHeight || 0;
    const needsScroll = stageHeight + topbarHeight > window.innerHeight - 8;
    overlay.classList.toggle('scrollable', needsScroll);
  }

  async function requestWakeLock() {
    try {
      const overlay = getOverlay();
      const blocked = !('wakeLock' in navigator)
        || wakeLockHandle
        || !overlay?.classList.contains('active')
        || isTerminalState(sessionState());
      if (blocked) return;
      const handle = await navigator.wakeLock.request('screen');
      wakeLockHandle = handle;
      wakeLockHandle.addEventListener('release', () => {
        wakeLockHandle = null;
      });
    } catch {
      wakeLockHandle = null;
    }
  }

  async function releaseWakeLock() {
    try {
      await wakeLockHandle?.release();
    } catch {
      // no-op: wake lock may already be released by the browser
    }
    wakeLockHandle = null;
  }

  function requestFullscreen() {
    const root = getRoot();
    if (!root || document.fullscreenElement || !root.requestFullscreen) return;
    root.requestFullscreen({ navigationUI: 'hide' }).catch(() => {});
  }

  function exitFullscreen() {
    if (!document.fullscreenElement || !document.exitFullscreen) return;
    document.exitFullscreen().catch(() => {});
  }

  function start() {
    mount();
    const overlay = getOverlay();
    if (!overlay) {
      onWarn('sessionOverlay', 'session');
      return false;
    }
    document.body.classList.add(bodyClassName);
    overlay.classList.add('active');
    onStart();
    requestFullscreen();
    updateScrollability();
    requestWakeLock();
    return true;
  }

  function stop() {
    const overlay = getOverlay();
    if (overlay) overlay.classList.remove('active', 'scrollable');
    document.body.classList.remove(bodyClassName);
    onStop();
    exitFullscreen();
    releaseWakeLock();
  }

  function mount() {
    if (mounted) return;
    mounted = true;
  }

  function unmount() {
    if (!mounted) return;
    stop();
    mounted = false;
  }

  function hasWakeLock() {
    return Boolean(wakeLockHandle);
  }

  return {
    mount,
    unmount,
    start,
    stop,
    updateScrollability,
    requestWakeLock,
    releaseWakeLock,
    hasWakeLock
  };
}
