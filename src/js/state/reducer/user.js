import {createSlice} from "@reduxjs/toolkit";

const userState = () => {
  try {
    return JSON.parse(localStorage.getItem("user_state"))
  } catch (e) {
    return {
      isLoggedIn: false,
      role: undefined,
      username: undefined,
    }
  }
}

const initialState = userState();

const setRole = (state, action) => {
  state.role = action;
  return state;
}

const setUsername = (state, action) => {
  state.username = action;
  return state;
}

const setState = (state, action) => {
  state = action.payload;
  localStorage.setItem("user_state", JSON.stringify(action.payload))
  return state;
}

export const {actions, reducer} = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRole: setRole,
    setUsername: setUsername,
    setState: setState,
  }
})