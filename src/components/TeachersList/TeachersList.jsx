import { useState, useEffect } from "react";
import { fetchTeachers } from "../../service/firebase-api";
import s from "./TeachersList.module.css";
import { IoBookOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../contexts/auth-context";

export const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);
  const [currentCursor, setCursor] = useState(null);
  const [isEnd, setIsEnd] = useState(false);

  const { user } = useAuth();

  async function handleLoadMore() {
    const pageSize = 4;
    const cards = await fetchTeachers(currentCursor, pageSize + 1);

    if (cards.length > 0) {
      let newCards = [...cards];

      if (currentCursor) {
        newCards.shift();
      }

      if (newCards.length > 0) {
        setTeachers((prev) => [...prev, ...newCards]);
        setCursor(newCards[newCards.length - 1].id);

        if (newCards.length < 4) {
          setIsEnd(true);
          toast("Seems like you've scrolled to the very end!", {
            icon: "😞",
            position: "bottom-center",
          });
        }
      } else {
        setIsEnd(true);
        toast("Seems like you've scrolled to the very end!", {
          icon: "😞",
          position: "bottom-center",
        });
      }
    } else {
      setIsEnd(true);
      toast("Seems like you've scrolled to the very end!", {
        icon: "😞",
        position: "bottom-center",
      });
    }
  }

  const userNotify = () => {
    if (!user) {
      toast("Please log in to use this", {
        icon: "🙏",
        position: "bottom-center",
      });
    }
    return;
  };
  useEffect(() => {
    const getTeachers = async () => {
      const list = await fetchTeachers();
      setTeachers(list);
      if (list.length > 0) {
        setCursor(list[list.length - 1].id);
      }
    };
    getTeachers();
  }, []);

  return (
    <div className={s.listContainer}>
      <ul className={s.teacherList}>
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
                <li>Price/1 hour: {teacher.price_per_hour}</li>
              </ul>
              <button type="button">
                <FaRegHeart size={26} onClick={userNotify} />
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
              <button type="button" className={s.readMoreBtn}>
                Read more
              </button>
            </div>
            <ul className={s.lvls}>
              {teacher.levels.map((level) => (
                <li className={s.lvl} key={level}>
                  {level}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {isEnd ? (
        <Toaster />
      ) : (
        <button type="button" onClick={handleLoadMore} className={s.btn}>
          Load more
        </button>
      )}
    </div>
  );
};
