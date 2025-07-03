import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.svg";
import { LuLogIn } from "react-icons/lu";
import s from "./Header.module.css";

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.logo}>
        <img src={logo} />
        <Link to="/" className={s.logoText}>
          LearnLingo
        </Link>
      </div>
      <nav className={s.nav}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/teachers">Teachers</NavLink>
      </nav>
      <div className={s.buttons}>
        <div className={s.login}>
          <LuLogIn color="var(--yellow)" size={20} />
          <button type="button">Log in</button>
        </div>
        <button type="button" className={s.blackBtn}>
          Registration
        </button>
      </div>
    </header>
  );
};
