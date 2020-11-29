import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Services
import { auth, db } from '../../../firebase';

// Thunks
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    const { email, username, password } = userData;

    try {
      const user = await auth.createUserWithEmailAndPassword(email, password);
      const displayName = username.toLowerCase();
      const photoURL = `https://firebasestorage.googleapis.com/v0/b/insta-clone-prod.appspot.com/o/avatars%2Fguest.jpg?alt=media&token=b7a27863-1e43-47f5-8963-19d80c940444`;

      await user.user.updateProfile({
        displayName,
        photoURL,
      });

      db.collection('users')
        .doc(user.user.uid)
        .set({
          id: user.user.uid,
          name: displayName,
          avatar: photoURL,
          bio: '',
          following: [],
          followers: [],
          likedPosts: [],
        })
        .catch(error => rejectWithValue(error.message));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue }) => {
    const { email, password } = userData;
    try {
      await auth
        .signInWithEmailAndPassword(email, password)
        .catch(error => rejectWithValue(error.message));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    profile: {},
    notifications: [],
    registerError: null,
    loginError: null,
  },
  reducers: {
    authenticateUser: state => {
      state.isAuthenticated = true;
    },
    signOut: state => {
      state.isAuthenticated = false;
      state.notifications = [];
      state.profile = {};
    },
    updateProfile: (state, { payload }) => {
      state.profile = payload;
    },
    updateNotifications: (state, { payload }) => {
      state.notifications = payload;
    },
  },
  extraReducers: {
    [registerUser.rejected]: (state, { payload }) => {
      state.registerError = payload;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loginError = payload;
    },
  },
});

// Actions
export const {
  authenticateUser,
  signOut,
  updateProfile,
  updateNotifications,
} = userSlice.actions;
// // Selectors
export const selectIsAuthenticated = state => state.user.isAuthenticated;
export const selectProfile = state => state.user.profile;
export const selectRegisterError = state => state.user.registerError;
export const selectLoginError = state => state.user.loginError;
export const selectNotifications = state => state.user.notifications;

export default userSlice.reducer;
