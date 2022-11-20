import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export const CourseContainer = styled.div`
  width: 80vw;
`;

export const Flexbox = styled.div<FlexboxProps>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  width: 80vw;
  gap: 5vh;
  padding-bottom: 5vh;
`;

interface FlexboxProps {
  direction?: string;
}

export const FlexboxComponent = styled.div<FlexboxComponentProps>`
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width}%;
`;

interface FlexboxComponentProps {
  width?: string;
}
