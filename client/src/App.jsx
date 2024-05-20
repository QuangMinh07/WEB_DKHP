import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./view/Login";
import Private from "./components/Private";
import Control from "./view/Control";
import Admin from "./components/Admin";
import Course from "./view/Course";
import RegisterHP from "./view/RegisterHP";
import DetailDKHP from "./view/DetailDKHP";
import Register from "./view/Register";
import Schedule from "./view/Schedule";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Private />}>
          <Route path="/Control" element={<Control />} />
          <Route path="/RegisterHP" element={<RegisterHP />} />
          <Route path="/DetailDKHP" element={<DetailDKHP />} />
        </Route>
        <Route element={<Admin />}>
          <Route path="/Course" element={<Course />} />
          <Route path="/Schedule" element={<Schedule />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
