import CircleRounded from "@mui/icons-material/CircleRounded";
import styled from "styled-components";
import { palette } from "../palette/palette";

export const ReviewContainer = styled.div`
  width: 100%;
  border-top: 2px solid #E8E8E8;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: space-between;
`;

export const ReviewHeadings = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 4px;
  align-items: center;
`;

export const OverallRating = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

export const Ratings = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 10px;
`;

export const IndivRating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RatingNumber = styled.div`
  padding-top: 10px;
  font-size: 15pt;
`;

export const ReviewTitle = styled.p`
  font-size: 14pt;
  font-weight: 500;
  // add right padding
  padding-right: 2rem;
`;

export const ReviewText = styled.p`
  float: left;
  white-space: pre-line;
`;

export const ReviewTime = styled.p`
  float: right;
  font-weight: 500;
`;

export const Interactions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CourseInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 28px 28px 28px 28px;
`;

export const InteractButton = styled.button`
  background: ${palette.dayWhite};
  color: ${palette.dayNavy};
  border: none;
  cursor: pointer;
  padding-left: 0;
`;

export const CircleFilledIcon = styled(CircleRounded)`
  color: ${palette.dayNavy};
  margin-right: 0.5rem;
`;

export const CircleEmptyIcon = styled(CircleRounded)`
  color: "#D6D6D6";
  margin-right: 0.5rem;
`;

export const CourseText = styled.div`
  font-size: 15pt;
  color: grey;
`;

// the margin bottom and background color are just to cover the grey line on top of
// review card for now
export const OwnReviewHeader = styled.div`
  padding: 1rem;
  background-color: white;
  margin-bottom: -15px;
  z-index: 10;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  color: grey;
`;