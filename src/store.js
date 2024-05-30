import { configureStore } from "@reduxjs/toolkit";
import logsReducer from "./features/logs/logsSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    logs: logsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
