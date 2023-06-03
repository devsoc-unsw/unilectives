import { IHttpError } from "../interfaces/IApiResponses";
import { HTTPError } from "./errors";

export const envVars: string[] = [
  "POSTGRESQL_HOST",
  "POSTGRESQL_USER",
  "POSTGRESQL_PASSWORD",
  "POSTGRESQL_DATABASE",
  "JWT_SECRET",
];

export const unauthorizedError: IHttpError = {
  errorCode: 401,
  errorMessage: "Unauthorized error occured",
};

export const badRequest: IHttpError = {
  errorCode: 400,
  errorMessage: "Bad request",
};

export const timeoutError: IHttpError = {
  errorCode: 408,
  errorMessage: "Timeout, the transaction hasn't completed yet, please retry",
};

export const internalServerError: IHttpError = {
  errorCode: 500,
  errorMessage: "An internal server error occurred",
};

export const getResponseFromHttpError = (error: HTTPError): IHttpError => {
  return {
    errorCode: error.errorCode,
    errorMessage: error.errorMessage,
  };
};

/*
Dear coder,

On behalf of the CSElectives team of 2023 led by Aimen Hamed and Joanna He
we would like to formally extend our apologies for this mess. We hope you don't
find this message.

These faults lie directly with us, the directors, do not blame our commies at all.

Thank you,
Sorry,
Godbless (you need it),
CSElectives team 2023 (not the commies trust).
*/
export const courseFieldsWithRatings = `
c.course_code AS "courseCode",
c.archived,
c.attributes,
c.calendar,
c.campus,
c.description,
c.enrolment_rules AS "enrolmentRules",
c.equivalents,
c.exclusions,
c.faculty,
c.field_of_education AS "fieldOfEducation",
c.gen_ed AS "genEd",
c.level,
c.school,
c.study_level AS "studyLevel",
c.terms,
c.title,
c.uoc,
AVG(r.overall_rating) AS "overallRating",
AVG(r.manageability) AS "manageability",
AVG(r.usefulness) AS "usefulness",
AVG(r.enjoyability) AS "enjoyability",
CAST(COUNT(r.review_id) AS INT) AS "reviewCount"
`