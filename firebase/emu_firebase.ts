import { getDatabase,child, set, ref, connectDatabaseEmulator, get } from "firebase/database";
import { initializeApp, getApp, getApps} from "firebase/app";
import { getAuth, onAuthStateChanged, connectAuthEmulator, signInWithEmailAndPassword} from 'firebase/auth';
import { setLogLevel } from 'firebase/app';
// import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc, getFirestore, connectFirestoreEmulator} from 'firebase/firestore'
import testIDs from "@/components/Calendar/testIDs";

export function emu_firebase() {

  let firebaseConfig = {
    apiKey: "AIzaSyAY9WZ33Dmj09FLnAdQFXvcx-ll8FabNG0",
    authDomain: "test-f3464.firebaseapp.com",
    databaseURL: "https://test-f3464-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "test-f3464",
    storageBucket: "test-f3464.appspot.com",
    messagingSenderId: "747573430249",
    appId: "1:747573430249:web:f06d525f7925862bb2ed78",
    measurementId: "G-CPSBG1TH81"
};

  let app, auth, db;
    if(!getApps().length) {
      try {
        app = initializeApp(firebaseConfig);
        auth = initializeAuth(app, {
          persistence: getReactNativePersistence(ReactNativeAsyncStorage)
        });
        db = getDatabase(app);

      } catch(error){
        console.log("Error Initializing app: " + error);
      }
    } else {
      console.log('App exists, getting app')
      try{
        app = getApp();
        auth = getAuth(app);
        db = getDatabase(app);
      } catch (error) { 
        console.log("[ERROR] getting Authentication before Firebase App initialized " + error)

      }
      // isSupported().then((yes) => {
      //   console.log('getting the analytics', JSON.stringify(app, null, 4))
      //   analytics = getAnalytics(app);
      // })
    }

  if (false) {
    console.log('connecting database emulators')
    connectAuthEmulator(auth, 'http://127.0.0.1:9099')
    connectDatabaseEmulator(db, "127.0.0.1", 9000);
    console.log('connected everything')
  }

  // mock sign-in function  
  let email = 'test@test.com'
  let password = '123456'

  // Set log level (this part is crucial to handle log messages correctly)
  setLogLevel('debug');

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      console.log('signed in successfully')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  // Listen to authentication state changes
  if (auth) {
    onAuthStateChanged(auth, (user) => {
      console.log(user)
      
      if (user) {
        console.log('User is signed in:', user);
      } else {
        console.log('No user is signed in.');
      }
    });

  }


  function test_setget() {
    console.log('testing setget')
    // set(ref(db, '/users/' + '1'), {
    //   username: 'someone',
    //   email: 'email@email.com',
    //   profile_picture : 'http://sadf.jpg'
    // })
    // .then(() => {
    //   console.log('success')
    //   // Data saved successfully!
    // })
    // .catch((error) => {
    //   console.log(error)
    //   // The write failed...
    // });

    // get(child(ref(db), '/users/1/')).then((r) => {
    //   console.log(r)
    // })
    // console.log(JSON.stringify(db, null, 4));
  }

  // test_setget()

}