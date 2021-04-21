import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { reducer as createSession } from '../reducer/createSession.js'

export const store = configureStore({
  reducer: combineReducers({
    createSession: createSession
  })
})
/**
 * To add reducer add inside combineReducers{}
 * {reducer name}: {imported reducer slice}
 * */