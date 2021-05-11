import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { reducer as createSession } from '../reducer/createSession.js'
import { reducer as searchEmployee } from '../reducer/searchEmployee.js'

export const store = configureStore({
  reducer: combineReducers({
    createSession: createSession,
    searchEmployee: searchEmployee
  })
})
/**
 * To add reducer add inside combineReducers{}
 * {reducer name}: {imported reducer slice}
 * */