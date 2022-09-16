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
      <Flexbox direction={'column'}>
        {/* <CourseContainer> */}
        <CourseHeader
          courseCode={courseCode}
          overallRating={3.4}
          enjoyabilityRating={4.1}
          usefulnessRating={3.5}
          manageabilityRating={3.4}
          noReviews={22}
        />
        {/* </CourseContainer> */}
        <Flexbox direction={'row'}>
          <FlexboxComponent width={'60'}>
            Hello
          </FlexboxComponent>
          <FlexboxComponent width={'40'}>
            {/* TODO: Fetch rating sections from BE */}
            <CourseSummary
              course={courseCode}
              enjoyabilityRating={4.1}
              usefulnessRating={3.5}
              manageabilityRating={3.4}
              noReviews={22}
            />
          </FlexboxComponent>
        </Flexbox>
      </Flexbox>
      {/* <Footer /> */}
    </Container>
  );
};

export default CoursePage;
