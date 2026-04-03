import { STORAGE_KEY, LEGACY_STORAGE_KEYS } from "./constants";
import { DEFAULT_DATA } from "./dataModel";

/**
 * Load data from localStorage with fallback to default data
 * Attempts migration from legacy storage keys
 */
export function loadStoredData() {
  // First, try the current storage key
  const keysToTry = [STORAGE_KEY, ...LEGACY_STORAGE_KEYS];

  for (const key of keysToTry) {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Verify it has expected structure
        if (parsed.school || parsed.p1) {
          // Migrate to current key if needed
          if (key !== STORAGE_KEY) {
            localStorage.setItem(STORAGE_KEY, stored);
          }
          return parsed;
        }
      }
    } catch (error) {
      // Continue to next key if parsing fails
      continue;
    }
  }

  // Return default data if nothing found
  return DEFAULT_DATA;
}

/**
 * Save data to localStorage
 */
export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save data to localStorage:", error);
  }
}
