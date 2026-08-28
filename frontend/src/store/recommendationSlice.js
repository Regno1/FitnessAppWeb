// src/store/recommendationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as recService from '../services/recommendationService';

export const fetchUserRecommendations = createAsyncThunk(
  'recommendation/fetchByUser',
  async (userId, { rejectWithValue }) => {
    try {
      return await recService.getUserRecommendations(userId);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load recommendations');
    }
  }
);

export const fetchActivityRecommendation = createAsyncThunk(
  'recommendation/fetchByActivity',
  async (activityId, { rejectWithValue }) => {
    try {
      return await recService.getActivityRecommendation(activityId);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'No recommendation found');
    }
  }
);

const recommendationSlice = createSlice({
  name: 'recommendation',
  initialState: {
    recommendations: [],       // List<Recommendation>
    currentRecommendation: null, // Single Recommendation
    status: 'idle',
    error: null,
  },
  reducers: {
    clearCurrentRecommendation: (state) => {
      state.currentRecommendation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRecommendations.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchUserRecommendations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recommendations = action.payload;
      })
      .addCase(fetchUserRecommendations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchActivityRecommendation.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchActivityRecommendation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentRecommendation = action.payload;
      })
      .addCase(fetchActivityRecommendation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearCurrentRecommendation } = recommendationSlice.actions;
export default recommendationSlice.reducer;

export const selectAllRecommendations = (state) => state.recommendation.recommendations;
export const selectCurrentRecommendation = (state) => state.recommendation.currentRecommendation;
export const selectRecommendationStatus = (state) => state.recommendation.status;
