import axiosInstance from "./axiosInstance";

export const loginUser = async (loginRequest) => {
  const { data } = await axiosInstance.post('/api/auth/login', loginRequest);
  return data; // { token, id, email, firstName, lastName, role }
};

export const registerUser = async (registerRequest) => {
  const { data } = await axiosInstance.post('/api/auth/register', registerRequest);
  return data; // { token, id, email, firstName, lastName, role }
};

export const getUserProfile = async (userId) => {
  const { data } = await axiosInstance.get(`/api/user/${userId}`);
  return data;
};
