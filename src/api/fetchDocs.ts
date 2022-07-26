import {
  limit,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  getDocs,
  DocumentData,
  orderBy,
  where,
  startAfter,
} from "firebase/firestore";
import { getNotesRef, sleep } from "./helpers";

export const fetchDocs = async (
  maxCount: number,
  onLoadingPage: (count: number) => void
) => {
  console.log("loading documents...");

  const ref = getNotesRef();

  const baseConstraints = [orderBy("updated_at", "asc")];
  const constraints: QueryConstraint[] = [...baseConstraints, limit(maxCount)];

  const pageQuery = query(ref, ...constraints);
  const snap = await getDocs(pageQuery);

  console.log(`loaded ${snap.docs.length} records`);
  onLoadingPage(maxCount);

  console.log("all documents are loaded.");

  return null;
};
