import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    comingSoonOpen: false,
  },
  reducers: {
    openComingSoon: (state) => {
      state.comingSoonOpen = true;
    },
    closeComingSoon: (state) => {
      state.comingSoonOpen = false;
    },
  },
});

export const { openComingSoon, closeComingSoon } = uiSlice.actions;
export default uiSlice.reducer;
