import { Routes, Route } from "react-router";
import { HomePage } from "../../pages/HomePage/HomePage";
import { TeachersPage } from "../../pages/TeachersPage/TeachersPage";
import { Header } from "../Header/Header";
import { RegistrationPage } from "../../pages/RegistrationPage/RegistrationPage";
import { LoginPage } from "../../pages/LoginPage/LoginPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
