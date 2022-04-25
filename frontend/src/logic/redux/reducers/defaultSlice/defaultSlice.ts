import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HTTPError } from "ky";
import { RootState } from "../../store";

export const getAppDispatch = createAsyncThunk<{}, void, { state: RootState }>(
  "default/getAppDispatch",
  async (_, { rejectWithValue }) => {
    try {
      const res = {};
      return res;
    } catch (err) {
      if (err instanceof HTTPError) {
        return rejectWithValue({
          name: err.name,
          message: err.message,
          code: err.response.status,
          stack: err.stack,
        });
      }
      throw err;
    }
  }
);

export enum LoadingStatusTypes {
  IDLE = "IDLE",
  GET_DEFAULT_LOADING = "GET_DEFAULT_LOADING",
  GET_DEFAULT_FAILED = "GET_DEFAULT_FAILED",
  GET_DEFAULT_COMPLETED = "GET_DEFAULT_COMPLETED",
}

export interface DefaultState {
  app: {};
  loadingStatus: LoadingStatusTypes;
  error: any;
}

export const initialState: DefaultState = {
  app: {},
  loadingStatus: LoadingStatusTypes.IDLE,
  error: null,
};

export const defaultSlice = createSlice({
  name: "default",
  initialState,
  reducers: {
    updateApp: (state, action: PayloadAction<{}>) => ({
      ...state,
      app: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getAppDispatch.fulfilled, (state, action) => ({
      ...state,
      loadingStatus: LoadingStatusTypes.GET_DEFAULT_COMPLETED,
      app: action.payload,
    }));
    builder.addCase(getAppDispatch.pending, (state) => {
      state.loadingStatus = LoadingStatusTypes.GET_DEFAULT_LOADING;
    });
    builder.addCase(getAppDispatch.rejected, (state, action) => {
      state.error = action.payload ? action.payload : action.error;
      state.loadingStatus = LoadingStatusTypes.GET_DEFAULT_FAILED;
    });
  },
});

export const { updateApp } = defaultSlice.actions;

export const selectAPP = (state: RootState) => state.app;
export const selectAPPLoadingStatus = (state: RootState) =>
  state.app.loadingStatus;
export const selectAPPLoadingError = (state: RootState) => state.app.error;

export default defaultSlice.reducer;
