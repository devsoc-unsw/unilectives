import StarRoundedIcon from '@mui/icons-material/StarRounded';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { CircleIcon, StarIcon } from './style';

// create new ratings component which will be used to display the ratings
const ReviewRating: React.FunctionComponent<ReviewRatingProps> = (props) => {
    const { icon } = props;
    const maxRating = 5;
    return (
        <div>
            <div>
                {Array(maxRating).fill(0).map((_, i) => {
                    return (
                        icon === "star" ? (
                            <StarIcon fontSize="large"/>
                        ) : (
                            // else the icon is a circle, then display a circle icon
                            <CircleIcon fontSize="small"/>
                        )
                    )
                })}
            </div>
        </div>
    )
}

type ReviewRatingProps = {
    icon: string
};

export default ReviewRating;