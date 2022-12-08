import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HTTPError } from "ky";
import { RootState } from "../../store";
import {
  IPostReviewRequestBody,
  IPostReviewResponse,
  IReview,
} from "src/interfaces/ResponseInterface";
import { postReview } from "src/logic/functions/postReview.function";

export const postReviewDispatch = createAsyncThunk<
  IPostReviewResponse,
  IPostReviewRequestBody,
  { state: RootState }
>("review/postReviewDispatch", async (req, { rejectWithValue }) => {
  try {
    const res = (await postReview(req)) as IPostReviewResponse;
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
});

export enum LoadingStatusTypes {
  IDLE = "IDLE",
  POST_REVIEW_LOADING = "POST_REVIEW_LOADING",
  POST_REVIEW_FAILED = "POST_REVIEW_FAILED",
  POST_REVIEW_COMPLETED = "POST_REVIEW_COMPLETED",
}

export interface ReviewState {
  reviews: IReview[];
  loadingStatus: LoadingStatusTypes;
  error: any;
}

export const initialState: ReviewState = {
  reviews: [],
  loadingStatus: LoadingStatusTypes.IDLE,
  error: null,
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    updateReviews: (state, action: PayloadAction<IReview[]>) => ({
      ...state,
      reviews: action.payload,
    }),
    clearLoadingStatus: (state) => ({
      ...state,
      loadingStatus: LoadingStatusTypes.IDLE,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(postReviewDispatch.fulfilled, (state, action) => ({
      ...state,
      loadingStatus: LoadingStatusTypes.POST_REVIEW_COMPLETED,
      reviews: [...state.reviews, action.payload.review],
    }));
    builder.addCase(postReviewDispatch.pending, (state) => {
      state.loadingStatus = LoadingStatusTypes.POST_REVIEW_LOADING;
    });
    builder.addCase(postReviewDispatch.rejected, (state, action) => {
      state.error = action.payload ? action.payload : action.error;
      state.loadingStatus = LoadingStatusTypes.POST_REVIEW_FAILED;
    });
  },
});

export const { updateReviews, clearLoadingStatus } = reviewSlice.actions;

export const selectReview = (state: RootState) => state.review;
export const selectReviews = (state: RootState) => state.review.reviews;
export const selectReviewLoadingStatus = (state: RootState) =>
  state.review.loadingStatus;
export const selectReviewLoadingError = (state: RootState) =>
  state.review.error;

export default reviewSlice.reducer;
