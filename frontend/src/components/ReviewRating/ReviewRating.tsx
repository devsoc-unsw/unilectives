import StarRoundedIcon from '@mui/icons-material/StarRounded';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';

// create new ratings component which will be used to display the ratings
const ReviewRating: React.FunctionComponent<ReviewRatingProps> = (props) => {
    const { size, icon } = props;
    const maxRating = 5;
    return (
        <div>
            <div>
                {/* map circle rounded icon to print 5 times */}
                
                {Array(maxRating).fill(0).map((_, i) => {
                    return (
                        // if icon is star rounded icon, use star rounded icon else use circle rounded icon
                        <CircleRoundedIcon fontSize="small" style={{ marginRight: "0.5rem", color: "#CED9DD" }}/>
                    );
                })}
            </div>
        </div>
    );
};

type ReviewRatingProps = {
    size: string,
    icon: string
};

export default ReviewRating;