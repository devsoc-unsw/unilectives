import {
  Container,
  CourseCodeBox,
  CourseCode,
  CourseName,
  Button,
  Text,
} from "./style";

type CourseHeaderProps = {
  courseCode: string,
  overallRating: number,
  enjoyabilityRating: number,
  usefulnessRating: number,
  manageabilityRating: number,
  noReviews: number,
}

const CourseHeader = ({ courseCode, }: CourseHeaderProps) => {

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
