import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../supabase/client";

export const fetchLogs = createAsyncThunk(
  "logs/fetchLogs",
  async (userId, { rejectWithValue }) => {
    if (!userId) {
      return rejectWithValue("User is not logged in");
    }
    try {
      const { data, error } = await supabase.rpc("fetch_time_logs", {
        p_user_id: userId,
      });
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveLog = createAsyncThunk(
  "logs/saveLog",
  async ({ duration, name, note, user_id }) => {
    const { data, error } = await supabase
      .from("time_logs")
      .insert([{ duration, name, note, created_at: new Date(), user_id }]);
    if (error) throw error;
    return data;
  }
);

export const deleteLog = createAsyncThunk("logs/deleteLog", async (logId) => {
  const { data, error } = await supabase
    .from("time_logs")
    .delete()
    .match({ id: logId });

  if (error) throw error;
  return data;
});

export const deleteAllLogs = createAsyncThunk(
  "logs/deleteAllLogs",
  async (userId, { rejectWithValue }) => {
    if (!userId) {
      return rejectWithValue("User is not logged in");
    }

    try {
      const { data, error } = await supabase
        .from("time_logs")
        .delete()
        .match({ user_id: userId });

      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const logsSlice = createSlice({
  name: "logs",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(saveLog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveLog.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(saveLog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteLog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteLog.fulfilled, (state, action) => {
        state.items = state.items.filter((log) => log.id !== action.meta.arg);
        state.status = "succeeded";
      })
      .addCase(deleteLog.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(deleteAllLogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAllLogs.fulfilled, (state) => {
        state.items = [];
        state.status = "succeeded";
      })
      .addCase(deleteAllLogs.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      });
  },
});

export default logsSlice.reducer;
