import { IReview } from "src/interfaces/ResponseInterface";
import ReviewCard from "./ReviewCard";
import { CourseText, OwnReviewHeader } from "./style";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  review: IReview;
}

const OwnReviewCard = (p: Props) => {
  return (
    <>
      <OwnReviewHeader>
        <CourseText>{p.review.courseCode}</CourseText>
        <div>
          <EditIcon />
          <DeleteIcon />
        </div>
      </OwnReviewHeader>
      <ReviewCard review={p.review} />
    </>
  )
}

export default OwnReviewCard;
