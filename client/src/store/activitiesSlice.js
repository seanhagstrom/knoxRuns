import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const setActivities = createAsyncThunk('api/setActivities', async () => {
  try {
    const token = localStorage.token;

    if (!token) {
      return [];
    }
    const response = await fetch(`api/activities`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
});

const activitiesSlice = createSlice({
  name: 'activities',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setActivities: {
      reducer(state, action) {
        action.payload;
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(setActivities.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(setActivities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(setActivities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

export default activitiesSlice.reducer;
