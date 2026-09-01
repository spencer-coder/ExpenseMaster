import { createSlice } from "@reduxjs/toolkit";

const loadSettingsFromLocalStorage = () => {
  const savedSettings = localStorage.getItem("settings");
  return savedSettings ? JSON.parse(savedSettings) : { theme: "system", currency: "USD" };
};

const defaultSettings = loadSettingsFromLocalStorage();

export const initialState = {
  settings: defaultSettings,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    reset: (state) => {
      localStorage.removeItem("settings");
      state.settings = defaultSettings;
    },
    updateSettings: (state, action) => {
      state.settings = action.payload;
      localStorage.setItem("settings", JSON.stringify(action.payload));
    },
  },
});

export const { reset, updateSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
