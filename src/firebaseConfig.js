import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyA4I-tLDBOMKohwPmCeLdSiJmatF99CFEY",
  authDomain: "qwilr-3a84a.firebaseapp.com",
  databaseURL: "https://qwilr-3a84a.firebaseio.com",
  projectId: "qwilr-3a84a",
  storageBucket: "qwilr-3a84a.appspot.com",
  messagingSenderId: "858775841076",
  appId: "1:858775841076:web:067d36cbe157fc88"
};
firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref();
export const PortfolioRef = databaseRef.child("portfolio");
