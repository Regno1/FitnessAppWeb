// src/store/activitySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as activityService from '../services/activityService';

// ─── Async Thunks ──────────────────────────────────────────────
export const fetchUserActivities = createAsyncThunk(
  'activity/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await activityService.getUserActivities();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load activities');
    }
  }
);

export const logActivity = createAsyncThunk(
  'activity/log',
  async (activityData, { rejectWithValue }) => {
    try {
      const data = await activityService.createActivity(activityData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to log activity');
    }
  }
);

export const fetchActivityById = createAsyncThunk(
  'activity/fetchOne',
  async (activityId, { rejectWithValue }) => {
    try {
      const data = await activityService.getActivityById(activityId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Activity not found');
    }
  }
);

// ─── Slice ──────────────────────────────────────────────────────
const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    activities: [],          // List<ActivtyResponse> from backend
    selectedActivity: null,  // ActivtyResponse for detail view
    status: 'idle',          // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    logStatus: 'idle',       // Separate status for the log form submit
  },
  reducers: {
    clearSelectedActivity: (state) => {
      state.selectedActivity = null;
    },
    resetLogStatus: (state) => {
      state.logStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    // Fetch all activities
    builder
      .addCase(fetchUserActivities.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserActivities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.activities = action.payload;
      })
      .addCase(fetchUserActivities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

    // Log new activity
      .addCase(logActivity.pending, (state) => {
        state.logStatus = 'loading';
      })
      .addCase(logActivity.fulfilled, (state, action) => {
        state.logStatus = 'succeeded';
        state.activities.unshift(action.payload); // Prepend to list
      })
      .addCase(logActivity.rejected, (state, action) => {
        state.logStatus = 'failed';
        state.error = action.payload;
      })

    // Fetch single activity
      .addCase(fetchActivityById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchActivityById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedActivity = action.payload;
      })
      .addCase(fetchActivityById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearSelectedActivity, resetLogStatus } = activitySlice.actions;
export default activitySlice.reducer;

// ─── Selectors ─────────────────────────────────────────────────
export const selectAllActivities = (state) => state.activity.activities;
export const selectActivityStatus = (state) => state.activity.status;
export const selectActivityError = (state) => state.activity.error;
export const selectSelectedActivity = (state) => state.activity.selectedActivity;
export const selectLogStatus = (state) => state.activity.logStatus;
