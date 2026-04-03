import { DIMENSIONS, FIELD_TOTALS } from "./constants";

/**
 * Count filled fields in a section
 */
export function countFilledFields(section) {
  if (!section) return 0;
  let count = 0;
  for (const value of Object.values(section)) {
    if (value != null && value !== "") {
      if (Array.isArray(value)) {
        if (value.length > 0 && value.some(item => item !== "")) {
          count++;
        }
      } else {
        if (typeof value === "string") {
          value.trim();
        }
        count++;
      }
    }
  }
  return count;
}

/**
 * Calculate completion percentage for a dimension
 */
export function getDimensionCompletion(data, dimensionId) {
  const filledCount = countFilledFields(data[dimensionId] || {});
  const totalFields = FIELD_TOTALS[dimensionId] || 1;
  return Math.min(100, Math.round((filledCount / totalFields) * 100));
}

/**
 * Calculate overall completion percentage
 */
export function getOverallCompletion(data) {
  const totalFieldCount = Object.values(FIELD_TOTALS).reduce((sum, count) => sum + count, 0);
  const filledFieldCount = DIMENSIONS.reduce((sum, dimension) => {
    return sum + countFilledFields(data[dimension.id] || {});
  }, 0);
  return Math.min(100, Math.round((filledFieldCount / totalFieldCount) * 100));
}
