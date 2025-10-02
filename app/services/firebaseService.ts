import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configurația Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCUzamqcKlEfJsAkTR4Mt46kxbQne1IJco",
  authDomain: "roetco-database.firebaseapp.com",
  projectId: "roetco-database",
  storageBucket: "roetco-database.appspot.com",
  messagingSenderId: "232862768164",
  appId: "1:232862768164:web:ca6f44a211e61c2ba70cb1",
  measurementId: "G-W5CFE8E0WL",
};

// Inițializarea Firebase
const app = initializeApp(firebaseConfig);

// Verificăm că suntem pe client și inițializăm Analytics doar acolo
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { analytics };
