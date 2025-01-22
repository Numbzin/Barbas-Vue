import { postLoginEmail } from "../infra/auth.repository";
import { Person } from "../domain/Person";

export const authService = {
  loginEmail,
};

async function loginEmail(email: string, password: string) {
  return await postLoginEmail(email, password)
    .then(res => {
      const user = res.user;
      return <Person>{
        email: user.email,
        uid: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      };
    })
    .catch(error => {
      console.error(">>> error:", error);
      throw new error("Email ou senha incorretos!");
    });
}
