import { useParams } from "react-router-dom";
import CourseHeader from "src/components/CourseHeader/CourseHeader";
import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import { Container, CourseContainer } from "./style";

type ParamTypes = {
    courseCode: string
}

const CoursePage = () => {
  const { courseCode } = useParams<keyof ParamTypes>() as ParamTypes;

  return (
    <Container>
      <Header />
      <CourseContainer>
        <CourseHeader
          courseCode={courseCode}
          overallRating={3.4}
          enjoyabilityRating={4.1}
          usefulnessRating={3.5}
          manageabilityRating={3.4}
          noReviews={22}
        />
      </CourseContainer>
      <Footer />
    </Container>
  );
};

export default CoursePage;
