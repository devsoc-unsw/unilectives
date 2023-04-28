import { 
  CardContentsContainer, 
  CardContentsColumn, 
  CardContentsTitle,
  CardContentsDesc, 
  CardContentsExtras, 
  CardContentsRating,
  CardContentsReviews, 
  CardCategoriesTable,
  CardContentsFaculty } from './style'
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { ICourse } from "src/interfaces/ResponseInterface"

import DisplayTerms from "./DisplayTerms/DisplayTerms";

import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  course: ICourse;
}

const CourseCard = (p: Props) => {
  const makeFacultyString = (facultyString: string) => {
    return facultyString.replace("Faculty of ", "");
  };

    var cardStyle = {
        height: '13.5rem',
        width: '21rem',
        margin: 'auto',
        boxShadow: '0 3px 6px 0 rgba(0,0,0,0.2)',
        backgroundColor: '#FEFDFD',
    }
    
    const getCategoryRating = (rating: number) => {
        if (rating === null ) {
            return 0;
        }
        return Math.round(rating * 10) / 10;
    }

    return (
        <Card style={cardStyle}>
            <CardActionArea component={Link} to={'/course/' + p.course.courseCode} style={{height:'100%'}}>
                <CardContentsContainer>
                    <CardContentsColumn>
                        <CardContentsTitle>
                            {p.course.courseCode}
                        </CardContentsTitle>
                        <CardContentsDesc>
                            {p.course.title}
                        </CardContentsDesc>
                        <CardContentsExtras>
                            <CardContentsFaculty>{makeFacultyString(p.course.faculty)}</CardContentsFaculty>
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
                                sx={{fontSize: 28}}
                                readOnly
                            />
                        </CardContentsRating>
                        <CardContentsReviews>
                            {p.course.reviewCount} reviews
                        </CardContentsReviews>
                        <CardCategoriesTable>
                            <table>
                                <tr>
                                    <th>Enjoyability</th>
                                    <td>{getCategoryRating(p.course.enjoyability)}</td>
                                </tr>
                                <tr>
                                    <th>Usefulness</th>
                                    <td>{getCategoryRating(p.course.usefulness)}</td>
                                </tr>
                                <tr>
                                    <th>Manageability</th>
                                    <td>{getCategoryRating(p.course.manageability)}</td>
                                </tr>
                            </table>
                        </CardCategoriesTable>
                    </CardContentsColumn>
                </CardContentsContainer>
            </CardActionArea>
        </Card>
    );
}

export default CourseCard;