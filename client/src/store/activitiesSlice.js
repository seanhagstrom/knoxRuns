import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    testDescription:
      'this is the initial state in activities for activity number 1!',
  },
  {
    id: 2,
    testDescription:
      'this is the initial state in activities for activity number 2!',
  },
];

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {},
});

export default activitiesSlice.reducer;
