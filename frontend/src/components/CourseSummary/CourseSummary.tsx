import { useState } from "react";
import { Container, CourseTerms, Text, Flexbox } from "./style";
import { AllRatingsBox, RatingBox, RatingTitle, RatingNum, OutOfRating, CategoryRating } from "./style";
import Rating from '@mui/material/Rating';

type CourseSummaryProps = {
  enjoyabilityRating: number,
  usefulnessRating: number,
  manageabilityRating: number,
}

const CourseSummary = ({enjoyabilityRating,
                        usefulnessRating,
                        manageabilityRating,
                      }: CourseSummaryProps) => {

  // TODO: Set value for rating through logic
  const [value, setValue] = useState<number | null>(5);

  return (
    <Container>
      Hello
      <Flexbox>
        <CourseTerms>
          <Text fontFamily={"Roboto"} fontWeight={"regular"} fontSize="15px">
            Term 1
          </Text>
        </CourseTerms>
        <CourseTerms>
          <Text fontFamily={"Roboto"} fontWeight={"regular"} fontSize="15px">
            Term 2
          </Text>
        </CourseTerms>
        <CourseTerms>
          <Text fontFamily={"Roboto"} fontWeight={"regular"} fontSize="15px">
            Term 3
          </Text>
        </CourseTerms>
      </Flexbox>
      <Rating 
        name="read-only"
        value={value}
        readOnly
        sx={{
          '& .MuiRating-iconFilled': {
            color: '#326BF7',
          },
        }}
      />
      <AllRatingsBox>
        <RatingBox>
          <RatingTitle>Enjoyability</RatingTitle>
          <CategoryRating>
            <RatingNum>{enjoyabilityRating}</RatingNum>
            <OutOfRating>/5</OutOfRating>
          </CategoryRating>
        </RatingBox>
        <RatingBox>
          <RatingTitle>Usefulness</RatingTitle>
          <CategoryRating>
            <RatingNum>{usefulnessRating}</RatingNum>
            <OutOfRating>/5</OutOfRating>
          </CategoryRating>
        </RatingBox>
        <RatingBox>
          <RatingTitle>Manageability</RatingTitle>
          <CategoryRating>
            <RatingNum>{manageabilityRating}</RatingNum>
            <OutOfRating>/5</OutOfRating>
          </CategoryRating>
        </RatingBox>
      </AllRatingsBox>
    </Container>
  );
}

export default CourseSummary;