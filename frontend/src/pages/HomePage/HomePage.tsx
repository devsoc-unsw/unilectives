import { useEffect, useState } from "react";
import LoginDialog from "./LoginDialog/LoginDialog";
import Text from "../../components/text/Text";
import ReviewModal from "../../components/ReviewModal/ReviewModal";
import { Button, Container, SmallContainer } from "./style";
import { useAppDispatch, useAppSelector } from "src/logic/redux/hooks";
import { selectUser } from "src/logic/redux/reducers/userSlice/userSlice";
import Footer from "src/components/Footer/Footer";
import Header from "src/components/Header/Header";
import {
  getCoursesDispatch,
  LoadingStatusTypes,
  selectCourse,
} from 'src/logic/redux/reducers/courseSlice/courseSlice'

const HomePage = () => {
  const dispatch = useAppDispatch()

  const [loginDialog, setLoginDialog] = useState<boolean>(false)
  const [reviewModal, setReviewModal] = useState<boolean>(false)
  const { user } = useAppSelector(selectUser) || {}
  const { courses, loadingStatus } = useAppSelector(selectCourse) || {}

  useEffect(() => {
    dispatch(getCoursesDispatch())
  }, [])

  return (
    <Container>
      <Header />
      <SmallContainer>
        Hello1
        <Button onClick={() => setLoginDialog(true)}>Login</Button>
        {loginDialog && <LoginDialog close={() => setLoginDialog(false)} />}
        <Text>User response:</Text>
        <Text>{JSON.stringify(user)}</Text>
        {loadingStatus === LoadingStatusTypes.GET_COURSES_COMPLETED &&
          courses?.courses.map((course) => (
            <Text key={course.courseCode}>{course.courseCode}</Text>
          ))}
        Incoming review modal hey
        <Button onClick={() => setReviewModal(true)}>Submit a Review</Button>
        {reviewModal && <ReviewModal close={() => setReviewModal(false)} />}
      </SmallContainer>
      <Footer />
    </Container>
  )
}

export default HomePage
