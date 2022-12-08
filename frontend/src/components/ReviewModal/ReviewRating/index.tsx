import { RATING_NUMBER } from "src/constants";
import RatingStyles from "src/interfaces/RatingStyles";
import { Icon } from "../../icon/Icon";
import {
  GreenCircle,
  OrangeCircle,
  StarSelected,
  StarUnselected,
  UnselectedCircle,
} from "../../icon/iconIndex";

const SelectedIcons: RatingStyles = {
  OVERALL: StarSelected,
  ENJOYABILITY: GreenCircle,
  USEFULNESS: GreenCircle,
  MANAGEABILITY: OrangeCircle,
};

const UnselectedIcons: RatingStyles = {
  OVERALL: StarUnselected,
  ENJOYABILITY: UnselectedCircle,
  USEFULNESS: UnselectedCircle,
  MANAGEABILITY: UnselectedCircle,
};

type ReviewRatingProps = {
  name: keyof RatingStyles;
  rating: number;
  setRating: (rating: number) => void;
};

const ReviewRating = ({ name, rating, setRating }: ReviewRatingProps) => {
  return (
    <>
      {Array.from({ length: RATING_NUMBER }, (_, i) => (
        <Icon
          src={i + 1 <= rating ? SelectedIcons[name] : UnselectedIcons[name]}
          size={name === "OVERALL" ? 2 : 1.5}
          key={`${name} + ${i}`}
          style={{
            cursor: "pointer",
            paddingRight: name === "OVERALL" ? "0.25rem" : "0.6rem",
          }}
          onClick={() => {
            if (rating === i + 1) {
              setRating(0);
            } else {
              setRating(i + 1);
            }
          }}
        />
      ))}
    </>
  );
};

export default ReviewRating;
