// FIGURE THIS OUT
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
// import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore";
// const {
//   initializeApp,
//   applicationDefault,
//   cert,
// } = require("firebase-admin/app");
// const {
//   getFirestore,
//   Timestamp,
//   FieldValue,
// } = require("firebase-admin/firestore");

// firebase config
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASURMENTID,
};

// // initialize firebase app
// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }

const app = initializeApp(config);
export const db = getFirestore();

// export
// export const auth = firebase.auth();
export const auth = getAuth(app);
// export const googleAuthProvider = new app.auth.GoogleAuthProvider();
export const googleAuthProvider = new GoogleAuthProvider();
// export const firestore = firebase.firestore();
