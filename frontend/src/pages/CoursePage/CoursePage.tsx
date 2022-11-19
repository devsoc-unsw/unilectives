import { useParams } from "react-router-dom";
import CourseHeader from "src/components/CourseHeader/CourseHeader";
import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import CourseSummary from "src/components/CourseSummary/CourseSummary";
import { Container, Flexbox, FlexboxComponent } from "./style";
import { mockReviews } from "src/stubbing/data";
import { useEffect, useState } from "react";
import {IReview} from "src/interfaces/ResponseInterface";
import ReviewCard from "src/components/ReviewCard/ReviewCard";

type ParamTypes = {
  courseCode: string;
};

const CoursePage = () => {
  const { courseCode } = useParams<keyof ParamTypes>() as ParamTypes;
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    // TODO: currently using mock data 
    setReviews([]);
    mockReviews.forEach(review => {
      if (review.courseCode === courseCode) {
        setReviews((reviews) => [...reviews, review]);
      }
    })
  }, [])

  const showReviews = () => {
    if (reviews.length === 0) {
      return <div>No reviews yet!</div>
    }
    return (
      reviews.map((review, index) => {
        return <ReviewCard review={review} key={index} />
      })
    )
  }

  return (
    <Container>
      <Header courses={[]} />
      <Flexbox direction={'column'}>
        <CourseHeader
          courseCode={courseCode}
          overallRating={3.4}
          enjoyabilityRating={4.1}
          usefulnessRating={3.5}
          manageabilityRating={3.4}
          noReviews={22}
        />
        <Flexbox direction={'row'}>
          <FlexboxComponent width={'60'}>
            {showReviews()}
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
      <Footer />
    </Container>
  );
};

export default CoursePage;
