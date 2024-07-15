import react from "react";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  theme: "light",
};
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
  extraReducers: (builder) => {},
});
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
