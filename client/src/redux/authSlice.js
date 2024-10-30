import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode' // Corrected import

const env = JSON.parse(JSON.stringify(import.meta.env));
const BASE_URL = env.VITE_ART_API_URL;

export const login = createAsyncThunk('/auth/login', async (credentials, thunkAPI) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, {
      username: credentials.username,
      password: credentials.password,
    });
    const token = res.data.USER_DATA.token;
    const user = jwtDecode(token);
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
    loginSuccess: (state, action) =>{
      state.isFetching = false;
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.error = false;
      localStorage.setItem("USER_DATA", JSON.stringify(action.payload));
  },
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
