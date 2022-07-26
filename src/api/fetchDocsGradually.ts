import {
  limit,
  orderBy,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  startAfter,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { getNotesRef, sleep } from "./helpers";

const PAGE_SIZE = 50;
const SLEEP_BETWEEN_PAGES = 5;

export const fetchDocsGradually = async (
  maxCount: number,
  onLoadingPage: (count: number) => void
) => {
  console.log("loading page...");

  const ref = getNotesRef();

  let lastSyncDate: Date | undefined = undefined;
  let lastDoc: QueryDocumentSnapshot<DocumentData> | null = null;
  const baseConstraints = [orderBy("updated_at", "asc")];

  let count = 0;
  do {
    await sleep(SLEEP_BETWEEN_PAGES);

    const constraints: QueryConstraint[] = [
      ...baseConstraints,
      limit(PAGE_SIZE),
    ];

    if (lastSyncDate) {
      constraints.push(where("updated_at", ">", lastSyncDate));
    }

    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }

    const pageQuery = query(ref, ...constraints);
    const snap = await getDocs(pageQuery);

    count += snap.docs.length;
    console.log(`loaded ${snap.docs.length} records. total ${count} records`);
    onLoadingPage(count);
  } while (count < maxCount);

  console.log("all pages are loaded");
  return null;
};
