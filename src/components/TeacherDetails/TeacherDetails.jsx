import { FaUser } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";
import s from "./TeacherDetails.module.css";
import { ModalWindow } from "../../ui/ModalWindow";
import { useState } from "react";
import { BookingForm } from "../BookingForm/BookingForm";

export const TeacherDetails = ({ teacher }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={s.details}>
      <p>{teacher.experience}</p>
      {teacher.reviews.map((r) => (
        <div key={r.comment}>
          <div className={s.reviewer}>
            <div className={s.iconWrapper}>
              <FaUser color="var(--white)" size={18} />
            </div>
            <p>{r.reviewer_name}</p>
            <span className={s.rating}>
              <TiStarFullOutline color="var(--yellow)" />
              <p>
                {r.reviewer_rating.toLocaleString("en-US", {
                  minimumFractionDigits: 1,
                  minimumIntegerDigits: 1,
                })}
              </p>
            </span>
          </div>
          <p className={s.comment}>{r.comment}</p>
        </div>
      ))}
      <button type="button" onClick={handleOpen} className={s.btn}>
        Book trial lesson
      </button>
      <ModalWindow isOpen={isOpen} onClose={handleClose}>
        {<BookingForm teacher={teacher} />}
      </ModalWindow>
    </div>
  );
};
