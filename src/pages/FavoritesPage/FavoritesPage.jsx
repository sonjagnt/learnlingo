import { useEffect } from "react";
import s from "./FavoritesPage.module.css";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFavs,
  selectFavsIsLoading,
} from "../../redux/favorites/selectors";
import { loadFavs } from "../../redux/favorites/slice";
import { DotLoader } from "react-spinners";
import { FaRegHeart } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { TiStarFullOutline } from "react-icons/ti";

export const FavoritesPage = () => {
  const user = getAuth().currentUser;
  const dispatch = useDispatch();
  const favs = useSelector(selectFavs);

  const isLoading = useSelector(selectFavsIsLoading);

  useEffect(() => {
    if (user) {
      dispatch(loadFavs({ userId: user.uid }));
    }
    return;
  }, [dispatch]);

  return (
    <section className={s.listContainer}>
      <ul className={s.favList}>
        <DotLoader color="var(--yellow)" loading={isLoading} />
        {favs.map((fav) => (
          <li key={fav.id} className={s.card}>
            <div className={s.cardHeader}>
              <p>Languages</p>

              <ul className={s.headerInfo}>
                <li className={s.headerInfoItem}>
                  <IoBookOutline size={16} /> Lessons online
                </li>
                <li>Lessons done: {fav.lessons_done}</li>
                <li>
                  <TiStarFullOutline fill="var(--yellow)" />
                  Rating: {fav.rating}
                </li>
                <li>Price/1 hour: {fav.price_per_hour}</li>
              </ul>
              <button type="button">
                <FaRegHeart size={26} onClick={() => addFavorite(fav.id)} />
              </button>
            </div>

            <img src={fav.avatar_url} className={s.avatar} />
            <div className={s.favInfo}>
              <h3>
                {fav.name} {fav.surname}
              </h3>
              <ul>
                <li>
                  <span className={s.grayText}>Speaks:</span> {fav.languages}
                </li>
                <li>
                  <span className={s.grayText}>Lessons info:</span>{" "}
                  {fav.lesson_info}
                </li>
                <li>
                  <span className={s.grayText}>Conditions:</span>{" "}
                  {fav.conditions}
                </li>
              </ul>
              <button type="button" className={s.readMoreBtn}>
                Read more
              </button>
            </div>
            <ul className={s.lvls}>
              {fav.levels.map((level) => (
                <li className={s.lvl} key={level}>
                  {level}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};
