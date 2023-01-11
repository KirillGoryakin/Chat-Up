import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from './slices/AuthSlice';

const rootReducer = combineReducers({
  auth: authReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({serializableCheck: false}),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;