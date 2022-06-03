import styled from "styled-components";
import landingCurve from "src/assets/curves/landingCurve.svg";
import laptopGraphic from "src/assets/graphics/laptop.svg";
import reviewGraphic from "src/assets/graphics/review.svg";

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

export const Flexbox = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FlexboxComponent = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 50%;
`;

export const Button = styled.button``;

export const LandingGraphic = styled.img.attrs({
  src: `${reviewGraphic}`
})`
  width: 50%;
`; 

export const Logo = styled.img`
  width: 50%;
`;