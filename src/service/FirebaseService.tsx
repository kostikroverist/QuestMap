import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import L from "leaflet";
import { MarkerData } from "../interfaces/mark";

const firebaseConfig = {
  apiKey: "AIzaSyBOLOKYimOkLZIuY_nblQgK4ZCVOGzmgEc",
  authDomain: "questmap-23567.firebaseapp.com",
  projectId: "questmap-23567",
  storageBucket: "questmap-23567.appspot.com",
  messagingSenderId: "813465989672",
  appId: "1:813465989672:web:0d4c12f74b5ea87577fb1d",
};

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line react-refresh/only-export-components
export const storage = getStorage(app);
// eslint-disable-next-line react-refresh/only-export-components
export const db = getFirestore(app);

const FirebaseService = {
  addQuest: async (marker: MarkerData, nextId: number | null) => {
    try {
      const { position, ...rest } = marker;
      const docRef = await addDoc(collection(db, "quests"), {
        ...rest,
        position: { lat: position.lat, lng: position.lng },
        next: nextId,
        timestamp: marker.timestamp,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  },
  removeQuest: async (id: number) => {
    try {
      const q = query(collection(db, "quests"), where("id", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  },
  removeAllQuests: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "quests"));
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    } catch (error) {
      console.error("Error removing all documents: ", error);
    }
  },
  updateQuest: async (
    id: number,
    newPosition: L.LatLng,
    nextId: number | null
  ) => {
    try {
      const q = query(collection(db, "quests"), where("id", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, {
          position: { lat: newPosition.lat, lng: newPosition.lng },
          next: nextId,
        });
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  },
};

export default FirebaseService;
