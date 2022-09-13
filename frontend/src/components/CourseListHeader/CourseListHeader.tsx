import React from "react"
import { HeaderContainer } from "./style";

const CourseListHeader = () => {
    return (
        <HeaderContainer>
            <div style={{width: "10%", textAlign: "left"}} >Course Code</div>
            <div style={{width: "18%"}} >Course Name</div>
            <div style={{width: "25%"}} >Tags</div>
            <div style={{width: "13%"}} >Overall Rating</div>
            <div style={{width: "8%"}} >Enjoyability</div>
            <div style={{width: "8%"}} >Usefulness</div>
            <div style={{width: "8%"}} >Manageability</div>
            <div style={{width: "7%"}} >Faculty</div>
            <div style={{width: "4%"}} >No. of reviews</div>
        </HeaderContainer>
    );

}

export default CourseListHeader;