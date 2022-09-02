
import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//Initialize Firebase
  if(!firebase.apps.length){
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC64YzviJAIN8Z7u1b2JOXtegfrXBdjn_4",
  authDomain: "userinfo-aaa67.firebaseapp.com",
  databaseURL: "https://userinfo-aaa67-default-rtdb.firebaseio.com",
  projectId: "userinfo-aaa67",
  storageBucket: "userinfo-aaa67.appspot.com",
  messagingSenderId: "948186457030",
  appId: "1:948186457030:web:47f75f624d366d56b048c7",
  measurementId: "G-L3F0G2NL32"
};


firebase.initializeApp(firebaseConfig);
}


  export default firebase.firestore();