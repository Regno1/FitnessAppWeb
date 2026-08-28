// src/utils/activityUtils.js
import { ACTIVITY_ICONS, ACTIVITY_BADGE_CLASSES } from './constants';

/**
 * Returns the emoji icon for a given activity type.
 */
export const getActivityIcon = (type) =>
  ACTIVITY_ICONS[type] || ACTIVITY_ICONS.OTHER;

/**
 * Returns the CSS badge class for a given activity type.
 */
export const getActivityBadgeClass = (type) =>
  ACTIVITY_BADGE_CLASSES[type] || ACTIVITY_BADGE_CLASSES.OTHER;

/**
 * Converts "WEIGHT_TRAINING" → "Weight Training"
 */
export const formatActivityType = (type) => {
  if (!type) return '';
  return type
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Sum total calories from a list of activities.
 */
export const totalCalories = (activities = []) =>
  activities.reduce((sum, a) => sum + (a.caloriesBurned || 0), 0);

/**
 * Sum total duration (minutes) from a list of activities.
 */
export const totalDuration = (activities = []) =>
  activities.reduce((sum, a) => sum + (a.duration || 0), 0);
