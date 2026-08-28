import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice';
import activityReducer from './activitySlice';
import recommendationReducer from './recommendationSlice';
import uiReducer from './uiSlice';

export const store= configureStore({
  reducer:{
    auth:authReducer,
    activity: activityReducer,
    recommendation:recommendationReducer,
    ui:uiReducer,
  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
      serializableCheck:{
      ignorePaths:['activity.selectedActivity.startTime'],},
    
    }),
    devTools: import.meta.env.DEV,
});

export const seleteAuth= (state)=> state.auth;
export const selectActivity= (state)=> state.activity;
export const selectRecommendation= (state)=> state.recommendation;
export const seletUI= (state)=> state.ui;