import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  segments: {
    zoekMedewerker: { open: true },
  },
  results: [],
};

const fill = (state, action) => {
    state.results = action.payload;
    return state;
}

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
  name: "searchEmployee",
  initialState,
  reducers: {
    open: open,
    close: close,
    fill: fill
  }
})