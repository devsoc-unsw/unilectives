import { CircleIcon, StarIcon } from './style';

// create new ratings component which will be used to display the ratings
const ReviewRating: React.FunctionComponent<ReviewRatingProps> = (props) => {
    const { icon } = props;
    const maxRating = 5;
    return (
        <div>
            <div>
                {Array(maxRating).fill(0).map((_, i) => { // eslint-disable-line
                    return (
                        icon === "star" ? (
                            <StarIcon fontSize="large"/>
                        ) : (
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
