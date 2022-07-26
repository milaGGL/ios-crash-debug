import fs from "fs";
import { jsonToNote } from "./json-note.mjs";

export function readNotes() {
  const dirname = "./notes/";

  const fileNames = fs.readdirSync(dirname);

  const notes = [];
  for (const fileName of fileNames) {
    if (!fileName.endsWith(".json")) continue;
    const file = fs.readFileSync(`${dirname}/${fileName}`, "utf-8");
    notes.push(jsonToNote(file));
  }
  return notes;
}
