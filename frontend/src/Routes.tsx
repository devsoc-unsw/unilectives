import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CoursePage from "./pages/CoursePage/CoursePage";

const Router = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/courses/:courseCode" element={<CoursePage />} />
  </Routes>
);

export default Router;
