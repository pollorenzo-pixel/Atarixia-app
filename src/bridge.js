const getBridgeApi = () => window.__ataraxia;

/**
 * Safely call a function exposed on window.__ataraxia.
 * Keeps module wrappers small and consistent while preserving legacy fallbacks.
 */
export function callBridge(methodName, args = [], fallback) {
  const method = getBridgeApi()?.[methodName];
  if (typeof method === 'function') {
    return method(...args);
  }
  return fallback;
}
