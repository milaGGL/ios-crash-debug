import { Timestamp } from "firebase-admin/firestore";
import { createNote } from "./create-note.mjs";
import { noteToJson } from "./json-note.mjs";
import fs from "fs";

const NOTE_NUM = 5020;

const sleep = (time = 0) => {
  return new Promise((success) => {
    setTimeout(success, time);
  });
};

async function generateNotes() {
  fs.mkdirSync("./notes/", { recursive: true });

  for (let i = 1; i <= NOTE_NUM; i++) {
    const id = `id-` + `${i}`.padStart(5, "0");
    const filepath = `./notes/${id}.json`;

    if (!fs.existsSync(filepath)) {
      console.log("generate note", filepath);
      const note = createNote(id);
      const str = noteToJson(note);
      await sleep(5);
      fs.writeFileSync(`./notes/${id}.json`, str, { encoding: "utf-8" });
    }
  }
}

generateNotes();
