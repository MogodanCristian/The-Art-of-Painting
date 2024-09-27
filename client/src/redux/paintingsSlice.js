import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk for creating a painting
export const createPaintings = createAsyncThunk(
  'paintings/create-painting', // Slice and action name
  async (data, thunkAPI) => {
    try {
      const res = await axios.post('http://localhost:3000/api/paintings/create-painting', {
        image: data.image,
        artist: data.artist,
        year: data.year,
        value: data.value,
      });

      return res.data; // Return the response data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message }); // Handle errors properly
    }
  }
);

// Async Thunk for fetching all paintings
export const getAllPaintings = createAsyncThunk(
  'paintings/get-all-paintings', // Slice and action name
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('http://localhost:3000/api/paintings/get-all-paintings');
      return res.data; // Return the fetched data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message }); // Handle errors properly
    }
  }
);

// Paintings Slice
const paintingsSlice = createSlice({
  name: 'paintings',
  initialState: {
    list: [], // List to hold the fetched paintings
    status: 'idle', // Status can be 'idle', 'loading', 'successful', or 'failed'
    error: null, // Error state to capture any errors
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle the pending, fulfilled, and rejected states for creating a painting
      .addCase(createPaintings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPaintings.fulfilled, (state, action) => {
        state.status = 'successful';
        state.list.push(action.payload); // Add the new painting to the list
      })
      .addCase(createPaintings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      })

      // Handle the pending, fulfilled, and rejected states for fetching all paintings
      .addCase(getAllPaintings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllPaintings.fulfilled, (state, action) => {
        state.status = 'successful';
        state.list = action.payload; // Replace the list with the fetched paintings
      })
      .addCase(getAllPaintings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      });
  },
});

export default paintingsSlice.reducer;
