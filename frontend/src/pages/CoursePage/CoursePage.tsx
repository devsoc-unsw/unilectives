import { useParams } from "react-router-dom";
import CourseHeader from "src/components/CourseHeader/CourseHeader";
import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import CourseSummary from "src/components/CourseSummary/CourseSummary";
import { Container, CourseContainer, Flexbox, FlexboxComponent } from "./style";

type ParamTypes = {
  courseCode: string;
};

const CoursePage = () => {
  const { courseCode } = useParams<keyof ParamTypes>() as ParamTypes;

  return (
    <Container>
      <Header courses={[]} />
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
      <Flexbox>
        <FlexboxComponent width={'60'}>
        </FlexboxComponent>
        <FlexboxComponent width={'40'}>
          {/* TODO: Fetch rating sections from BE */}
          <CourseSummary
            enjoyabilityRating={4.1}
            usefulnessRating={3.5}
            manageabilityRating={3.4}
          />
        </FlexboxComponent>
      </Flexbox>
      <Footer />
    </Container>
  );
};

export default CoursePage;
