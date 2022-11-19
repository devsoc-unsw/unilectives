import { Bookmark, BookmarkBorder, FlagOutlined } from "@mui/icons-material";
import { IReview } from "src/interfaces/ResponseInterface";
import {
  ReviewContainer,
  ReviewHeadings,
  Ratings,
  IndivRating,
  ReviewText,
  Interactions,
  InteractButton,
  RatingNumber,
} from './style'
interface Props {
  review: IReview;
}

const ReviewCard = (p: Props) => {
  return (
    <ReviewContainer>
      <ReviewHeadings>
          <div>
              <b>Wow this course</b>
          </div>
          <div>
              <b>{p.review.createdTimestamp.toDateString()}</b>
          </div>
      </ReviewHeadings>
      <ReviewHeadings>
          <div>Overall: {p.review.overallRating}</div>
          <div>{p.review.zid}</div>
      </ReviewHeadings>
      <ReviewHeadings>
          <div>Term Taken: {p.review.termTaken}</div>
          <div>Grade: {p.review.grade}</div>
      </ReviewHeadings>

      <Ratings>
          <IndivRating>
              <div>Enjoyment</div>
              <RatingNumber>{p.review.enjoyability}</RatingNumber>
          </IndivRating>
          <IndivRating>
              <div>Usefulness</div>
              <RatingNumber>{p.review.usefulness}</RatingNumber>
          </IndivRating>
          <IndivRating>
              <div>Manageability</div>
              <RatingNumber>{p.review.manageability}</RatingNumber>
          </IndivRating>
      </Ratings>

      <ReviewText>
          {p.review.description}
      </ReviewText>

      <Interactions>
          <InteractButton>Did you find this helpful? ({p.review.upvotes.length})</InteractButton>
          <div>
            <InteractButton>
              {(p.review.upvotes.includes('z5555555')) ? <Bookmark/> : <BookmarkBorder />}
            </InteractButton>
            <InteractButton>
              {<FlagOutlined />}
            </InteractButton>
          </div>
      </Interactions>
  </ReviewContainer>
  );
};

export default ReviewCard;
