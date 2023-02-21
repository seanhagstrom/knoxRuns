import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser',
  async ({ email, password, formname: name }) => {
    try {
      const formResponse = await fetch(`auth/${name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const formData = await formResponse.json();

      if (formData.token) {
        // Temporary to get auth working.
        localStorage.setItem('token', formData.token);

        const response = await fetch(`auth/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${formData.token}`,
          },
        });

        const data = await response.json();

        return data;
      } else {
        return {};
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const getMe = createAsyncThunk('auth/setAuth', async () => {
  try {
    const token = localStorage.token;

    if (!token) {
      return {};
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

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    authenticateUser: {
      reducer(state, action) {
        action.payload;
      },
    },
    setAuth: {
      reducer(state, action) {
        action.payload;
      },
    },
    updateUser: {
      reducer(state, action) {
        state.user = action.payload;
      },
    },
    logoutUser: {
      reducer(state, action) {
        state.user = action.payload;
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
      })
      .addCase(authenticateUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

export const { logoutUser, updateUser } = authSlice.actions;

export const currentUser = (state) => state.user.user;

export default authSlice.reducer;
