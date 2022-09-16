import { useState, useEffect } from "react";
import {
  Link
} from "react-router-dom";
import { Container, CourseTerms, Text, Flexbox } from "./style";
import { AllRatingsBox, RatingBox, RatingTitle, RatingNum, OutOfRating, CategoryRating } from "./style";
import Rating from '@mui/material/Rating';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { mockCourses } from '../../stubbing/data'

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
  const [rating, setRating] = useState<number | null>(5);

  const [clamped, setClamped] = useState<boolean>(true);
  const [showButton, setShowButton] = useState<boolean>(true);
  
  const [courseTerms, setCourseTerms] = useState<number[]>([]);
  const [courseDesc, setCourseDesc] = useState<string>();

  const handleClick = () => setClamped(!clamped)

  useEffect(() => {
    const result = mockCourses.find((obj) => {
      return obj.courseCode === course;
    });
    setCourseDesc(result.description);
    // console.log(typeof(result.terms));
    setCourseTerms(result.terms);
    setRating(result.rating);
  }, [course]);


  return (
    <Container>
      <Flexbox>
        {courseTerms.map((term: any) => (
          <CourseTerms key={term}>
            <Text fontFamily={"Roboto"} fontWeight={"regular"} fontSize="15px">
              Term {term}
            </Text>
          </CourseTerms>
        ))}
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
          value={rating}
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
      <Text>
        {courseDesc}
      </Text>

      {showButton && (
        <button onClick={handleClick}>Read {clamped ? "more" : "less"}</button>
      )}
    </Container>
  );
}

export default CourseSummary;