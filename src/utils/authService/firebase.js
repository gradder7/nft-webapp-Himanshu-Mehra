import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
