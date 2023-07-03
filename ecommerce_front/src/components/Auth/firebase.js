import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";

const apikey= import.meta.env.VITE_FIREBASE_APIKEY
const authDomain =import.meta.env.VITE_FIREBASE_AUTHDOMAIN
const projectID=import.meta.env.VITE_FIREBASE_PROJECT_ID
const storageBucket=import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
const mesaggingSenderID=import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
const appID=import.meta.env.VITE_FIREBASE_APP_ID

const firebaseConfig = {
  apiKey: apikey,
  authDomain: authDomain,
  projectId: projectID,
  storageBucket:storageBucket ,
  messagingSenderId: mesaggingSenderID,
  appId: appID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);