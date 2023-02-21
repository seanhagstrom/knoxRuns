import { createSlice } from '@reduxjs/toolkit';

const activitiesSlice = createSlice({
  name: 'activities',
  initialState: {
    data: [{ activity_id: 1 }, { activity_id: 2 }, { activity_id: 3 }],
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
});

export default activitiesSlice.reducer;
