import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDL7WZORbSBDbWTtlHoDEa4NxVK1W-m8wo",
    authDomain: "sampetrinos.firebaseapp.com",
    databaseURL: "https://sampetrinos.firebaseio.com",
    projectId: "sampetrinos",
    storageBucket: "sampetrinos.appspot.com",
    messagingSenderId: "702590790564",
    appId: "1:702590790564:web:a99ae132c9ef6bc6416f31",
    measurementId: "G-EWDVQ2QSVW"
  };
  
  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true });

  export default firebase;