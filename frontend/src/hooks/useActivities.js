// src/hooks/useActivities.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserActivities,
  selectAllActivities,
  selectActivityStatus,
  selectActivityError,
} from '../store/activitySlice';

/**
 * Hook to load and access the user's activities from the Redux store.
 * Automatically fetches activities on mount if not already loaded.
 */
export const useActivities = () => {
  const dispatch = useDispatch();
  const activities = useSelector(selectAllActivities);
  const status     = useSelector(selectActivityStatus);
  const error      = useSelector(selectActivityError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserActivities());
    }
  }, [dispatch, status]);

  return {
    activities,
    isLoading: status === 'loading',
    isError:   status === 'failed',
    isSuccess: status === 'succeeded',
    error,
    refetch: () => dispatch(fetchUserActivities()),
  };
};
