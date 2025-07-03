import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAqXveqvOhn5FzmPH1am5ED3z0P-J6HdH8",
  authDomain: "registration-44c29.firebaseapp.com",
  projectId: "registration-44c29",
  storageBucket: "registration-44c29.firebasestorage.app",
  messagingSenderId: "927144621332",
  appId: "1:927144621332:web:11c9797352f019f6d8fe01",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
