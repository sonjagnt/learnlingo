import { TeachersList } from "../../components/TeachersList/TeachersList";
import s from "./TeachersPage.module.css";

export const TeachersPage = () => {
  return (
    <section className={s.section}>
      <TeachersList />
    </section>
  );
};
