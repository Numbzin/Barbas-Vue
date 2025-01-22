import { app } from "../services/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth(app);

export async function addAuth(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

//fazer login firebase
export function postLoginEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
