import axiosInstance from './axiosInstance';

export const getUserActivities= async()=>{
  const{data}= await axiosInstance.get('/api/activities');
  return data;
};

export const createActivity= async(activityData)=>{
  const {data}= await axiosInstance.post('/api/activities',activityData);
  return data;
};

export const getActivityById= async (activityId)=>{
  const {data}= await axiosInstance.get(`/api/activities/${activityId}`);
  return data;
};