import { configureStore } from '@reduxjs/toolkit';
import user from './authSlice';
import activities from './activitiesSlice';
const store = configureStore({
  reducer: {
    user,
    activities,
  },
});

export default store;
