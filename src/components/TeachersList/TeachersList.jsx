import { useState, useEffect } from "react";
import { fetchTeachers } from "../../service/firebase-api";
import s from "./TeacherList.module.css";
import { IoBookOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";

export const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);
  const [currentCursor, setCursor] = useState(null);

  async function handleLoadMore() {
    const cards = await fetchTeachers(currentCursor, 4);
    if (cards.length > 0) {
      if (currentCursor) {
        cards.shift();
      }
      setTeachers((prev) => [...prev, ...cards]);
      setCursor(cards[cards.length - 1].id);
      console.log("Page:", cards);
    } else {
      console.log("No more posts.");
    }
  }

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
    <div>
      TeachersList
      <ul className={s.teacherList}>
        <div>
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
                  <FaRegHeart size={26} />
                </button>
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
        </div>
      </ul>
      <button type="button" onClick={() => handleLoadMore()}>
        Load more
      </button>
    </div>
  );
};
