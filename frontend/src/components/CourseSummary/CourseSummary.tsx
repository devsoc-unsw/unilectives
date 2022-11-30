import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, CourseTerms, Text, Flexbox } from "./style";
import {
  AllRatingsBox,
  RatingBox,
  RatingTitle,
  RatingNum,
  OutOfRating,
  CategoryRating,
} from "./style";
import Rating from "@mui/material/Rating";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ICourse } from "src/interfaces/ResponseInterface";

type CourseSummaryProps = {
  course: ICourse;
  enjoyabilityRating: number;
  usefulnessRating: number;
  manageabilityRating: number;
  noReviews: number;
};

const CourseSummary = ({
  course,
  enjoyabilityRating,
  usefulnessRating,
  manageabilityRating,
  noReviews,
}: CourseSummaryProps) => {
  // TODO: Set value for rating through logic
  const [rating] = useState<number | null>(5);

  const [clamped, setClamped] = useState<boolean>(true);
  const [showButton, setShowButton] = useState<boolean>(true);

  const handleClick = () => {
    setClamped(!clamped);
    setShowButton(!showButton);
  };

  return (
    <Container>
      <Flexbox>
        {course.terms.map((term: any) => (
          <CourseTerms key={term}>
            <Text fontFamily={"Roboto"} fontWeight={"regular"} fontSize="15px">
              Term {term}
            </Text>
          </CourseTerms>
        ))}
      </Flexbox>
      <Link
        color={"#38B2E5"}
        target="_blank"
        to={`//www.handbook.unsw.edu.au/undergraduate/courses/2023/${course.courseCode}`}
      >
        <Flexbox>
          <OpenInNewIcon style={{ fill: "#38B2E5" }} />
          {course.courseCode} Handbook Page
        </Flexbox>
      </Link>
      <Flexbox>
        <Rating
          name="read-only"
          value={rating}
          readOnly
          sx={{
            "& .MuiRating-iconFilled": {
              color: "#326BF7",
              fontSize: "1.7rem",
            },
            "& .MuiRating-iconEmpty": {
              fontSize: "1.7rem",
            },
          }}
        />
        <Text color={"#808080"}>{noReviews} reviews</Text>
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
      <Text fontWeight={"bold"}>Course Description</Text>
      <Text>{course.description}</Text>

      {showButton && (
        <Text onClick={handleClick}>Read {clamped ? "more" : "less"}</Text>
      )}
    </Container>
  );
};

export default CourseSummary;
