import styled from "styled-components";
import landingCurve from "src/assets/curves/curve.svg";
import laptop from "src/assets/graphics/laptop.svg";

export const Content = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${landingCurve});
  background-size: cover;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button``;

export const Background = styled.img.attrs({
  src: `${landingCurve}`
})`
  width: 100%;
  height: 100%;
`;