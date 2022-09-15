import { useState } from "react";
import {
  Link
} from "react-router-dom";
import { Container, CourseTerms, Text, Flexbox } from "./style";
import { AllRatingsBox, RatingBox, RatingTitle, RatingNum, OutOfRating, CategoryRating } from "./style";
import Rating from '@mui/material/Rating';
// import Link from '@mui/material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

type CourseSummaryProps = {
  course: string,
  enjoyabilityRating: number,
  usefulnessRating: number,
  manageabilityRating: number,
  noReviews: number,
}

const CourseSummary = ({course,
                        enjoyabilityRating,
                        usefulnessRating,
                        manageabilityRating,
                        noReviews,
                      }: CourseSummaryProps) => {

  // TODO: Set value for rating through logic
  const [value, setValue] = useState<number | null>(5);

  const [clamped, setClamped] = useState<boolean>(true);
  const [showButton, setShowButton] = useState<boolean>(true);

  const handleClick = () => setClamped(!clamped)

  const openHandbook = () => {
    window.open(`www.handbook.unsw.edu.au/undergraduate/courses/2023/${course}`, "_blank", "noopener noreferrer");
  };

  return (
    <Container>
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
      <Link color={'#38B2E5'} target="_blank" to={`//www.handbook.unsw.edu.au/undergraduate/courses/2023/${course}`}>
        <Flexbox>
          <OpenInNewIcon style={{ fill: '#38B2E5' }} />
          {course} Handbook Page
        </Flexbox>
      </Link>
      <Flexbox>
        <Rating 
          name="read-only"
          value={value}
          readOnly
          sx={{
            '& .MuiRating-iconFilled': {
              color: '#326BF7',
              fontSize: '1.7rem',
            },
          }}
        />
        <Text color={'#808080'}>
          {noReviews} reviews
        </Text>
      </Flexbox>
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
      <Text fontWeight={"bold"}>
        Course Description
      </Text>

      {showButton && (
        <button onClick={handleClick}>Read {clamped ? "more" : "less"}</button>
      )}
    </Container>
  );
}

export default CourseSummary;