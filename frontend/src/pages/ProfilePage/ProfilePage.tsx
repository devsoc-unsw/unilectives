import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import { Container, Row, Column, NameBox, CategoryBox, Button,
  ButtonBox, CardsBox, BookmarksHeader, Content, ReviewsBox } from "./style";
import { useState } from "react";
import { mockUser } from "src/stubbing/data";
import BookmarkCourseCard from "src/components/BookmarkCourseCard/BookmarkCourseCard";
import OwnReviewCard from "src/components/ReviewCard/OwnReviewCard";

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

  const getOwnReviews = () => {
    return mockUser.reviews.map((r) => {
      return <OwnReviewCard review={r} />
    })
  }

  // TODO:
  // Show authorised user's name
  return (
    <Content>
      <Container>
        <Header courses={[]} />
        <NameBox>{mockUser.zid}</NameBox>
        <Row>
          <Column>
            <CategoryBox>
              My Reviews
            </CategoryBox>
            <ReviewsBox>
              {getOwnReviews()}
            </ReviewsBox>
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
