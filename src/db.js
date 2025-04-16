import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGq3PhUHoUpOCMzDgRVfIPat1OIx2GteM",
  authDomain: "sb-mtm6404-contact-book-react.firebaseapp.com",
  projectId: "sb-mtm6404-contact-book-react",
  storageBucket: "sb-mtm6404-contact-book-react.firebasestorage.app",
  messagingSenderId: "567143827484",
  appId: "1:567143827484:web:ff14691e39a90c17f677d9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
