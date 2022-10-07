import style from "styled-components"

export const HeaderContainer = style.div`
    display: flex;
    width: 80%;
    // border: 1px solid black
    text-align: center;
    font-weight: bold;
    font-size: .8rem;
    color: #404040;
`;

export const CourseName = style.div`
    width: 22%;
`

export const Terms = style.div`
    width: 13%;
    @media (max-width: 809px) {
        width: 20%;
    }
`

export const Overall = style.div`
    width: 13%;
    @media (max-width: 809px) {
        width: 23%;
    }
    margin-left: 1%;
`

export const RatingCategories = style.div`
    width: 8%;
    @media (max-width: 809px) {
        visibility: hidden;
        width: 0%;
    }
`

export const Faculty = style.div`
    width: 9%;
    @media (max-width: 809px) {
        visibility: hidden;
        width: 0%;
    }
`
export const ReviewNum = style.div`
    width: 8%;
`