import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  border: 2px solid #E8E8E8;
  border-radius: 20px;
  padding: 3em;
`;

export const CourseTerms = styled.div`
  background: #F6D0DC;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 15px;
  gap: 5px;
`;

interface TextProps {
  fontFamily?: string;
  fontWeight?: string;
  fontSize?: string;
  color?: string;
}

export const Text = styled.text<TextProps>`
  font-family: ${(props) => props.fontFamily}, sans-serif;
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color || "#000"};
  &:hover {
    cursor: pointer;
  }
`;

export const Flexbox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
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
`;