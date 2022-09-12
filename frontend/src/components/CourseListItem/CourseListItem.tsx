import { MenuItem } from "@mui/material";
import React from "react"
import { Link } from "react-router-dom";
import { ICourse } from "src/interfaces/ResponseInterface";
import DisplayRating from "../DisplayRating/DisplayRating";
import DisplayTerms from "../DisplayTerms/DisplayTerms";
import { StarIcon } from "../ReviewRating/style";
import { CourseCode, CourseListItemContainer, CourseName, Enjoyability, Faculty, FacultyContainer, Manageability, OverallRating, ReviewCount, Terms, Usefulness } from "./style";

interface Props {
    course: ICourse;
}


const CourseListItem = (p: Props) => {
    return (
    <CourseListItemContainer>
        <MenuItem component={Link} to={'/course/' + p.course.courseCode} style={{width:"100%", textAlign:"left", padding:"0%", lineHeight:"1"}}>
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
        </MenuItem>
    </CourseListItemContainer>
        )
}

export default CourseListItem