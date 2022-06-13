import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  margin: 0 10%;
`;

// Styles for course code and name section
export const CourseCodeBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CourseCode = styled.h1`
  font-size: 2.5em;
  margin: 0;
`;

export const CourseName = styled.h2`
  font-size: 1.5em;
  margin: 0;
`;

// Styles for overall rating section
export const OverallBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3em;
`;

export const OverallRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
  padding-top: 0.5em;
`;

export const OverallStars = styled.div`
  font-style: italic;
`;

export const NumReviews = styled.div`
  color: grey;
`;

// Styles for category ratings sections
export const AllRatingsBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-around;
`;
export const RatingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1em;
`;

export const RatingTitle = styled.p`
  font-weight: 500;
  font-size: 110%;
`;

export const RatingNum = styled.span`
  font-size: 2em;
`;

export const OutOfRating = styled.span`
  color: grey;
  display: flex;
  justify-content: flex-end;
`;

export const CategoryRating = styled.div`
  display: flex; 
  flex-direction: row;
  align-items: flex-end;
`