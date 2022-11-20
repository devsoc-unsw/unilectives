import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import { Container, Row, Column, NameBox, CategoryBox, Button,
  ButtonBox, CardsBox, BookmarksHeader, Content } from "./style";
import { useState } from "react";
import { mockUser } from "src/stubbing/data";
import BookmarkCourseCard from "src/components/BookmarkCourseCard/BookmarkCourseCard";

// currently using data from mockUser

const ProfilePage = () => {
  const [viewBookmark, setBookmark] = useState('courses');

  const getBookmarks = () => {
    // TODO: show the bookmark components
    if (viewBookmark === 'courses') {
      return (
        mockUser.bookmarkedCourses.map((c) => {
          return <BookmarkCourseCard course={c} />
        })
      )
    } else {
      return <div>reviews</div>
    }
  }

  // TODO:
  // Show authorised user's name
  // Show authorised user's reviews
  return (
    <Content>
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
      <Footer />
    </Content>
  );
};

export default ProfilePage;
