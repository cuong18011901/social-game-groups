import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyAGcb28fNTMOKjh8Gd-GRCm13og9d6NwSU",
  authDomain: "ma-soi-sv.firebaseapp.com",
  databaseURL: "https://ma-soi-sv-default-rtdb.firebaseio.com",
  projectId: "ma-soi-sv",
  storageBucket: "ma-soi-sv.appspot.com",
  messagingSenderId: "971625671699",
  appId: "1:971625671699:web:15119e5e8879c3611963e6",
  measurementId: "G-H4SFDG7241",
};

function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}

initFirebase();

export { firebase };
