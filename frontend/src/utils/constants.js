// src/utils/constants.js
import React from 'react';
import {
  PersonStanding, Footprints, Bike, Waves,
  Dumbbell, Leaf, Zap, Wind, Mountain, Music2, Trophy, Activity
} from 'lucide-react';

export const ACTIVITY_TYPES = [
  'RUNNING', 'WALKING', 'CYCLING', 'SWIMMING',
  'WEIGHT_TRAINING', 'YOGA', 'HIIT', 'PILATES',
  'HIKING', 'DANCING', 'SPORTS', 'OTHER',
];

export const TOAST_DURATION = 4000; // ms

/* Each value is a Lucide icon component (black, size controlled at render) */
export const ACTIVITY_ICONS = {
  RUNNING:        PersonStanding,
  WALKING:        Footprints,
  CYCLING:        Bike,
  SWIMMING:       Waves,
  WEIGHT_TRAINING: Dumbbell,
  YOGA:           Leaf,
  HIIT:           Zap,
  PILATES:        Wind,
  HIKING:         Mountain,
  DANCING:        Music2,
  SPORTS:         Trophy,
  OTHER:          Activity,
};

export const ACTIVITY_BADGE_CLASSES = {
  RUNNING:        'badge-running',
  WALKING:        'badge-walking',
  CYCLING:        'badge-cycling',
  SWIMMING:       'badge-swimming',
  WEIGHT_TRAINING:'badge-strength',
  YOGA:           'badge-yoga',
  HIIT:           'badge-hiit',
  PILATES:        'badge-pilates',
  HIKING:         'badge-hiking',
  DANCING:        'badge-dancing',
  SPORTS:         'badge-sports',
  OTHER:          'badge-other',
};

export const API_ROUTES = {
  ACTIVITIES:    '/api/activities',
  RECOMMENDATIONS:'/api/recommendations',
  AUTH_LOGIN:    '/api/auth/login',
  AUTH_REGISTER: '/api/auth/register',
};
