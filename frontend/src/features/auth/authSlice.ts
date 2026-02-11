import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, verifyToken } from "../auth/authAPI";

export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }) => {
    return await loginUser(data);
  }
);

export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await verifyToken(token);
      return { user: response.user, token };
    } catch (error) {
      localStorage.removeItem("token");
      return rejectWithValue("Token verification failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null as any,
    token: localStorage.getItem("token"),
    loading: true,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      state.loading = false;
    });
    builder.addCase(restoreSession.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    });
    builder.addCase(restoreSession.rejected, (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
    });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
