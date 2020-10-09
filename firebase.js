import * as firebase from "firebase";

import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClJ8Dp0-mDS6-WIuOnrzM9GHFNt-2bxeg",
  authDomain: "react-native-scheduler.firebaseapp.com",
  databaseURL: "https://react-native-scheduler.firebaseio.com",
  projectId: "react-native-scheduler",
  storageBucket: "react-native-scheduler.appspot.com",
  messagingSenderId: "1029008842613",
  appId: "1:1029008842613:web:92db5b768693dc0b083d3c"
};

firebase.initializeApp(firebaseConfig);

export { firebase };
