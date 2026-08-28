import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:   JSON.parse(localStorage.getItem('user')) || null,
    token:  localStorage.getItem('token')  || null,
    userId: localStorage.getItem('userId') || null,
  },

  reducers: {
    // Called after login or register — payload: { token, id, email, firstName, lastName, role }
    login: (state, action) => {
      const { token, id, email, firstName, lastName, role } = action.payload;
      state.token  = token;
      state.userId = id;
      state.user   = { id, email, firstName, lastName, role };

      localStorage.setItem('token',  token);
      localStorage.setItem('userId', id);
      localStorage.setItem('user',   JSON.stringify(state.user));
    },

    // Legacy alias kept for backward compatibility
    setCredential: (state, action) => {
      const { token, user } = action.payload;
      state.token  = token;
      state.user   = user;
      state.userId = user?.id || user?.sub || null;

      localStorage.setItem('token',  token);
      localStorage.setItem('user',   JSON.stringify(user));
      localStorage.setItem('userId', state.userId);
    },

    logout: (state) => {
      state.user   = null;
      state.token  = null;
      state.userId = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
    },
  },
});

export const { login, setCredential, logout } = authSlice.actions;

// Selectors
export const selectUser       = (state) => state.auth.user;
export const selectToken      = (state) => state.auth.token;
export const selectUserId     = (state) => state.auth.userId;
export const selectIsLoggedIn = (state) => !!state.auth.token;

export default authSlice.reducer;