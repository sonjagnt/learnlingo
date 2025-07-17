import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { auth } from "../../utils/firebase";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../../styles/forms.css";

const schema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const LoginForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <>
      <div className="text">
        <h2>Log In</h2>
        <p>
          Welcome back! Please enter your credentials to access your account and
          continue your search for an teacher.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Email" {...register("email")} />
        <span>{errors.email?.message}</span>
        <input placeholder="Password" {...register("password")} />
        <span>{errors.password?.message}</span>
        <button type="submit">Log In</button>
      </form>
    </>
  );
};
