import axiosInstance from "./axiosInstance"


export const getUserRecommendations= async (userId)=>{
  const {data} = await axiosInstance.get(`/api/recommendations/user/${userId}`);
  return data;
};

export const getUserRecommendation = getUserRecommendations;

export const getActivityRecommendation= async (activityId)=>{
  const {data} = await axiosInstance.get(`/api/recommendations/user/activity/${activityId}`);
  return data;
}