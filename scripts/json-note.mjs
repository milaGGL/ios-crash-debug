import { Timestamp } from "firebase-admin/firestore";

export function noteToJson(note) {
  return JSON.stringify(note);
}

function jsonToTimestamp(json) {
  return new Timestamp(json._seconds, json._nanoseconds);
}

export function jsonToNote(json) {
  const note = JSON.parse(json);
  return {
    ...note,
    updated_at: jsonToTimestamp(note.updated_at),
    created_at: jsonToTimestamp(note.created_at),
  };
}
