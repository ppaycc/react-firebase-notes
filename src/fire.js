import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD9HTvTuxKfGwYFzK8RUI5mA31urZgNLcw",
    authDomain: "todo-4cb53.firebaseapp.com",
    databaseURL: "https://todo-4cb53-default-rtdb.firebaseio.com",
    projectId: "todo-4cb53",
    storageBucket: "todo-4cb53.appspot.com",
    messagingSenderId: "196777557898",
    appId: "1:196777557898:web:58d4a7224099c37d4e1273"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;