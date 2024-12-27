import { Person } from "@/core/domain/Person";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";

export async function addPerson(person: Person) {
  try {
    const docRef = await addDoc(collection(db, "persons"), {
      name: person.name,
      email: person.email,
      telephone: person.telephone,
      password: person.password,
      isActive: person.isActive || true, // A propriedade isActive, se não definida, assume true
      typePerson: person.typePerson || "fisica", // Default para "fisica"
      typeAccess: person.typeAccess || "cliente", // Default para "cliente"
    });
    return docRef.id;
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
    querySnapshot.forEach((doc) => persons.push({ id: doc.id, ...doc.data() }));
    return persons;
  } catch (error) {
    console.error("Erro ao buscar pessoas ativas:", error);
    throw error;
  }
}
