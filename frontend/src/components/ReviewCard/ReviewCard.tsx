import * as React from "react";
import { Container } from "./style";
import { IReview } from "src/interfaces/ResponseInterface";

type ReviewCardProps = {
  review: IReview;
};

const ReviewCard = () => {

  return (
    <Container>
      ReviewCard
    </Container>
  );
};

export default ReviewCard;