/**
 * Level thresholds:
 * Level 1 = 0-99
 * Level 2 = 100-249
 * Level 3 = 250-499
 * Level 4 = 500-999
 * Level 5 = 1000+
 */

const THRESHOLDS = [0, 100, 250, 500, 1000];

export function getLevelData(totalXp: number) {
  let level = 1;
  let currentLevelXpStart = 0;
  let nextLevelXpStart = THRESHOLDS[1]; // 100

  for (let i = 0; i < THRESHOLDS.length; i++) {
    if (totalXp >= THRESHOLDS[i]) {
      level = i + 1;
      currentLevelXpStart = THRESHOLDS[i];
      nextLevelXpStart = THRESHOLDS[i + 1] || THRESHOLDS[i]; // Cap at last threshold
    } else {
      break;
    }
  }

  // If we are at or past the max level threshold
  if (level >= THRESHOLDS.length) {
    nextLevelXpStart = totalXp; // Effectively maxed out progress bar
  }

  return {
    level,
    currentLevelXpStart,
    nextLevelXpStart,
  };
}