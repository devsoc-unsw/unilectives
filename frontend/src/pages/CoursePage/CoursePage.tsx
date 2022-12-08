import { useParams } from "react-router-dom";
import CourseHeader from "src/components/CourseHeader/CourseHeader";
import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import CourseSummary from "src/components/CourseSummary/CourseSummary";
import { Container, Flexbox, FlexboxComponent } from "./style";
import { useEffect, useState } from "react";
import {
  ICourse,
  IGetCoursesResponse,
  IGetReviewsResponse,
  IReview,
} from "src/interfaces/ResponseInterface";
import ReviewCard from "src/components/ReviewCard/ReviewCard";
import { getReviews } from "src/logic/functions/getReviews.function";
import { getCourses } from "src/logic/functions/getCourses.function";

type ParamTypes = {
  courseCode: string;
};

const CoursePage = () => {
  const { courseCode } = useParams<keyof ParamTypes>() as ParamTypes;
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [course, setCourse] = useState<ICourse>();

  const fetchReviews = async () => {
    const res = (await getReviews(courseCode)) as IGetReviewsResponse;
    setReviews(res.reviews);
  };

  const fetchCourse = async () => {
    const res = (await getCourses()) as IGetCoursesResponse;
    setCourse(res.courses.find((c) => c.courseCode === courseCode));
  };

  useEffect(() => {
    fetchCourse();
    try {
      fetchReviews();
    } catch (err) {
      console.log(err);
      setReviews([]);
    }
  }, []);

  const showReviews = () => {
    if (reviews.length === 0) {
      return <div>No reviews yet!</div>;
    }
    return reviews.map((review, index) => {
      return <ReviewCard review={review} key={index} />;
    });
  };

  return (
    <Container>
      <Header courses={[]} />
      <Flexbox direction={"column"}>
        <CourseHeader
          courseCode={courseCode}
          overallRating={3.4}
          enjoyabilityRating={4.1}
          usefulnessRating={3.5}
          manageabilityRating={3.4}
          noReviews={22}
        />
        <Flexbox direction={"row"}>
          <FlexboxComponent width={"60"}>{showReviews()}</FlexboxComponent>
          <FlexboxComponent width={"40"}>
            {/* TODO: Fetch rating sections from BE */}
            {course ? (
              <CourseSummary
                course={course}
                enjoyabilityRating={4.1}
                usefulnessRating={3.5}
                manageabilityRating={3.4}
                noReviews={22}
              />
            ) : (
              <div>Loading...</div>
            )}
          </FlexboxComponent>
        </Flexbox>
      </Flexbox>
      <Footer />
    </Container>
  );
};

export default CoursePage;
