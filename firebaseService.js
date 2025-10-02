// Importă SDK-urile Firebase necesare
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configurația Firebase pentru aplicația ta
const firebaseConfig = {
    apiKey: "AIzaSyCUzamqcKlEfJsAkTR4Mt46kxbQne1IJco",
    authDomain: "roetco-database.firebaseapp.com",
    projectId: "roetco-database",
    storageBucket: "roetco-database.appspot.com",
    messagingSenderId: "232862768164",
    appId: "1:232862768164:web:ca6f44a211e61c2ba70cb1",
    measurementId: "G-W5CFE8E0WL",
};

// Inițializează Firebase
const app = initializeApp(firebaseConfig);

// Inițializează serviciile necesare
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Exportă serviciile pentru a le putea folosi în alte părți ale aplicației
export { db, auth, storage };