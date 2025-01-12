import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  user: null,
  state: "ideal",
  isAuthenticated: false,
};

export const handleUserSignUpAction = createAsyncThunk(
  "/auth/signup",
  async (FormData) => {
    try {
      const response = await axios.post(
        "https://careercruise-4kbt.onrender.com/api/auth/signup",
        FormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const handleUserSignInAction = createAsyncThunk(
  "/auth/signin",
  async (FormData) => {
    try {
      const response = await axios.post(
        "https://careercruise-4kbt.onrender.com/api/auth/signin",
        FormData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const handleUserSignOutAction = createAsyncThunk(
  "/auth/signout",
  async (FormData) => {
    try {
      const response = await axios.get(
        "https://careercruise-4kbt.onrender.com/api/auth/signout",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const handleUserUpdateProfileAction = createAsyncThunk(
  "/auth/profile/update",
  async (FormData) => {
    try {
      const response = await axios.post(
        "https://careercruise-4kbt.onrender.com/api/auth/profile/update",
        FormData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleUserSignUpAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleUserSignUpAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.status ? action.payload.user : null;
        state.isAuthenticated = action.payload.status ? true : false;
      })
      .addCase(handleUserSignUpAction.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(handleUserSignInAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleUserSignInAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.status ? action.payload.user : null;
        state.isAuthenticated = action.payload.status ? true : false;
      })
      .addCase(handleUserSignInAction.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(handleUserSignOutAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleUserSignOutAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(handleUserSignOutAction.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(handleUserUpdateProfileAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleUserUpdateProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.status ? action.payload.user : null;
        state.isAuthenticated = action.payload.status ? true : false;
      })
      .addCase(handleUserUpdateProfileAction.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const getUserInfo = (state) => state.user.user;
export const getIsLoading = (state) => state.user.state;
export const getIsAuthenticated = (state) => state.user.isAuthenticated;

export default userSlice.reducer;
export const {} = userSlice.actions;
