import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendEmailVerification, signInWithEmailLink } from "firebase/auth";
import { useAuth } from "../../contexts/auth-context";
import s from "./BookingForm.module.css";
import toast from "react-hot-toast";

export const BookingForm = ({ teacher }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too short")
      .max(50, "Too long")
      .required("Name is required"),
    email: Yup.string()
      .email("Must be a valid email")
      .min(3, "Too short")
      .max(50, "Too long")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .min(5, "Phone number has to be at least 5 characters long")
      .max(50, "Too long")
      .required("Phone number is required"),
  });

  const user = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = ({ name, email, phoneNumber, reason }) => {
    if (user) {
      toast(
        `Thank you, ${name}! Your trial lesson with ${teacher.name} has been booked successfully!`,
        {
          icon: "🎉",
        }
      );

      //      {
      //     name,
      //     email,
      //     phoneNumber,
      //     reason,
      //     teacher: { name: teacher.name, surname: teacher.surname },
      //   }
    } else {
      console.log("Something went wrong");
    }
  };

  return (
    <div>
      <div className="text">
        <h2>Book trial lesson</h2>
        <p>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>
        <div>
          <img src={teacher.avatar_url} className={s.img} />
          <p>
            {teacher.name} {teacher.surname}
          </p>
        </div>
        <p>What is your main reason for learning English?</p>
        <ul>
          <li>
            <label htmlFor="span">
              <input type="radio" name="reason" {...register("reason")} />
              Career and business
            </label>
          </li>
          <li>
            <label htmlFor="span">
              <input type="radio" name="reason" {...register("reason")} />
              Lesson for kids
            </label>
          </li>
          <li>
            <label htmlFor="span">
              <input type="radio" name="reason" {...register("reason")} />
              Living abroad
            </label>
          </li>
          <li>
            <label htmlFor="span">
              <input type="radio" name="reason" {...register("reason")} />
              Exams and coursework
            </label>
          </li>
          <li>
            <label htmlFor="span">
              <input type="radio" name="reason" {...register("reason")} />
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
          <span>{errors.password?.message}</span>
          <button type="submit">Book</button>
        </form>
      </div>
    </div>
  );
};
