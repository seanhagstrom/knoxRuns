import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
  'auth/authenticateUser',
  async ({ email, password, formname: name }) => {
    console.log(`in src/api/auth authenticateUser with formname: ${name}`);
    try {
      const response = await fetch(`auth/${name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.token) {
        // Temporary to get auth working.
        localStorage.setItem('token', data.token);
        return await getMe();
      }
      return;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getMe = createAsyncThunk('auth/setAuth', async () => {
  try {
    const token = localStorage.token;

    if (!token) {
      return null;
    }
    const response = await fetch(`auth/me`, {
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

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
  } catch (error) {
    console.error(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    setAuth: {
      reducer(state, action) {
        action.payload;
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMe.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
