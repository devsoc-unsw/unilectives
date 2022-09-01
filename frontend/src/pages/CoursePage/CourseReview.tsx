import React from 'react';
import {
  ReviewContainer,
  ReviewHeadings,
  Ratings,
  IndivRating,
  ReviewText,
  Interactions,
//   CourseInfo,
  CoursePage
} from './style'

export default function CourseReview (props:any) {

    // const course = "COMP1511"
    // const handbook = "https://www.handbook.unsw.edu.au/undergraduate/courses/2022/COMP1511/"
    // const faculty = "Engineering"
    // const termsAvailable = "Term 1, Term 2, Term 3"
    // const courseDesc = "An introduction to problem-solving via programming, which aims to have students develop proficiency in using a high level programming language. Topics: algorithms, program structures (statements, sequence, selection, iteration, functions), data types (numeric, character), data structures (arrays, tuples, pointers, lists), storage structures (memory, addresses), introduction to analysis of algorithms, testing, code quality, teamwork, and reflective practice. The course includes extensive practical work in labs and programming projects..."

    return (
        // div is only a placeholder for presentation purposes
        <CoursePage>
            {/* <CourseInfo>
                <a href={handbook} target="_blank" rel="noreferrer">{course} Handbook Page</a>
                <h4>Faculty</h4>
                <p>{faculty}</p>
                <h4>Terms available</h4>
                <p>{termsAvailable}</p>
                <h4>Course Description</h4>
                <p style={{maxWidth: "30rem"}}>
                    {courseDesc}
                    <a href={handbook} target="_blank" rel="noreferrer">
                        See more
                    </a>
                </p>
            </CourseInfo> */}
            <ReviewContainer>
                <ReviewHeadings>
                    <div>
                        <b>{props.title}</b>
                    </div>
                    <div>
                        <b>{props.date}</b>
                    </div>
                </ReviewHeadings>
                <ReviewHeadings>
                    <div>Overall: {props.overallRating}</div>
                    <div>{props.reviewer}</div>
                </ReviewHeadings>
                <ReviewHeadings>
                    <div>Term Taken: {props.termTaken}</div>
                    <div>Grade: {props.grade}</div>
                </ReviewHeadings>

                <Ratings>
                    <IndivRating>
                        <p>Enjoyment</p>
                        <p>{props.Enjoyment}</p>
                    </IndivRating>
                    <IndivRating>
                        <p>Usefulness</p>
                        <p>{props.Usefulness}</p>
                    </IndivRating>
                    <IndivRating>
                        <p>Manageability</p>
                        <p>{props.Manageability}</p>
                    </IndivRating>
                </Ratings>

                <ReviewText>
                    this course is ass
                </ReviewText>

                <Interactions>
                    <p>thumbs up {props.thumbsUp} or thumbs down {props.thumbsDown}</p>
                    <p>save or flag</p>
                </Interactions>
            </ReviewContainer>

        </CoursePage>
    );
}
