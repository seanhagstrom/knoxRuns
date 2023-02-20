import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bio: null,
  city: 'Knoxville ',
  created_on: '2023-02-18T22:43:57.293Z',
  email: 'sean@sean.com',
  email_allowed: true,
  firstname: 'Trail',
  is_verified: true,
  lastname: 'Runner',
  profile_image:
    'https://images.pexels.com/photos/12918264/pexels-photo-12918264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  sex: 'M',
  state: 'Tennessee ',
  user_id: 1,
  username: 'sean_hagstrom',
  verification_string: 'some string here :)',
  weight: '61.235',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default authSlice.reducer;
