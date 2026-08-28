// src/hooks/useRecommendations.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../store/authslice';
import {
  fetchUserRecommendations,
  selectAllRecommendations,
  selectRecommendationStatus,
} from '../store/recommendationSlice';

/**
 * Hook to load and access the user's AI recommendations from the Redux store.
 */
export const useRecommendations = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const recommendations = useSelector(selectAllRecommendations);
  const status          = useSelector(selectRecommendationStatus);

  useEffect(() => {
    if (status === 'idle' && userId) {
      dispatch(fetchUserRecommendations(userId));
    }
  }, [dispatch, status, userId]);

  return {
    recommendations,
    isLoading: status === 'loading',
    isError:   status === 'failed',
    isSuccess: status === 'succeeded',
    refetch: () => userId && dispatch(fetchUserRecommendations(userId)),
  };
};