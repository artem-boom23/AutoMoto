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

const collectionName = "auto";

export const saveAuto = (newLink) =>
  addDoc(collection(db, collectionName), newLink);

export const updateAuto = (id, updatedFields) =>
  updateDoc(doc(db, collectionName, id), updatedFields);

export const onGetLinks = (callback) => {
  return onSnapshot(collection(db, collectionName), callback);
};

export const getAutos = () => getDocs(collection(db, collectionName));

export const deleteAuto = (id) => deleteDoc(doc(db, collectionName, id));

export const getAuto = (id) => getDoc(doc(db, collectionName, id));
