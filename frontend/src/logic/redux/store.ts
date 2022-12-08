import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/userSlice/userSlice";
import { courseSlice } from "./reducers/courseSlice/courseSlice";
import { reviewSlice } from "./reducers/reviewSlice/reviewSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    course: courseSlice.reducer,
    review: reviewSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
