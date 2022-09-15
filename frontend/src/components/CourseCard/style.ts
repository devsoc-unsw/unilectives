import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  margin: 1rem;
  background: #fafafa;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 5px 5px 5px 2px #ededed;
  :hover {
    background: #f5f5f5;
    cursor: pointer;
  }
  height: 12rem;
  max-height: 12rem;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OverallBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3em;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Term = styled.div`
  background: #ffe380;
  border-radius: 1.5rem;
  padding: 0.5rem 1rem;
  margin: 0 0.25rem 1rem 0rem;
  width: fit-content;
`;
