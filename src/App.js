import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/Login";
import Home from "./components/Home";
import PrivateRoutes from "./components/ProtectedRoute";
import ResistrationForm from "./components/Registration";

import "./App.css";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/login" element={<LoginForm />} />
      <Route exact path="/register" element={<ResistrationForm />} />
      <Route element={<PrivateRoutes />}>
        <Route exact path="/" element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
