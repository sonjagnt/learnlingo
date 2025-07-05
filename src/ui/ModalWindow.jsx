import { IoCloseOutline } from "react-icons/io5";
import Modal from "react-modal";
import s from "./ModalWindow.module.css";

Modal.setAppElement("#root");

export const ModalWindow = ({ children, onClose, isOpen }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--white)",
      borderRadius: "30px",
      width: " 565px",
      minHeight: "505px",
      border: "none",
      padding: "64px",
      boxShadow: "3px 6px 29px 2px rgba(0,0,0,0.2)",
    },
    overlay: {
      backdropFilter: "blur(5px)",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <button onClick={onClose} className={s.btn}>
        <IoCloseOutline size={32} />
      </button>
      {children}
    </Modal>
  );
};
