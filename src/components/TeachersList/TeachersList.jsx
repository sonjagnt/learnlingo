import { useEffect, useState } from "react";
import { addToFavorites } from "../../service/firebase-api";
import s from "./TeachersList.module.css";
import { IoBookOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../contexts/auth-context";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsEnd,
  selectIsLoading,
  selectLastKey,
  selectTeachers,
} from "../../redux/teachers/selectors";
import {
  selectLanguages,
  selectLevels,
  selectPrice,
} from "../../redux/filters/selectors";
import { clearTeachers, loadTeachers } from "../../redux/teachers/slice";
import { DotLoader } from "react-spinners";
import { FilterBar } from "../FilterBar/FirlterBar";
import { TeacherDetails } from "../TeacherDetails/TeacherDetails";
import clsx from "clsx";

export const TeachersList = () => {
  const [detailsId, setDetailsId] = useState(null);
  const [activeLevels, setActiveLevels] = useState({});

  const languages = useSelector(selectLanguages);
  const levels = useSelector(selectLevels);
  const price = useSelector(selectPrice);

  const teachers = useSelector(selectTeachers);
  const lastKey = useSelector(selectLastKey);
  const isEnd = useSelector(selectIsEnd);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const { user } = useAuth();

  const handleLoadMore = () => {
    if (!isEnd && !isLoading) {
      dispatch(
        loadTeachers({
          lastKey,
          limit: 4,
          filters: { language: languages, level: levels, price: price },
        })
      );
    }
    if (isEnd) {
      toast("Seems like you've scrolled through all the teachers!", {
        icon: "😞",
      });
    }
  };

  const addFavorite = async (teacherId) => {
    if (!user) {
      toast("Please log in to use this feature!", {
        icon: "🙏",
      });
      return;
    }

    const teacher = teachers.find((teacher) => teacher.id === teacherId);
    if (!teacher) return;

    try {
      await addToFavorites(user.uid, teacher.id, teacher);
      toast("Teacher added to favorites!", {
        icon: "❤️",
        position: "bottom-center",
      });
    } catch (e) {
      console.log(e.message);
      toast("Failed to add to favorites. Please try again.", {
        icon: "❌",
      });
    }
  };

  useEffect(() => {
    dispatch(clearTeachers());

    dispatch(
      loadTeachers({
        lastKey: null,
        limit: 4,
        filters: { language: languages, level: levels, price: price },
      })
    );
  }, [dispatch, languages, levels, price]);

  return (
    <section className={s.listContainer}>
      <FilterBar />
      <ul className={s.teacherList}>
        <DotLoader color="var(--yellow)" loading={isLoading} />
        {teachers.map((teacher) => (
          <li key={teacher.id} className={s.card}>
            <div className={s.cardHeader}>
              <p>Languages</p>

              <ul className={s.headerInfo}>
                <li className={s.headerInfoItem}>
                  <IoBookOutline size={16} /> Lessons online
                </li>
                <li>Lessons done: {teacher.lessons_done}</li>
                <li>
                  <TiStarFullOutline fill="var(--yellow)" />
                  Rating: {teacher.rating}
                </li>
                <li>Price/1 hour: {teacher.price_per_hour}$</li>
              </ul>
              <button type="button">
                <FaRegHeart size={26} onClick={() => addFavorite(teacher.id)} />
              </button>
              <Toaster />
            </div>

            <img src={teacher.avatar_url} className={s.avatar} />
            <div className={s.teacherInfo}>
              <h3>
                {teacher.name} {teacher.surname}
              </h3>
              <ul>
                <li>
                  <span className={s.grayText}>Speaks:</span>{" "}
                  {teacher.languages}
                </li>
                <li>
                  <span className={s.grayText}>Lessons info:</span>{" "}
                  {teacher.lesson_info}
                </li>
                <li>
                  <span className={s.grayText}>Conditions:</span>{" "}
                  {teacher.conditions}
                </li>
              </ul>
              {detailsId === teacher.id ? (
                <TeacherDetails teacher={teacher} />
              ) : (
                <button
                  type="button"
                  className={s.readMoreBtn}
                  onClick={() => setDetailsId(teacher.id)}
                >
                  Read more
                </button>
              )}
            </div>
            <ul className={s.lvls}>
              {teacher.levels.map((level) => (
                <li
                  key={level}
                  className={clsx(s.lvl, {
                    [s.active]: activeLevels[teacher.id] === level,
                  })}
                  onClick={() =>
                    setActiveLevels((prev) => ({
                      ...prev,
                      [teacher.id]: level,
                    }))
                  }
                >
                  #{level}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {isEnd && <Toaster />}

      {!isEnd && !isLoading && (
        <button type="button" onClick={handleLoadMore} className={s.btn}>
          Load more
        </button>
      )}
    </section>
  );
};
