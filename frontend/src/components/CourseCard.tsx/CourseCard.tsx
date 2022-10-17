import { Card, CardContentsContainer, CardContentsColumn, CardContentsTitle, 
    CardContentsDesc, CardContentsExtras, CardContentsRating, 
    CardContentsReviews, CardCategoriesTable, CardContentsFaculty } from './style'

import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { ICourse } from "src/interfaces/ResponseInterface"

import DisplayTerms from "./DisplayTerms/DisplayTerms";

interface Props {
    course: ICourse;
}

const CourseCard = (p: Props) => {
    return (
        <Card>
            <CardContentsContainer>
                <CardContentsColumn>
                    <CardContentsTitle>
                        {p.course.courseCode}
                    </CardContentsTitle>
                    <CardContentsDesc>
                        {p.course.title}
                    </CardContentsDesc>
                    <CardContentsExtras>
                        <CardContentsFaculty>{p.course.faculty}</CardContentsFaculty>
                        <DisplayTerms terms={p.course.terms} />
                    </CardContentsExtras>
                </CardContentsColumn>
                <CardContentsColumn>
                    <CardContentsRating>
                        <Rating
                            icon={<StarRoundedIcon fontSize="inherit" style={{fill: "#26C97F"}} />}
                            emptyIcon={<StarRoundedIcon fontSize="inherit" style={{fill: "#CED9DD"}}/>}
                            value={p.course.rating}
                            precision={0.5}
                            sx={{fontSize: 29}}
                            readOnly
                        />
                    </CardContentsRating>
                    <CardContentsReviews>
                        21 reviews
                    </CardContentsReviews>
                    <CardCategoriesTable>
                        <table>
                            <tr>
                                <th>Enjoyability</th>
                                <td>3.5</td>
                            </tr>
                            <tr>
                                <th>Usefulness</th>
                                <td>4.1</td>
                            </tr>
                            <tr>
                                <th>Manageability</th>
                                <td>2.3</td>
                            </tr>
                        </table>
                    </CardCategoriesTable>
                </CardContentsColumn>
            </CardContentsContainer>
        </Card>
    );
}

export default CourseCard;
