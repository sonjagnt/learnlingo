import {
  get,
  ref,
  set,
  limitToFirst,
  orderByKey,
  query,
  remove,
} from "firebase/database";
import { database } from "../utils/firebase";

export const fetchTeachers = async (
  startFrom = null,
  pageSize = 4,
  filters = {}
) => {
  const { language, level, price } = filters;
  const teachersRef = ref(database, "/teachers");

  const snapshot = await get(
    query(teachersRef, orderByKey(), limitToFirst(1000))
  );

  if (!snapshot.exists()) {
    return { teachers: [], lastKey: null, hasMore: false };
  }

  let list = Object.entries(snapshot.val()).map(([id, teacher]) => ({
    id,
    ...teacher,
  }));

  list = list.filter((teacher) => {
    const normalize = (str) => str.toLowerCase().replace(/\s+/g, "");

    const languageMatch = language
      ? Array.isArray(teacher.languages) &&
        teacher.languages.map((l) => normalize(l)).includes(normalize(language))
      : true;

    const levelMatch = level
      ? Array.isArray(teacher.levels) && teacher.levels.includes(level)
      : true;

    const priceMatch = price
      ? teacher.price_per_hour <= parseInt(price, 10)
      : true;

    return languageMatch && levelMatch && priceMatch;
  });

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

export const toggleFavorite = async (userId, itemId, itemDetails) => {
  const favoriteRef = ref(database, `users/${userId}/favorites/${itemId}`);

  try {
    const snapshot = await get(favoriteRef);

    if (snapshot.exists()) {
      await set(favoriteRef, null);
      return { added: false };
    } else {
      await set(favoriteRef, itemDetails);
      return { added: true };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeFavoriteDB = async (userId, itemId) => {
  const favoriteRef = ref(database, `users/${userId}/favorites/${itemId}`);
  await remove(favoriteRef);
};
