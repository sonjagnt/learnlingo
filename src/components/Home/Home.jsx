import img from "../../assets/block.png";
import s from "./Home.module.css";

export const Home = () => {
  return (
    <section className={s.container}>
      <div className={s.main}>
        <h1>
          Unlock your potential with the best{" "}
          <span className={s.accent}>language</span> tutors
        </h1>
        <p>
          Embark on an Exciting Language Journey with Expert Language Tutors:
          Elevate your language proficiency to new heights by connecting with
          highly qualified and experienced tutors.
        </p>
        <button type="button" className={s.btn}>
          Get started
        </button>
      </div>

      <img src={img} />

      <ul className={s.statList}>
        <li>
          <p className={s.statNum}>32000+</p>
          <p className={s.statDescr}>Experienced tutors</p>
        </li>
        <li>
          <p className={s.statNum}>300000+</p>
          <p className={s.statDescr}>5-star tutor reviews</p>
        </li>
        <li>
          <p className={s.statNum}>120+</p>
          <p className={s.statDescr}>Subjects taught</p>
        </li>
        <li>
          <p className={s.statNum}>200+</p>
          <p className={s.statDescr}>Tutor nationalities</p>
        </li>
      </ul>
    </section>
  );
};
