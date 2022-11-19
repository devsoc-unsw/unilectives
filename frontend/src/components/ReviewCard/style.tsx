import styled from "styled-components";
import { palette } from "../palette/palette";

export const ReviewContainer = styled.div`
  width: 100%;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
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

export const ReviewText = styled.p`
  float: left;
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
