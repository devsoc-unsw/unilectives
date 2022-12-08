import { IReview } from "src/interfaces/ResponseInterface";
import ReviewCard from "./ReviewCard";
import { CourseText, OwnReviewHeader } from "./style";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  review: IReview;
}

// TODO: fix the check that the author of review is the user

const ProfileReviewCard = (p: Props) => {
  return (
    <>
      <OwnReviewHeader>
        <CourseText>{p.review.courseCode}</CourseText>
        <div>
          {p.review.zid === 'z5555555' && (
            <>
              <EditIcon />
              <DeleteIcon />
            </>
          )}
        </div>
      </OwnReviewHeader>
      <ReviewCard review={p.review} />
    </>
  )
}

export default ProfileReviewCard;
