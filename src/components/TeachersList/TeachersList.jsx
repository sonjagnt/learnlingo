import { useState, useEffect } from "react";
import { fetchTeachers } from "../../service/firebase-api";

export const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);

  const [currentCursor, setCursor] = useState(null);

  async function handleLoadMore() {
    const cards = await fetchTeachers(currentCursor, 4);
    if (cards.length > 0) {
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

  console.log(teachers);

  return (
    <div>
      TeachersList
      <ul>
        <div>
          {teachers.map((teacher) => (
            <li key={teacher.id}>
              <div>
                <p>Languages</p>
                <ul>
                  <li>Lessons online</li>
                  <li>Lessons done: {teacher.lessons_done}</li>
                  <li>Rating: {teacher.rating}</li>
                  <li>Price/1 hour: {teacher.price_per_hour}</li>
                </ul>
                <button type="button">Favorites btn</button>
              </div>
              <p>
                {teacher.name} {teacher.surname}
              </p>
              <ul>
                <li>Speaks: {teacher.languages}</li>
                <li>Lessons info: {teacher.lessons_info}</li>
                <li>Conditions: {teacher.conditions}</li>
              </ul>
              <button type="button">Read more</button>
              {teacher.levels}
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
