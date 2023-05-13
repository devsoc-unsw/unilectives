export default async function getCourses() {
    const res = await fetch('http://localhost:3030/api/v1/courses');
    if (!(res.ok)) throw new Error('failed to fetch courses');
    const data = await res.json();
    const courses = data.courses;
    return courses;
}