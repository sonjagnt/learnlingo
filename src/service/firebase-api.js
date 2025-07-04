import {
  get,
  ref,
  limitToFirst,
  startAt,
  query,
  orderByKey,
} from "firebase/database";
import { database } from "../utils/firebase";

export const fetchTeachers = async (startFrom = null, pageSize = 4) => {
  try {
    const teachersRef = ref(database, "/");

    const postsQuery = startFrom
      ? query(
          teachersRef,
          orderByKey(),
          startAt(startFrom),
          limitToFirst(pageSize)
        )
      : query(teachersRef, orderByKey(), limitToFirst(pageSize));

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
