import {
  get,
  ref,
  set,
  limitToFirst,
 orderByKey,
  startAfter, 
  query,

} from "firebase/database";
import { database } from "../utils/firebase";
import { getAuth } from "firebase/auth";

export const fetchTeachers = async (
  startFrom = null,
  pageSize = 4,
  filters = {}
) => {
  const { language, level, price } = filters;
  const teachersRef = ref(database, "/teachers");

  const snapshot = await get(query(teachersRef, orderByKey(), limitToFirst(1000)));

  if (!snapshot.exists()) {
    return { teachers: [], lastKey: null, hasMore: false };
  }

  let list = Object.entries(snapshot.val()).map(([id, teacher]) => ({
    id,
    ...teacher,
  }));

  list = list.filter((teacher) => {
    const languageMatch = language
      ? Array.isArray(teacher.languages) && teacher.languages.includes(language)
      : true;

    const levelMatch = level
      ? Array.isArray(teacher.levels) && teacher.levels.includes(level)
      : true;

    const priceMatch = price
      ? teacher.price_per_hour <= parseInt(price, 10)
      : true;

    return languageMatch && levelMatch && priceMatch;
  });

  list.sort((a, b) => (a.id > b.id ? 1 : -1));

  let startIndex = 0;
  if (startFrom) {
    const index = list.findIndex((t) => t.id === startFrom);
    startIndex = index >= 0 ? index + 1 : 0;
  }

  const paged = list.slice(startIndex, startIndex + pageSize);

  const lastKey = paged.length > 0 ? paged[paged.length - 1].id : null;
  const hasMore = startIndex + pageSize < list.length;

  return {
    teachers: paged,
    lastKey,
    hasMore,
  };
};

export const addToFavorites = async (userId, itemId, itemDetails) => {
  const user = getAuth().currentUser;
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
  const user = getAuth().currentUser;
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

export const fetchFavorites = async (userId) => {
  const favoritesRef = ref(database, `users/${userId}/favorites`);
  const snapshot = await get(favoritesRef);

  if (snapshot.exists()) {
    const data = snapshot.val();

    const response = Object.entries(data)
      .filter(([_, details]) => details !== null && details !== undefined)
      .map(([id, details]) => ({
        id,
        ...details,
      }));
      return response;
  } else {
    return [];
  }
};