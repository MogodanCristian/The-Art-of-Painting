import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const env = JSON.parse(JSON.stringify(import.meta.env));
const BASE_URL = env.VITE_ART_API_URL;

// Async Thunk for creating a painting
export const sendHackerRequest = createAsyncThunk(
  'paintings/hacker-request', // Slice and action name
  async (thunkAPI) => {
    const info = "You are going to have to define a route to the machine hosting the website. The username is: ------, and the password is ----------"
    try {
      const res = await axios.post(`${BASE_URL}/paintings/hacker-request`, {
        info
      });
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message }); // Handle errors properly
    }
  }
);

// Paintings Slice
const hackerSlice = createSlice({
  name: 'hacker',
  initialState: {
    status: 'idle', // Status can be 'idle', 'loading', 'successful', or 'failed'
    error: null, // Error state to capture any errors
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle the pending, fulfilled, and rejected states for creating a painting
      .addCase(sendHackerRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendHackerRequest.fulfilled, (state) => {
        state.status = 'successful';
      })
      .addCase(sendHackerRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      })
  },
});

export default hackerSlice.reducer;
