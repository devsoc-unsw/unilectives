export default async function getCourses() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    if (!(res.ok)) throw new Error('failed to fetch courses');
    return res.json();
}