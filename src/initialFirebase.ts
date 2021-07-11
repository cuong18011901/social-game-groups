import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyAXpiM9XSsNefcfGZE0Pr1S3TtX2zK2xvw",
  authDomain: "pwatnotelist.firebaseapp.com",
  databaseURL: "https://pwatnotelist.firebaseio.com",
  projectId: "pwatnotelist",
  storageBucket: "pwatnotelist.appspot.com",
  messagingSenderId: "891302271230",
  appId: "1:891302271230:web:d36b8f5644f0fbb4dd6daf",
};

function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}

initFirebase();

export { firebase };
