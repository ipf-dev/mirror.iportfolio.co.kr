import { configureStore, combineReducers } from "@reduxjs/toolkit"

import absence from "./features/absence/absenceSlice"

const store = configureStore({
  reducer: combineReducers({
    absence,
  }),
})

export default store
