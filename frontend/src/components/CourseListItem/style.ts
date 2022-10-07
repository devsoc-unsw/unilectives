import style from "styled-components";

export const CourseListItemContainer = style.div`
    display: flex;
    width: 80%;
    height: 5%;
    // border: 1px solid black;
    border-bottom: 1px solid #C6C6C6;
    padding: .3%;
    font-size: .8rem;
    font: Lato;
    // padding-top: .8%;
    // padding-bottom: .8%;
    align-items: center;
    &:hover {
        transform: scale(1.01);
    }
`;

export const CourseCode = style.div`
    width: 100px;
    height: 100%;
    text-align: left;
    // border: 1px solid red;
    font-weight: bold;
`;

export const CourseName = style.div`
    width: 22%;
    height: 100%;
    text-align: left;
    // border: 1px solid green;
    font-size: 0.9rem;
    white-space: normal;
`;

export const Terms = style.div`
    width: 13%;
    height: 100%;
    text-align: left;
    // border: 1px solid blue;
    @media (max-width: 809px) {
        width: 20%;
    }
`;

export const OverallRating = style.div`
    width: 13%;
    height: 100%;
    text-align: left;
    margin-left: 1%;
    // border: 1px solid yellow
    @media (max-width: 809px) {
        width: 23%;
    }
    display: flex;
    justify-content: center;
`;

export const Enjoyability = style.div`
    width: 8%;
    height: 100%;
    text-align: center;
    // border: 1px solid purple;
    @media (max-width: 809px) {
        visibility: hidden;
        width: 0%;
    }
`;

export const Usefulness = style.div`
    width: 8%;
    height: 100%;
    text-align: center;
    // border: 1px solid orange;
    @media (max-width: 809px) {
        visibility: hidden;
        width: 0%;
    }
`;

export const Manageability = style.div`
    width: 8%;
    height: 100%;
    text-align: center;
    // border: 1px solid pink;
    @media (max-width: 809px) {
        visibility: hidden;
        width: 0%;
    }
`;

export const FacultyContainer = style.div`
    width: 9%;
    height: 100%;
    text-align: center;
    // border: 1px solid lightblue;
    // padding-bottom: .2%;
    @media (max-width: 809px) {
        visibility: hidden;
        width: 0%;
    }
`;

export const Faculty = style.div`
    display: initial;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    padding: 5%;
    background-color: #E8D3F4;
    font-size: 0.8em;
`;

export const ReviewCount = style.div`
    width: 8%;
    height: 100%;
    text-align: center;z
    // border: 1px solid lightgreen;
`;
