// Migrate the previous namespace on read without losing data if storage is full.
// Keep this function self-contained: the appearance script also runs it before hydration.
export function readStoredValue(key: string, storage: Storage = localStorage): string | null {
  const current = storage.getItem(key);
  if (!key.startsWith("schoology-")) return current;
  const legacyKey = key.replace(/^schoology-/, "campus-");
  const legacy = storage.getItem(legacyKey);
  if (legacy !== null) {
    try {
      if (current === null) storage.setItem(key, legacy);
      storage.removeItem(legacyKey);
    } catch { /* Return the saved value even when migration cannot be persisted. */ }
  }
  return current ?? legacy;
}
