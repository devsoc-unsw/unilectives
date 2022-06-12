import styled from "styled-components";
import { FooterWave } from "../image/imageIndex";

export const FooterWrapper = styled.div`
  background-image: url(${FooterWave});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  padding: 2.3rem 2rem;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const Logo = styled.img`
  margin-top: 2rem;
`;
