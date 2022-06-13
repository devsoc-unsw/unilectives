import { Container, CourseCodeBox, CourseCode, CourseName } from "./style";
import { OverallBox, OverallRow, OverallStars, NumReviews } from "./style";
import { AllRatingsBox, RatingBox, RatingTitle, RatingNum, OutOfRating, CategoryRating } from "./style";

import { Rating } from '@mui/material';
import { palette } from "../palette/palette";

type CourseHeaderProps = {
  courseCode: string,
  overallRating: number,
  enjoyabilityRating: number,
  usefulnessRating: number, 
  manageabilityRating: number,
  noReviews: number,
}

const CourseHeader = ({ courseCode, 
                        overallRating, 
                        enjoyabilityRating, 
                        usefulnessRating, 
                        manageabilityRating,
                        noReviews,
                      }: CourseHeaderProps) => {
    return (
      <Container>
        <CourseCodeBox>
          <CourseCode>{courseCode}</CourseCode>
          <CourseName>Data Structures and Algorithms</CourseName>
        </CourseCodeBox>
        <OverallBox>
          <Rating 
            name="read-only" 
            value={overallRating} 
            precision={0.1} 
            size="large" 
            sx={{
              color: palette.dayGreen,
              fontSize: "3em",
            }}
            readOnly
          />
          <OverallRow>
            <OverallStars>{overallRating} stars</OverallStars>
            <NumReviews>{noReviews} reviews</NumReviews>
          </OverallRow>
        </OverallBox>
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
  };

  
export default CourseHeader;
