import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.svg";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import s from "./Header.module.css";
import { auth } from "../../utils/firebase";
import { useAuth } from "../../contexts/auth-context";

export const Header = ({ onLogin, onRegister }) => {
  const { user } = useAuth();
  const handleLogOut = () => {
    auth.signOut().then(() => {
      console.log("Signed out");
    });
  };

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
        {user && <NavLink to="/favorites">Favorites</NavLink>}
      </nav>
      {user ? (
        <div className={s.login}>
          <LuLogOut size={20} />
          <button type="button" onClick={() => handleLogOut()}>
            Log Out
          </button>
        </div>
      ) : (
        <div className={s.buttons}>
          <div className={s.login}>
            <LuLogIn color="var(--yellow)" size={20} />
            <button type="button" onClick={onLogin}>
              Log in
            </button>
          </div>
          <button type="button" className={s.blackBtn} onClick={onRegister}>
            Registration
          </button>
        </div>
      )}
    </header>
  );
};
