import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../supabase/client";

export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, { dispatch }) => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        dispatch(signIn.fulfilled(session.user));
      } else if (event === "SIGNED_OUT") {
        dispatch(signOut.fulfilled());
      }
    });
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      const user = JSON.stringify(data.user);
      localStorage.setItem("user", user);
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearAuthState(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
      })
      .addCase(signOut.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
