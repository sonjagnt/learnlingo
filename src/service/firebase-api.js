import {
  get,
  ref,
  orderByChild,
  limitToFirst,
  startAt,
  query,
} from "firebase/database";
import { database } from "../utils/firebase";

export const fetchTeachers = async (startFrom = null, pageSize = 4) => {
  const dbRef = ref(database);

  try {
    const postsQuery = startFrom
      ? query(
          dbRef,
          orderByChild("id"),
          startAt(startFrom + 1),
          limitToFirst(pageSize)
        )
      : query(dbRef, orderByChild("id"), limitToFirst(pageSize));

    const snapshot = await get(postsQuery);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const list = Object.entries(data).map(([id, teacher]) => ({
        id,
        ...teacher,
      }));
      return list;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
