import axios from "axios";

// One Axios instance for the whole app.
// For Django later, set VITE_API_URL=http://127.0.0.1:8000/api in a .env file.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://jsonplaceholder.typicode.com",
});

const courseNames = ["Python", "React", "Django", "PostgreSQL"];
const statuses = ["Active", "Completed", "Inactive"];

// REAL request. The .map() reshapes the API's data into what our pages expect.
// With Django, this mapping is the only part that changes.
export async function getStudents() {
  const response = await api.get("/users");

  return response.data.map((user, index) => ({
    id: user.id,
    name: user.name,
    email: user.email.toLowerCase(),
    course: courseNames[index % courseNames.length], // filled in by us
    progress: (index * 17 + 10) % 101,               // filled in by us
    status: statuses[index % statuses.length],       // filled in by us
  }));
}

// MOCK request: same shape as a real one (async, takes time, returns data)
export async function getCourses() {
  await new Promise((resolve) => setTimeout(resolve, 600)); // fake network delay

  return [
    { id: 1, title: "Python", instructor: "Dr. Amara Okoye", duration: "8 weeks", enrolled: 320, status: "Active" },
    { id: 2, title: "React", instructor: "Daniel Reyes", duration: "6 weeks", enrolled: 280, status: "Active" },
    { id: 3, title: "Django", instructor: "Hana Sato", duration: "10 weeks", enrolled: 190, status: "Upcoming" },
    { id: 4, title: "PostgreSQL", instructor: "Tobias Lindqvist", duration: "4 weeks", enrolled: 120, status: "Draft" },
  ];
}