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

export const Graphic = styled.img`
`;

export const Flexbox = styled.div`
  display: flex;
  flex-direction: row;
`;

interface FlexboxProps {
  padding ?: string;
  padding_top ?: string;
  width ?: string;
}

export const FlexboxComponent = styled.div<FlexboxProps>`
  justify-content: center;
  align-items: center;
  padding-left: ${props => props.padding};
  padding-top: ${props => props.padding_top || props.padding};
  width: ${props => props.width || "50%"};
`;

/** Landing Page CSS for Text  */
export const TextFlexbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const HomeText = styled.text`
  align-items: center;
  text-align: start;
  font-family: ${({ fontFamily }) => fontFamily}, sans-serif;
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize};
  color: ${({ color }) => color};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`;

/**Button CSS */
export const ButtonFlexbox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

interface ButtonProps {
  bg ?: string;
}

export const Button = styled.button<ButtonProps>`
  border-radius: 20px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  padding: 15px 25px;
  background-color: ${props => props.bg || '#333'};
  color: #FFF;

  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
`
