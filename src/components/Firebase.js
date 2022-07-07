import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAZOMxiJDK2kWGdOydcnhOBheMYvz-wGn4",
    authDomain: "customwordleclone.firebaseapp.com",
    projectId: "customwordleclone",
    storageBucket: "customwordleclone.appspot.com",
    messagingSenderId: "282017055662",
    appId: "1:282017055662:web:72590d458f5d1b09887e3f"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;