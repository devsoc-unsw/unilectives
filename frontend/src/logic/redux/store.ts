import { configureStore } from "@reduxjs/toolkit";
import { defaultSlice } from "./reducers/defaultSlice/defaultSlice";

export const store = configureStore({
  reducer: {
    app: defaultSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
