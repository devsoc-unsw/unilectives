import { ICourse } from "src/interfaces/ResponseInterface";

// TODO: someone fill this in pls
// TODO: pls change terms to list of strings thx- Hexamesters?
// Terms: "None"?, e.g distributed systems
export const mockCourses: ICourse[] = [
  {
    courseCode: "COMP1511",
    archived: false,
    attributes: ["yeet"],
    calendar: "cal-123",
    campus: "Kensington",
    description:
      "An introduction to problem-solving via programming, which aims to have students develop \
      proficiency in using a high level programming language. Topics: algorithms, program structures \
      (statements, sequence, selection, iteration, functions), data types (numeric, character), data \
      structures arrays, tuples, pointers, lists), storage structures (memory, addresses), introduction \
      to analysis of algorithms, testing, code quality, teamwork, and reflective practice. The course \
      includes extensive practical work in labs and programming projects. Additional Information: \
      This course should  be taken by all CSE majors, and any other students who have an interest \
      in computing or who wish to be extended. It does not require any prior computing knowledge \
      or experience. COMP1511 leads on to COMP1521, COMP1531, COMP2511 and COMP2521, which form the \
      core of the study of computing at UNSW and which are pre-requisites for the full range of further \
      computing courses. Due to overlapping material, students who complete COMP1511 may not also enrol \
      in COMP1911 or COMP1921.",
    enrolmentRules: "",
    equivalents: ["COMP1917", "DPST1091"],
    exclusions: ["DPST1091"],
    faculty: "Engineering",
    fieldOfEducation: "ugrad",
    genEd: true,
    level: 1,
    school: "School of Computer Science and Engineering",
    studyLevel: "ugrad",
    terms: [0, 1, 2, 3],
    title: "Programming Fundamentals",
    uoc: 6,
    rating: 4,
    reviewsIds: ["review-123", "review-456"],
  },
  {
    courseCode: "COMP1531",
    archived: false,
    attributes: ["yeet"],
    calendar: "cal-123",
    campus: "Kensington",
    description:
      "This course provides an introduction to software engineering principles: basic software \
      lifecycle concepts, modern development methodologies, conceptual modeling and how these \
      activities relate to programming. It also introduces the basic notions of team-based project \
      management via conducting a project to design, build and deploy a simple web-based application. \
      It is typically taken in the term after completing COMP1511, but could be delayed and taken \
      later. It provides essential background for the teamwork and project management required in \
      many later courses.The goal of this course is to expose the students to:basic elements of \
      software engineering: including requirements elicitation, analysis and specification; design; \
      construction; verification and validation; deployment; and operation and maintenancedata modelling \
      software engineering methodologies, processes, measurements, tools and techniquesWeb-based \
      system architecture and development practices on Web platforms.",
    enrolmentRules:
      "Prerequisite: COMP1511 or DPST1091 or COMP1917 or COMP1921",
    equivalents: [],
    exclusions: ["SENG1010", "SENG1020", "SENG1031"],
    faculty: "Engineering",
    fieldOfEducation: "ugrad",
    genEd: true,
    level: 1,
    school: "School of Computer Science and Engineering",
    studyLevel: "ugrad",
    terms: [2, 3],
    title: "Software Engineering Fundamentals",
    uoc: 6,
    rating: 4.5,
    reviewsIds: ["review-123", "review-456"],
  },

  {
    courseCode: "POGG1011",
    archived: false,
    attributes: ["yeet"],
    calendar: "cal-123",
    campus: "Kensington",
    description: "pog course with epic rating",
    enrolmentRules: "",
    equivalents: [],
    exclusions: [],
    faculty: "Science",
    fieldOfEducation: "ugrad",
    genEd: true,
    level: 1,
    school: "School of Computer Science and Engineering",
    studyLevel: "ugrad",
    terms: [0],
    title: "Pog Fundamentals Fundamentals",
    uoc: 6,
    rating: 5,
    reviewsIds: ["review-123", "review-456"],
  },
  {
    courseCode: "UNPOG101",
    archived: false,
    attributes: ["yeet"],
    calendar: "cal-123",
    campus: "Kensington",
    description: "unpog course with crap rating",
    enrolmentRules: "",
    equivalents: [],
    exclusions: [],
    faculty: "Science",
    fieldOfEducation: "ugrad",
    genEd: true,
    level: 1,
    school: "School of Computer Science and Engineering",
    studyLevel: "ugrad",
    terms: [0],
    title: "Unpog Fundamentals",
    uoc: 6,
    rating: 1,
    reviewsIds: ["review-123", "review-456"],
  },
];
