import { CardContentsContainer, CardContentsTitle,
    CardContentsDesc, CardContentsExtras, CardContentsRating,
    CardContentsReviews, CardCategoriesTable, CardContentsFaculty } from '../CourseCard/style'
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { ICourse } from "src/interfaces/ResponseInterface"

import DisplayTerms from "../CourseCard/DisplayTerms/DisplayTerms";

import { CardActionArea } from '@mui/material';
import { Link } from "react-router-dom";
import { CardContentsColumn, CardContentsGroup, DescContent, DescTitle } from './style';

interface Props {
  course: ICourse;
}

const BookmarkCourseCard = (p: Props) => {
  const makeFacultyString = (facultyString: string) => {
      return facultyString.replace("Faculty of ", "");
  }

  var cardStyle = {
      height: '13.5rem',
      width: '100%',
      margin: '7px 0',
      boxShadow: '0 1px 2px 0 rgba(0,0,0,0.1)',
      backgroundColor: '#FEFDFD',
  }

  const trimCourseDesc = (desc: String) => {
    const words = desc.split(' ');
    return words.splice(0, 60).join(' ') + ' ...';
  }

  // TODO: remove hardcoded values
  return (
    <Card style={cardStyle}>
      <CardActionArea component={Link} to={'/course/' + p.course.courseCode} style={{height:'100%'}}>
        <CardContentsContainer>
          <CardContentsGroup>
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
            </CardContentsGroup>
          <CardContentsDesc>
            <DescTitle>Course Description</DescTitle>
            <DescContent>{trimCourseDesc(p.course.description)}</DescContent>
          </CardContentsDesc>
        </CardContentsContainer>
      </CardActionArea>
    </Card>
  );
}

export default BookmarkCourseCard;
