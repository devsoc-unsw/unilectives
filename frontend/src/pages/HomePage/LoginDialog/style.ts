import { lightPalette } from "src/components/palette/lightPalette";
import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: -webkit-fill-available;
  padding: 1rem 3rem;
`;

export const Button = styled.button`
  margin-top: 1.5rem;
  padding: 1rem 4rem;
  background: ${lightPalette.secondary};
  border-radius: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${lightPalette.background};
  border: none;
`;

export const Input = styled.input`
  border-top: none;
  border-right: none;
  border-left: none;
  border-color: ${lightPalette.secondary};
  border-width: 0.1rem;
  box-sizing: border-box;
  margin-bottom: 1rem;
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Error = styled.div`
  color: rgb(194, 7, 7);
  background-color: rgb(253, 246, 246);
  border-color: rgb(222, 117, 117);
  border-width: 1px;
  border-style: solid;
  border-radius: 3px;
  width: 100%;
  margin: 3px auto;
  padding: 3px 5px;
`;
