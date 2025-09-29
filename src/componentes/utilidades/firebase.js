import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBVGbeOatbLCnyvmvX9-lt-drqhDPI9HA8",
  authDomain: "e-comerce-reactleori.firebaseapp.com",
  projectId: "e-comerce-reactleori",
  storageBucket: "e-comerce-reactleori.appspot.com",
  messagingSenderId: "56688968570",
  appId: "1:56688968570:web:24291ee913fc78e93f4cc3",
  measurementId: "G-H0ZDF65K3K",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore y exportarlo
export const db = getFirestore(app);