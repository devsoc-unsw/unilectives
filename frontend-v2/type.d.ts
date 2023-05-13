// type Course = {
//     userId: number,
//     id: number,
//     title: string,
//     completed: boolean
// }

// type Course = {
//     faculty: string,
//     code: string,
//     name: string,
//     terms: string[],
//     rating: number; // same as overallRating
//     reviewCount: number;
//     overallRating: number;
//     manageability: number;
//     usefulness: number;
//     enjoyability: number;
// }

type Course = {
    courseCode: string;
    archived: boolean;
    attributes: string[];
    calendar: string;
    campus: string;
    description: string;
    enrolmentRules: string;
    equivalents: string[];
    exclusions: string[];
    faculty: string;
    fieldOfEducation: string;
    genEd: boolean;
    level: number;
    school: string;
    studyLevel: string;
    terms: number[];
    title: string;
    uoc: number;
    rating: number; // same as overallRating
    reviewCount: number;
    overallRating: number;
    manageability: number;
    usefulness: number;
    enjoyability: number;
}
  
// // Reviews
// type Review = {
//     reviewId: string;
//     zid: string;
//     courseCode: string;
//     authorName: string;
//     description: string;
//     grade: number;
//     termTaken: string;
//     createdTimestamp: string;
//     updatedTimestamp: string;
//     upvotes: string[];
//     manageability: number;
//     enjoyability: number;
//     usefulness: number;
//     overallRating: number;
// }