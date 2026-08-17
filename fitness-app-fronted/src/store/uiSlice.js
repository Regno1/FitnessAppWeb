// src/store/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    toast: null,              // { message, type: 'success'|'error'|'info' }
    isModalOpen: false,
    modalContent: null,
  },
  reducers: {
    showToast: (state, action) => {
      state.toast = action.payload; // { message: 'Activity logged!', type: 'success' }
    },
    clearToast: (state) => {
      state.toast = null;
    },
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalContent = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalContent = null;
    },
  },
});

export const { showToast, clearToast, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
export const selectToast = (state) => state.ui.toast;
export const selectModal = (state) => state.ui.isModalOpen;
