import { Container, OverallBox, Row, Term, Top } from "./style";
import { Rating } from "@mui/material";
import { palette } from "../palette/palette";
import { ICourse } from "src/interfaces/ResponseInterface";
import Text from "../text/Text";

type CourseCardProps = {
  course: ICourse;
  onClick: () => void;
};

const CourseCard = ({ course, onClick }: CourseCardProps) => (
  <Container onClick={onClick}>
    <Row>
      <Top>
        <Text noMargin bold fontSize="1.375rem" style={{ margin: "0 0 1rem" }}>
          {course.courseCode}
        </Text>
        <Text noMargin>Data Structures and Algorithms</Text>
      </Top>
      <OverallBox>
        <Rating
          name="read-only"
          value={course.rating}
          precision={0.1}
          size="large"
          sx={{
            color: palette.dayGreen,
            fontSize: "2rem",
          }}
          readOnly
        />
        <Text noMargin color="#989898" align="right" style={{ width: "100%" }}>
          {course.reviewsIds.length} reviews
        </Text>
      </OverallBox>
    </Row>
    <Row>
      <div
        style={{
          marginTop: "0.5rem",
          alignItems: "center",
          display: "grid",
          gridTemplateColumns: "auto auto",
        }}
      >
        {course.terms.map((term) => (
          <Term key={`${course.courseCode} + ${term}`}>Term {term}</Term>
        ))}
      </div>
      <div>
        <Text>Enjoyability</Text>
        <Text>Usefulness</Text>
        <Text>Managability</Text>
      </div>
    </Row>
  </Container>
);

export default CourseCard;
