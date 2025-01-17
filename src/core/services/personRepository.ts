import { Person } from "@/core/domain/Person";
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";
import { addAuth } from "../infra/auth.repository";

// Função para adicionar uma pessoa ao Firestore
export async function addPerson(person: Person): Promise<string> {
  try {
    // Criação do usuário de autenticação no Firebase
    const userCredential = await addAuth(person.email, person.password);
    const user = userCredential.user;

    // Define o ID do documento como o UID do usuário autenticado
    const docId = user.uid;

    const personData = {
      uid: user.uid, // ID do usuário autenticado no Firebase Auth
      name: person.name,
      email: person.email,
      telephone: person.telephone,
      isActive: person.isActive ?? true, // Default para true se não especificado
      typePerson: person.typePerson ?? "fisica", // Default para "fisica"
      typeAccess: person.typeAccess ?? "cliente", // Default para "cliente"
    };

    await setDoc(doc(collection(db, "persons"), docId), personData);

    return docId; // Retorna o ID do documento criado
  } catch (error) {
    console.error("Erro ao adicionar pessoa:", error);
    throw error;
  }
}

export async function queryActivePersons(): Promise<DocumentData[]> {
  try {
    const q = query(collection(db, "persons"), where("isActive", "==", true));
    const querySnapshot = await getDocs(q);

    const persons: DocumentData[] = [];
    querySnapshot.forEach(doc => persons.push({ id: doc.id, ...doc.data() }));
    return persons;
  } catch (error) {
    console.error("Erro ao buscar pessoas ativas:", error);
    throw error;
  }
}
