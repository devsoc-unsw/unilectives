import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-bottom: 5vh;
`;

export const Logo = styled.img`
  margin-left: 5rem;
  margin-top: 1rem;
`;

interface WaveProps {
  displayWave ?: string
}

export const Wave = styled.img<WaveProps>`
  width: 100%;
  overflow: hidden;
  display: ${props => props.displayWave};
`;
