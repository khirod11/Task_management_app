
import { initializeApp } from "firebase/app";
import { getDatabase } from "@firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyCKbfakAkuLshaTYEKJpDoEG2xiP8gNkz8",
    authDomain: "real-time-task-managemen-cbc4c.firebaseapp.com",
    databaseURL: "https://real-time-task-managemen-cbc4c-default-rtdb.firebaseio.com",
    projectId: "real-time-task-managemen-cbc4c",
    storageBucket: "real-time-task-managemen-cbc4c.appspot.com",
    messagingSenderId: "923318164114",
    appId: "1:923318164114:web:75f20aa904bbf524d2644b",
    measurementId: "G-BS9SLLLCC9"
  };
  
  const app = initializeApp(firebaseConfig);
  export default app;
  export const db = getDatabase(app);
