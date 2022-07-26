import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { chunk } from "lodash-es";
import { readNotes } from "./read-notes.mjs";

const BATCH_SIZE = 40;

const NOTES_COLLECTION = "sample_data";

const app = initializeApp({
  credential: applicationDefault(),
});

export const db = getFirestore(app);

async function setupNotes() {
  const coll = db.collection(`${NOTES_COLLECTION}`);

  const allNotes = readNotes();

  for (let notes of chunk(allNotes, BATCH_SIZE)) {
    const batch = db.batch();

    for (let note of notes) {
      console.log(`creating documnet ${note.id} / ${allNotes.length}`);
      const ref = coll.doc(note.id);
      batch.set(ref, note);
    }

    await batch.commit();
  }
}

async function main() {
  await setupNotes();
}

main();
