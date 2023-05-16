import { Course } from "../api/schemas/course.schema";

// required to convert all the objec notations from camel_case as in sql syntax
// to camelCase as per TS syntax
export function toCamelCase(obj: any): Course {
  const newObj: any = {};
  for (const key in obj) {
    const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    newObj[camelCaseKey] = obj[key] === null ? 0 : obj[key];       // can ensure null doesnt show up
  }
  return {
    ...newObj,
    reviewCount:
      typeof newObj.reviewCount === "bigint"
        ? Number(newObj.reviewCount)
        : newObj.reviewCount,
  };
};