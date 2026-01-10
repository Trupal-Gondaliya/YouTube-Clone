import  { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js"
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// using combineReducers makes it easier to add more features later.
const rootReducer = combineReducers({ user: userReducer });

// Defines how and where we want to save our Redux state.
const persistConfig = {
  key: 'root', // The key used in LocalStorage
  storage, // Defaults to LocalStorage for web
  version: 1, // Useful for migrations if you change your state structure later
};

// This wraps our rootReducer with the persistence logic.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// This is the central hub of your application's data.
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);