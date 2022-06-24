import { useEffect, useState } from "react";
import LoginDialog from "./LoginDialog/LoginDialog";
import Text from "../../components/text/Text";
import ReviewModal from "../../components/ReviewModal/ReviewModal";
import { Button, Container } from "./style";
import { useAppDispatch, useAppSelector } from "src/logic/redux/hooks";
import { selectUser } from "src/logic/redux/reducers/userSlice/userSlice";
import Footer from "src/components/Footer/Footer";
import Header from "src/components/Header/Header";
import {
  getCoursesDispatch,
  LoadingStatusTypes,
  selectCourse,
} from "src/logic/redux/reducers/courseSlice/courseSlice";
import Searchbar from "src/components/Searchbar/Searchbar";
import { ICourse } from "src/interfaces/ResponseInterface";

const HomePage = () => {
  const dispatch = useAppDispatch();

  const [loginDialog, setLoginDialog] = useState<boolean>(false);
  const [reviewModal, setReviewModal] = useState<boolean>(false);
  const { user } = useAppSelector(selectUser) || {};
  const { courses, loadingStatus } = useAppSelector(selectCourse) || {};

  const [results, setResults] = useState<ICourse[]>([]);

  useEffect(() => {
    dispatch(getCoursesDispatch());
  }, []);

  useEffect(() => {
    setResults(courses?.courses ?? []);
  }, [courses]);

  return (
    <Container>
      <Header courses={courses?.courses ?? []} />
      Hello1
      <Button onClick={() => setLoginDialog(true)}>Login</Button>
      {loginDialog && <LoginDialog close={() => setLoginDialog(false)} />}
      <Text>User response:</Text>
      <Text>{JSON.stringify(user)}</Text>
      <Searchbar courses={courses?.courses ?? []} onSearchChange={setResults} />
      {loadingStatus === LoadingStatusTypes.GET_COURSES_COMPLETED &&
        results.map((course) => (
          <Text key={course.courseCode}>{course.courseCode}</Text>
        ))}
      Incoming review modal hey
      <Button onClick={() => setReviewModal(true)}>Submit a Review</Button>
      {reviewModal && <ReviewModal close={() => setReviewModal(false)} />}
      <Footer />
    </Container>
  );
};

export default HomePage;
