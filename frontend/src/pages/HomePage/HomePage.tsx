import { useState, useEffect } from "react";
import LoginDialog from "./LoginDialog/LoginDialog";
import Text from "../../components/text/Text";
import {
  Button,
  Container,
  Content,
  Flexbox,
  FlexboxComponent,
  Graphic,
  TextFlexbox,
  HomeText,
  ButtonFlexbox,
  HomeHeader,
  Logo,
  SmallContainer,
} from "./style";
import { UniLectives } from "src/components/image/imageIndex";
import ReviewModal from "../../components/ReviewModal/ReviewModal";
import { useAppDispatch, useAppSelector } from "src/logic/redux/hooks";
import { selectUser } from "src/logic/redux/reducers/userSlice/userSlice";
import Footer from "src/components/Footer/Footer";
import {
  getCoursesDispatch,
  LoadingStatusTypes,
  selectCourse,
} from "src/logic/redux/reducers/courseSlice/courseSlice";
import { homePageGraphics } from "src/constants";
import { useNavigate } from "react-router-dom";
import Searchbar from "src/components/Searchbar/Searchbar";
import { ICourse } from "src/interfaces/ResponseInterface";
import CourseListItem from "src/components/CourseListItem/CourseListItem";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector(selectUser) || {};
  const { courses, loadingStatus } = useAppSelector(selectCourse) || {};

  const [loginDialog, setLoginDialog] = useState<boolean>(false);
  const [reviewModal, setReviewModal] = useState<boolean>(false);
  const [landingGraphic, setLandingGraphic] = useState<string>();
  const [results, setResults] = useState<ICourse[]>([]);

  useEffect(() => {
    setLandingGraphic(
      homePageGraphics[Math.floor(Math.random() * homePageGraphics.length)]
    );
    dispatch(getCoursesDispatch());
  }, []);

  useEffect(() => {
    setResults(courses?.courses ?? []);
  }, [courses]);

  return (
    <Content>
      <HomeHeader>
        <Logo src={UniLectives} />
        <Button
          bg="transparent"
          style={{ marginLeft: "60%", border: "2px solid white" }}
          onClick={() => setLoginDialog(true)}
        >
          Login
        </Button>
      </HomeHeader>
      <Flexbox>
        <FlexboxComponent padding="10em">
          <TextFlexbox>
            <HomeText fontFamily={"Lato"} fontWeight={"bold"} fontSize="15px">
              CSEsoc Presents
            </HomeText>
            <HomeText
              fontFamily={"Poppins"}
              fontWeight={"bold"}
              fontSize="70px"
              color="#1279F2"
            >
              uni-lectives
            </HomeText>
            <HomeText fontFamily={"Lato"} fontWeight={"bold"} fontSize="15px">
              Your one stop shop for UNSW course and electives reviews.
            </HomeText>
            <ButtonFlexbox>
              <Button bg="#3B5DD5" onClick={() => navigate("/search")}>
                <HomeText fontFamily={"Lato"}>Browse</HomeText>
              </Button>
              <Button bg="#72C1DA" onClick={() => setReviewModal(true)}>
                <HomeText fontFamily={"Lato"}>Add a Review</HomeText>
              </Button>
            </ButtonFlexbox>
          </TextFlexbox>
        </FlexboxComponent>
        <FlexboxComponent>
          <Graphic src={landingGraphic} />
        </FlexboxComponent>
      </Flexbox>
      <Container>
        <SmallContainer>
          <Searchbar
            courses={courses?.courses ?? []}
            onSearchChange={setResults}
          />
          {loginDialog && <LoginDialog close={() => setLoginDialog(false)} />}
          <Text>User response:</Text>
          <Text>{JSON.stringify(user)}</Text>
          {loadingStatus === LoadingStatusTypes.GET_COURSES_COMPLETED &&
            results.map((course) => (
              <CourseListItem key={course.courseCode} course={course} />
              // <Text key={course.courseCode}>{course.terms} BING CHILLING</Text></>
            ))}
          {reviewModal && <ReviewModal close={() => setReviewModal(false)} />}
        </SmallContainer>
        <Footer />
      </Container>
    </Content>
  );
};

export default HomePage;
