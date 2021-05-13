import { createSlice } from "@reduxjs/toolkit";

const userState = JSON.parse(localStorage.getItem("user_state")) || { };

const initialState = {
  role: userState.role,
  username: userState.role,
};

const setRole = (state, action) => {
  state.role = action;
  return state;
}

const setUsername = (state, action) => {
  state.username = action;
  return state;
}

const setState = (state, action) => {
  state = action;
  return state;
}

export const { actions, reducer } = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRole: setRole,
    setUsername: setUsername,
    setState: setState,
  }
})