import { configureStore, Store } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import entrySlice from './entrySlice';
import errorSlice from './errorSlice';

const storeOptions = {
  reducer: {
    entrySlice,
    userSlice,
    errorSlice,
  },
};

export const store: Store = configureStore(storeOptions);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
