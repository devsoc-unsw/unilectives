import styled from "styled-components";
import landingCurve from "src/assets/curves/landingCurve.svg";

export const Content = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${landingCurve});
  background-size: cover;
  background-position: top right;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button``;

export const Graphic = styled.img`
`;

export const Flexbox = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FlexboxComponent = styled.div`
  justify-content: center;
  align-items: center;
  padding: 15rem;
  width: 50%;
`;

/** Landing Page CSS for Text  */
export const LatoText = styled.text`
  font-family: 'Lato', sans-serif;
  font-size: 15px;
  font-weight: 500;
`;

export const PoppinsText = styled.text`
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  font-size: 70px;
  color: #1279F2;
`;

export const TextFlexbox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextFlexboxComponent = styled.div`
  align-items: center;
  text-align: start;
`;