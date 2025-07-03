import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
  password: Yup.string()
    .min(7, "Password has to be at least 7 characters long")
    .max(50, "Too long")
    .required("Password is required"),
});

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async ({ email, password, name }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      console.log("lucky you!");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      RegistrationForm
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Name" />
        <span>{errors.name?.message}</span>
        <input {...register("email")} placeholder="Email" />
        <span>{errors.email?.message}</span>
        <input {...register("password")} placeholder="Password" />
        <span>{errors.password?.message}</span>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
