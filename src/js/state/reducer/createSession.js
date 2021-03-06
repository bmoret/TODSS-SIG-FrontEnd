import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  segments: {
    inhoud: { open: true },
    soort: { open: true },
    tijdsindeling: { open: true },
  }
};
const open = (state, action) => {
  if(state.segments.hasOwnProperty(action.payload.title)) {
    state.segments[action.payload.title].open = true;
  }
  return state;
}

const close = (state, action) => {
  if(state.segments.hasOwnProperty(action.payload.title)) {
    state.segments[action.payload.title].open = false;
  }
  return state;
}

export const { actions, reducer } = createSlice({
  name: "createSession",
  initialState,
  reducers: {
    open: open,
    close: close,
  }
})