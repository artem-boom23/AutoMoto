import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./config";

const collectionName = "moto";

export const saveMoto = (newLink) =>
  addDoc(collection(db, collectionName), newLink);

export const updateMoto = (id, updatedFields) =>
  updateDoc(doc(db, collectionName, id), updatedFields);

export const onGetLinks = (callback) => {
  return onSnapshot(collection(db, collectionName), callback);
};

export const getMotos = () => getDocs(collection(db, collectionName));

export const deleteMoto = (id) => deleteDoc(doc(db, collectionName, id));

export const getMoto = (id) => getDoc(doc(db, collectionName, id));
