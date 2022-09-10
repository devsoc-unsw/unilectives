import React from "react"
import { ICourse } from "src/interfaces/ResponseInterface";
import DisplayRating from "../DisplayRating/DisplayRating";
import DisplayTerms from "../DisplayTerms/DisplayTerms";
import ReviewRating from "../ReviewRating/ReviewRating";
import { StarIcon } from "../ReviewRating/style";
import { CourseCode, CourseListItemContainer, CourseName, Enjoyability, Faculty, FacultyContainer, Manageability, OverallRating, ReviewCount, Terms, Usefulness } from "./style";

interface Props {
    course: ICourse;
}
const StarRating = () => {
    return (
        <div>
            <StarIcon fontSize="large" />
            <StarIcon fontSize="large" />
            <StarIcon fontSize="large" />
            <StarIcon fontSize="large" />
            <StarIcon fontSize="large" />
        </div>
    );
};

const CourseListItem = (p: Props) => {
    return (
    <CourseListItemContainer>
        <CourseCode>
            {p.course.courseCode}
        </CourseCode>
        <CourseName>
            {p.course.title}
        </CourseName>
        <Terms>
            <DisplayTerms terms={p.course.terms} />
        </Terms>
        <OverallRating>
            <DisplayRating rating={p.course.rating} />
        </OverallRating>
        <Enjoyability>
            4.5
        </Enjoyability>
        <Usefulness>
            4.5
        </Usefulness>
        <Manageability>
            4.5
        </Manageability>
        <FacultyContainer>
            <Faculty>
                {p.course.faculty}
            </Faculty>
        </FacultyContainer>
        <ReviewCount>
            12
        </ReviewCount>

    </CourseListItemContainer>
        )
}

export default CourseListItem