import { MenuItem } from "@mui/material";
import React from "react"
import { Link } from "react-router-dom";
import { ICourse } from "src/interfaces/ResponseInterface";
import DisplayRating from "../DisplayRating/DisplayRating";
import DisplayTerms from "../DisplayTerms/DisplayTerms";
import { CourseCode, CourseListItemContainer, CourseName, Enjoyability, Faculty, FacultyContainer, Manageability, OverallRating, ReviewCount, Terms, Usefulness } from "./style";

interface Props {
    course: ICourse;
}


const CourseListItem = (p: Props) => {

    const makeFacultyString = (facultyString: string) => {
        return facultyString.replace("Faculty of ", "");
    }

    const getCategoryRating = (rating: number) => {
        if (rating === null) {
            return 0;
        }
        return Math.round(rating * 10) / 10;
    }

    return (
    <CourseListItemContainer>
        <MenuItem component={Link} to={'/course/' + p.course.courseCode} style={{width:"100%", textAlign:"left", padding:"0%"}}>
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
                {getCategoryRating(p.course.enjoyability)}
            </Enjoyability>
            <Usefulness>
                {getCategoryRating(p.course.usefulness)}
            </Usefulness>
            <Manageability>
                {getCategoryRating(p.course.manageability)}
            </Manageability>
            <FacultyContainer>
                <Faculty>
                    {makeFacultyString(p.course.faculty)}
                </Faculty>
            </FacultyContainer>
            <ReviewCount>
                {p.course.reviewCount}
            </ReviewCount>
        </MenuItem>
    </CourseListItemContainer>
    )
}

export default CourseListItem