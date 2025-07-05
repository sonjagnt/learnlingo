import Modal from "react-modal";

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
      <button onClick={onClose}>Close</button>
      {children}
    </Modal>
  );
};
