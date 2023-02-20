import { createSlice } from '@reduxjs/toolkit';

const initialState = { test: 'this is the initial state in auth' };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default authSlice.reducer;
