import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC9hMJn2dGsq2jVtrp8MK8uMG4X_A14EE4",
    authDomain: "eventos-d9628.firebaseapp.com",
    projectId: "eventos-d9628",
    storageBucket: "eventos-d9628.appspot.com",
    messagingSenderId: "741369811929",
    appId: "1:741369811929:web:7d4e84504cd627cf587fc8"
  };
  
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);