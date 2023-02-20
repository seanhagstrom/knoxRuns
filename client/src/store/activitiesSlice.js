import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { testActivityOne: 'this is the initial state in activities' },
  { testActivityTwo: 'this is the initial state in activities' },
];

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {},
});

export default activitiesSlice.reducer;
