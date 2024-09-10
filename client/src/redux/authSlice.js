import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode' // Corrected import

export const login = createAsyncThunk('/auth/login', async (credentials, thunkAPI) => {
  try {
    console.log(credentials)
    const res = await axios.post('http://localhost:3000/api/auth/login', {
      username: credentials.username,
      password: credentials.password,
    });
    console.log(res.data)
    const token = res.data;
    const user = jwtDecode(token);
    console.log(user)
    return {
      token,
      user,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    token: null,
    error: false,
    status: 'idle',
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem('USER_DATA');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'successful';
        state.token = action.payload.token;
        state.currentUser = action.payload.user;
        localStorage.setItem('USER_DATA', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
