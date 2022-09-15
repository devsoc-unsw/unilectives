import { useState } from "react";
import { Container, CourseCodeBox, CourseCode, CourseName, Button, Text } from "./style";

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

const CourseHeader = ({ courseCode, }: CourseHeaderProps) => {

  const [courseName, setCourseName] = useState<string>();

  return (
    <Container>
      <CourseCodeBox>
        <CourseCode>{courseCode}</CourseCode>
        <CourseName>Data Structures and Algorithms</CourseName>
      </CourseCodeBox>
      {/* TODO: Review Modal Popup */}
      <Button bg={'#8A96E4'}>
        <Text color={'#FFF'} fontSize={'18px'}>
          Add a Review
        </Text>
      </Button>
    </Container>
  );
  };


export default CourseHeader;
