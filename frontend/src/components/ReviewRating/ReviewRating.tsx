

// create new ratings component which will be used to display the ratings
const ReviewRating: React.FunctionComponent<ReviewRatingProps> = (props) => {
    const { size, icon } = props;
    return (
        <div>
            Ratings section
        </div>
    );
};

type ReviewRatingProps = {
    size: string,
    icon: string
};

export default ReviewRating;