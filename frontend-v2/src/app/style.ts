import styled from "styled-components";
import landingCurve from "src/assets/curves/fullScreen.svg";

export const Content = styled.div`
  width: 100dvw;
  height: 100dvh;
  background-image: url(${landingCurve});
  // background-size: cover;
  background-size: 100vw;
  background-repeat: no-repeat;
  background-position: top;
  // background-attachment: scroll;
  overflow-x: hidden;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  align-items: left;
  position: relative;
`;

export const SmallContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HomeHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-bottom: 5vh;
  justify-content: flex-end;
  justify-content: space-between;
`;

export const Logo = styled.img`
  margin-left: 5rem;
  margin-top: 1rem;
`;

export const Flexbox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  justify-content: space-between;
`;

interface LandingFlexboxProps {
    padding?: string;
    padding_top?: string;
    width?: string;
  }

export const LandingFlexbox = styled.div<LandingFlexboxProps>`
  justify-content: center;
  align-items: center;
  padding-left: 0;
  padding-top: ${(props) => props.padding};
  width: 100%;
`;

/** Landing Page CSS for Text  */
export const LandingTextFlexbox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
  justify-content: space-between;
`;

interface TextFlexboxProps {
    padding?: string;
  }

/** Landing Page CSS for Text  */
export const TextFlexbox = styled.div<TextFlexboxProps>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: ${(props) => props.padding};
  justify-content: space-between;
`;

interface TextProps {
    fontFamily?: string;
    fontWeight?: string;
    fontSize?: string;
    fontStyle?: string;
    color?: string;
  }

export const HomeText = styled.text<TextProps>`
  align-items: center;
  justify-content: center;
  text-align: start;
  font-family: ${(props) => props.fontFamily}, sans-serif;
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize};
  font-style: ${(props) => props.fontStyle};
  color: ${(props) => props.color};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
`;

interface AddReviewButtonProps {
    padding?: string;
  }

/**Button CSS */
export const AddReviewButtonFlexbox = styled.div<AddReviewButtonProps>`
  display: flex;
  flex-direction: row;
  margin-right: ${(props) => props.padding};
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

interface ButtonProps {
  bg?: string;
  color?: string;
  justify?: string;
}

export const AddReviewButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 550;
  padding: 13px 28px;
  margin-top: 15px;
  background-color: ${(props) => props.bg || "#333"};
  color: ${(props) => props.color || "#FFF"};
  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
  float: right;
  height: 45px;
  margin-bottom: 15px;
`;

interface SearchbarFlexboxProps {
  padding?: string;
  padding_top?: string;
  width?: string;
}

export const SearchbarFlexbox = styled.div<SearchbarFlexboxProps>`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 0;
  padding-top: ${(props) => props.padding};
  width: 100%;
`;

interface SearchbarProps {
  padding?: string;
}

export const Searchbar = styled.div<SearchbarProps>`
  display: flex;
  margin-left: ${(props) => props.padding};
  margin-right: ${(props) => props.padding};
`;

export const WidgetFlexbox = styled.div<SearchbarProps>`
  display: flex;
  margin-left: ${(props) => props.padding};
  margin-right: ${(props) => props.padding};
  justify-content: space-between;
`

interface WidgetProps {
  padding?: string;
}

export const SortFlexbox = styled.div<WidgetProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: ${(props) => props.padding};
  margin-top: 1em;
  gap: 2.5em;
`


export const FilterFlexbox = styled.div<WidgetProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: ${(props) => props.padding};
  margin-top: 1em;
  gap: 2.5em;
`

export const WidgetOption = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5em;
`;

export const Arrow = styled.image`

`;

