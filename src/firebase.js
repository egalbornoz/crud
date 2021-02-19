import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCgQ6qqhISsFQmmFnNvmpRg_gYKkp7bshY",
  authDomain: "crud-98fd3.firebaseapp.com",
  projectId: "crud-98fd3",
  storageBucket: "crud-98fd3.appspot.com",
  messagingSenderId: "325545421848",
  appId: "1:325545421848:web:eec793db9f16cde2cbe76d"
};

  export const firebaseApp=firebase.initializeApp(firebaseConfig)