import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { reducer as createSession } from '../reducer/createSession.js'
import { reducer as searchEmployee } from '../reducer/searchEmployee.js'
import { reducer as user } from '../reducer/user.js'

export const store = configureStore({
  reducer: combineReducers({
    createSession: createSession,
    searchEmployee: searchEmployee,
    user: user
  })
})
/**
 * To add reducer add inside combineReducers{}
 * {reducer name}: {imported reducer slice}
 * */