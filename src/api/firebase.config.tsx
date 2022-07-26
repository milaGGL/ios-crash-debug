import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import * as firebaseConfig from "../config/firebase.client.json"

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
