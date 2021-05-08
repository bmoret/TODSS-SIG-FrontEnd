import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  open: true
};

export const { actions, reducer } = createSlice({
  name: "segment",
  initialState,
  reducers: {
    open: (state, action) => {
      state.open = true;
      return state;
    },
    close: (state, action) => {
      state.open = false;
      return state;
    },
  }
})