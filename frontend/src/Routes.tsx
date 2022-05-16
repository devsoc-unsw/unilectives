import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";

const Router = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
  </Routes>
);

export default Router;
