import { createSlice } from '@reduxjs/toolkit';
import { register, loginization, logOut, refreshUser } from './operations';
import 'react-toastify/dist/ReactToastify.css';

// це для того щоб виводити помилки в тостах
const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const authSlise = createSlice({
  name: 'auth',
  initialState: {
    user: { email: null, password: null },
    token: null,
    isLoaggedIn: false,
    isRefreshing: false,
    error: null,
    isLoading: false,
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoaggedIn = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, handleRejected)

      .addCase(loginization.pending, handlePending)
      .addCase(loginization.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoaggedIn = true;
        state.isLoading = false;
      })
      .addCase(loginization.rejected, handleRejected)

      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, state => {
        state.user = { email: null, password: null };
        state.token = null;
        state.isLoaggedIn = false;
        state.isRefreshing = false;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(logOut.rejected, handleRejected)

      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoaggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.token = null;
      });
  },
});

export const authReduser = authSlise.reducer;
