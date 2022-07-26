import { Timestamp } from "firebase-admin/firestore";

const generateRandomString = (length = 6) => {
  let s = "";
  while (s.length < length) {
    s += Math.random().toString(36).substring(2, 15);
  }
  if (s.length > length) {
    s = s.slice(0, length);
  }
  return s;
};

export function createNote(id) {
  return {
    id,
    updated_at: Timestamp.fromDate(new Date()),
    created_at: Timestamp.fromDate(new Date()),

    document: {
      random_string: generateRandomString(39400), // <--- this may be bigger than most fields
    },
  };
}
