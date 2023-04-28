import React from "react"
import { CourseName, Faculty, HeaderContainer, Overall, RatingCategories, ReviewNum, Terms } from "./style";

const CourseListHeader = () => {
    return (
        <HeaderContainer>

            <div style={{width: "100px", textAlign: "left"}} >Course Code</div>
            <CourseName>Course Name</CourseName>
            <Terms>Terms</Terms>
            <Overall>Overall Rating</Overall>
            <RatingCategories>Enjoyability</RatingCategories>
            <RatingCategories>Usefulness</RatingCategories>
            <RatingCategories>Manageability</RatingCategories>
            <Faculty>Faculty</Faculty>
            <ReviewNum>No. of Reviews</ReviewNum>
        </HeaderContainer>
    );

}

export default CourseListHeader;
