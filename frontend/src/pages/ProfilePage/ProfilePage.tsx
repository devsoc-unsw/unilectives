import { useParams } from "react-router-dom";
import CourseHeader from "src/components/CourseHeader/CourseHeader";
import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import { Container, Row, Column, NameBox, CategoryBox, Button, ButtonBox, CardsBox, BookmarksHeader } from "./style";
import { useState } from "react";

type ParamTypes = {
  zid: string;
};
  
const ProfilePage = () => {

  const { zid } = useParams<keyof ParamTypes>() as ParamTypes;
  const [viewBookmark, setBookmark] = useState('courses');

  const getBookmarks = () => {
    // TODO: show the bookmark components
    if (viewBookmark === 'courses') {
      return <div>courses</div>
    } else {
      return <div>reviews</div>
    } 
  }

  // TODO:
  // Show authorised user's name
  // Show authorised user's reviews
  return (
    <Container>
      <Header courses={[]} />
      <NameBox>Victoria Vu</NameBox> 
      <Row>
        <Column>
          <CategoryBox>
            My Reviews
          </CategoryBox>
        </Column>
        <Column>
          <BookmarksHeader>
            <CategoryBox>
              Bookmarks
            </CategoryBox>
            <ButtonBox>
              <Button onClick={() => setBookmark('courses')}>Courses</Button>
              <Button onClick={() => setBookmark('reviews')}>Reviews</Button>
            </ButtonBox>
          </BookmarksHeader>
          <CardsBox>{getBookmarks()}</CardsBox>
        </Column>
      </Row>
    
    </Container>
  );
};

export default ProfilePage;
