import { Routes, Route } from "react-router";
import { HomePage } from "../../pages/HomePage/HomePage";
import { TeachersPage } from "../../pages/TeachersPage/TeachersPage";
import { Header } from "../Header/Header";
import { RegistrationPage } from "../../pages/RegistrationPage/RegistrationPage";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { useState } from "react";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegistrationForm } from "../RegistrationForm/RegistrationForm";
import { ModalWindow } from "../../ui/ModalWindow";
import { FavoritesPage } from "../../pages/FavoritesPage/FavoritesPage";
import PrivateRoute from "../PrivateRoute";
import { Toaster } from "react-hot-toast";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const openLogin = () => {
    setModalType(<LoginForm onClose={closeModal} />);
    setModalIsOpen(true);
  };

  const openRegister = () => {
    setModalType(<RegistrationForm onClose={closeModal} />);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalType(null);
  };
  return (
    <>
      <Header onLogin={openLogin} onRegister={openRegister} />
      <ModalWindow isOpen={modalIsOpen} onClose={closeModal}>
        {modalType}
      </ModalWindow>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
