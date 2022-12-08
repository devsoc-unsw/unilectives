import { IPostReviewRequestBody } from "src/interfaces/ResponseInterface";

export const setDevVars = () => {
  if (process.env.NODE_ENV === "development") {
    process.env.BACKEND_API_URI = "http://localhost:6969/api";
  }
};

export const canSubmit = (review: IPostReviewRequestBody) => {
  return (
    review.courseCode !== "" &&
    review.termTaken !== "" &&
    review.manageability !== 0 &&
    review.usefulness !== 0 &&
    review.enjoyability !== 0 &&
    review.overallRating !== 0
  );
};
