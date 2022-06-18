import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import styled from "styled-components";

// make icon component
export const StarIcon = styled(StarRoundedIcon)`
  color: #ced9dd;
  cursor: pointer;
  &:hover {
    color: #ffe380;
  }
`;

export const CircleIcon = styled(CircleRoundedIcon)`
  color: #ced9dd;
  margin-right: 0.5rem;
  cursor: pointer;
  &:hover {
    color: #478ef9;
  }
`;
