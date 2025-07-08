import {
  get,
  ref,
  set,
  limitToFirst,
  startAt,
  query,
  orderByKey,
} from "firebase/database";
import { database } from "../utils/firebase";
import { getAuth } from "firebase/auth";

export const fetchTeachers = async (startFrom = null, pageSize = 4) => {
  const teachersRef = ref(database, "/teachers");

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
};

export const addToFavorites = async (userId, itemId, itemDetails) => {
  const user = getAuth();
  if (!user) {
    throw new Error("User is not authenticated");
  }
  const favoritesRef = ref(database, `users/${userId}/favorites/${itemId}`);
  try {
    await set(favoritesRef, itemDetails);
  } catch (error) {
    console.error( error);
  }
}

export const removeFromFavorites = async (userId, itemId) => {
  if (!user) {
    throw new Error("User is not authenticated");
  }
  try {
    await set(ref(database, `users/${userId}/favorites/${itemId}`), null);
    console.log('teacher removed from favorites');
  }
  catch(e) {
    e.message
  }
}