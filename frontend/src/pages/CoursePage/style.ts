import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CourseContainer = styled.div`
  width: 80%;
`;

export const CoursePage = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  padding-top: 50px;
  padding: 50px 10px 10px 10px;
  gap: 20px;

  @media screen (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const ReviewContainer = styled.div`
  width: 850px;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  padding-top: 20px;
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
  padding-top: 24px;
`;

export const IndivRating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const Flexbox = styled.div`
  display: flex;
  flex-direction: row;
`;

interface FlexboxProps {
  width?: string;
}

export const FlexboxComponent = styled.div<FlexboxProps>`
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};
`;
