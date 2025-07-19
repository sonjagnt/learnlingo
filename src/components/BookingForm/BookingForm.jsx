import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../contexts/auth-context";
import s from "./BookingForm.module.css";
import toast from "react-hot-toast";

export const BookingForm = ({ teacher, closeModal }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Full name must be at least 3 characters long")
      .max(50, "Too long")
      .required("Name is required"),
    email: Yup.string()
      .email("Must be a valid email")
      .min(3, "Email is too short")
      .max(50, "Email is too long")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .min(5, "Phone number has to be at least 5 characters long")
      .max(50, "Too long")
      .required("Phone number is required"),
  });

  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async ({ name, email, phoneNumber }) => {
    try {
      if (user) {
        toast(
          `Thank you, ${name}! Your trial lesson with ${teacher.name} has been booked successfully!`,
          {
            icon: "🎉",
          }
        );

        localStorage.setItem(
          "bookingDetails",
          JSON.stringify({
            name,
            email,
            phoneNumber,
            teacher: { name: teacher.name, surname: teacher.surname },
          })
        );
        closeModal();
      } else {
        throw new Error("User not authenticated");
      }
    } catch (error) {
      console.error("Booking Error:", error);
    }
  };

  return (
    <div className={s.bookingForm}>
      <div>
        <div className="text">
          <h2 className={s.title}>Book trial lesson</h2>
          <p>
            Our experienced tutor will assess your current language level,
            discuss your learning goals, and tailor the lesson to your specific
            needs.
          </p>
        </div>
        <div className={s.teacherInfo}>
          <img src={teacher.avatar_url} className={s.img} />
          <p className={s.teacher}>Your teacher</p>
          <p className={s.name}>
            {teacher.name} {teacher.surname}
          </p>
        </div>
        <p className={s.reason}>
          What is your main reason for learning English?
        </p>
        <ul className={s.radioList}>
          <li>
            <label>
              <input type="radio" name="reason" />
              Career and business
            </label>
          </li>
          <li>
            <label>
              <input type="radio" name="reason" />
              Lesson for kids
            </label>
          </li>
          <li>
            <label>
              <input type="radio" name="reason" />
              Living abroad
            </label>
          </li>
          <li>
            <label>
              <input type="radio" name="reason" />
              Exams and coursework
            </label>
          </li>
          <li>
            <label>
              <input type="radio" name="reason" />
              Culture, travel or hobby
            </label>
          </li>
        </ul>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name")} placeholder="Full Name" />
          <span>{errors.name?.message}</span>
          <input {...register("email")} placeholder="Email" />
          <span>{errors.email?.message}</span>
          <input {...register("phoneNumber")} placeholder="Phone number" />
          <span>{errors.phoneNumber?.message}</span>
          <button type="submit">Book</button>
        </form>
      </div>
    </div>
  );
};
