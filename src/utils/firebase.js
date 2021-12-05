import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsipmmWmDBJKj6cy6GzszyGpdVma3z12c",
  authDomain: "justappin-e499e.firebaseapp.com",
  projectId: "justappin-e499e",
  storageBucket: "justappin-e499e.appspot.com",
  messagingSenderId: "1084760364098",
  appId: "1:1084760364098:web:4e0958bfe2513f5cfd09db",
  measurementId: "G-PJ4J2CWPX6",
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export default firebase;
