import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['user/updateNotifications'],
      // Ignore these field paths in all actions
      ignoredActionPaths: ['payload.timestamp'],
      // Ignore these paths in the state
      ignoredPaths: ['user.notifications'],
    },
  }),
});
