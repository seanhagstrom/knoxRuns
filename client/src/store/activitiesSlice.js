import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const setSummaryActivities = createAsyncThunk(
  'api/setSummaryActivities',
  async () => {
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
  }
);

const activitiesSlice = createSlice({
  name: 'activities',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setSummaryActivities: {
      reducer(state, action) {
        action.payload;
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(setSummaryActivities.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(setSummaryActivities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(setSummaryActivities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

export default activitiesSlice.reducer;
