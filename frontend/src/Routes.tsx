import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CoursePage from "./pages/CoursePage/CoursePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import TCsPage from "./pages/TCsPage/TCsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

const Router = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/termsandconditions" element={<TCsPage />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/course/:courseCode" element={<CoursePage />} />
    <Route path="/profile/:zid" element={<ProfilePage />} />
    <Route />
  </Routes>
);

export default Router;
