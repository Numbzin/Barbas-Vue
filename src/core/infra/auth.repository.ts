import { app } from "../services/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

export async function addAuth(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}
