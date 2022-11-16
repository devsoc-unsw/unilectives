import { palette } from "src/components/palette/palette";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
`;

export const Column = styled.div`
  display: flex;
  width: 50%;
  justify-content: left;
  flex-direction: column;
`;

export const NameBox = styled.div`
  justify-content: left;
  text-align: left;
  width: 100%;
  margin-left: 20%;
  margin-top: 2%;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-weight: bolder;
`;

export const CategoryBox = styled.div`
  text-align: left;
  font-size: 1.2rem;
`;

export const Button = styled.button`
  background-color: ${palette.dayWhite};
  font-size: 1rem;
  border: none;
  padding-left: 0.8rem; 
  color: gray;
  :focus {
    font-weight: bold;
    text-decoration: underline;
    color:${palette.dayBlue};
  }
`;

export const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const BookmarksHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const CardsBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;