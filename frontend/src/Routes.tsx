import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import TCsPage from "./pages/TCsPage/TCsPage";

const Router = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/termsandconditions" element={<TCsPage />} />
  </Routes>
);

export default Router;
