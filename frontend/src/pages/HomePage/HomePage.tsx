import { useState, useEffect, useRef } from "react";
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
  LoginButton,
  ButtonFlexbox,
  HomeHeader,
  Logo,
  SmallContainer,
  CardsContainer
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
import Searchbar from "src/components/Searchbar/Searchbar";
import { ICourse } from "src/interfaces/ResponseInterface";
import CourseListItem from "src/components/CourseListItem/CourseListItem";
import CourseListHeader from "src/components/CourseListHeader/CourseListHeader";
import Grid from "@mui/material/Grid";
import CourseCard from "../../components/CourseCard/CourseCard";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(selectUser) || {};
  const { courses, loadingStatus } = useAppSelector(selectCourse) || {};

  const [loginDialog, setLoginDialog] = useState<boolean>(false);
  const [reviewModal, setReviewModal] = useState<boolean>(false);
  const [landingGraphic, setLandingGraphic] = useState<string>();
  const [results, setResults] = useState<ICourse[]>([]);
  const [courseView, setCourseView] = useState<string>('list');

  const ref = useRef<null | HTMLDivElement>(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    setLandingGraphic(
      homePageGraphics[Math.floor(Math.random() * homePageGraphics.length)]
    );
    dispatch(getCoursesDispatch());
  }, []);

  useEffect(() => {
    setResults(courses?.courses ?? []);
  }, [courses]);

  const showLoginOrProfile = () => {
    if (user !== undefined) {
      return (
        <Link to={'/profile/' + user.zid}>
          <LoginButton
            onClick={() => {}}
          >
            Profile
          </LoginButton>
        </Link> 
      )} else {
      return <LoginButton
        onClick={() => setLoginDialog(true)}
      >
        Login
      </LoginButton>
    }
  }

  return (
    <Content>
      <HomeHeader>
        <Logo src={UniLectives} />
        {showLoginOrProfile()}
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
              <Button bg="#3B5DD5" onClick={handleClick}>
                <HomeText fontFamily={"Lato"}>Browse</HomeText>
              </Button>
              <Button bg="#72C1DA" onClick={() => setReviewModal(true)}>
                <HomeText fontFamily={"Lato"}>Add Review</HomeText>
              </Button>
            </ButtonFlexbox>
          </TextFlexbox>
        </FlexboxComponent>
        <FlexboxComponent>
          <Graphic src={landingGraphic} />
        </FlexboxComponent>
      </Flexbox>
      <Container>
        <div ref={ref}>
          <SmallContainer>
            <Searchbar
              courses={courses?.courses ?? []}
              onSearchChange={setResults}
              onViewChange={setCourseView}
            />
            {loginDialog && <LoginDialog close={() => setLoginDialog(false)} />}
            <Text>User response:</Text>
            <Text>{JSON.stringify(user)}</Text>
            {courseView == 'list' && <CourseListHeader/>}
            {loadingStatus === LoadingStatusTypes.GET_COURSES_COMPLETED && (() => {
              if (courseView == 'card') {
                return (
                  <CardsContainer>
                    <Grid container rowSpacing={{ xs: 2, sm: 3, md: 5 }} columnSpacing={{ xs: 1, sm: 1, md: 7 }}
                      justifyContent="flex-start"
                      alignItems="center">
                      {results.map((course) => (
                          <Grid item xs={12} sm={12} md={6} lg={4}>
                            <CourseCard key={course.courseCode} course={course} />
                          </Grid>
                        ))}
                    </Grid>
                  </CardsContainer>
                )
              } else if (courseView == 'list') {
                return (
                  results.map((course) => (
                    <CourseListItem key={course.courseCode} course={course} />
                  ))
                )
              } 
            })()}
            {reviewModal && <ReviewModal close={() => setReviewModal(false)} />}
          </SmallContainer>
        </div>
        <Footer />
      </Container>
    </Content>
  );
};

export default HomePage;
