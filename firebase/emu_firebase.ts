import { getDatabase,child, set, ref, connectDatabaseEmulator, get } from "firebase/database";
import { initializeApp, getApp, getApps} from "firebase/app";
import { getAuth, onAuthStateChanged, connectAuthEmulator, signInWithEmailAndPassword, Auth, browserLocalPersistence, setPersistence} from 'firebase/auth';
import { setLogLevel } from 'firebase/app';
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions';
import {connectFirestoreEmulator, getFirestore} from 'firebase/firestore';
import { Platform } from "react-native";
// import { doc, setDoc, getFirestore, connectFirestoreEmulator} from 'firebase/firestore'
// import testIDs from "@/components/Calendar/testIDs";

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

  let app, auth: Auth, db, functions, store;
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getDatabase(app);
  store = getFirestore(app);
  functions = getFunctions(app);
  if (__DEV__) {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099')
    connectFirestoreEmulator(store, "127.0.0.1", 8080);
    connectFunctionsEmulator(functions, "127.0.0.1", 5001);
  }

  setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // mock sign-in function  
    let email = 'test@test.com'
    let password = '123456'
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  
      const addMessage = httpsCallable(functions, 'addMessage');

      let messageText = 'nothing useful'
      console.log('sending addMessage')
        addMessage({ text: messageText })
          .then((result) => {
            // Read result of the Cloud Function.
            /** @type {any} */
            const data = result.data;
            const sanitizedMessage = data.text;
            console.log(sanitizedMessage)
        });
  
    // if(!getApps().length) {
    //   try {
    //     app = initializeApp(firebaseConfig);
    //     auth = initializeAuth(app, {
    //       persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    //     });
    //     db = getDatabase(app);
    //     functions = getFunctions(app);
    //     console.log(functions)
    //   const addMessage = httpsCallable(functions, 'addMessage');

    //   let messageText = 'nothing useful'
    //   console.log('sending addMessage')
    //     addMessage({ text: messageText })
    //       .then((result) => {
    //         // Read result of the Cloud Function.
    //         /** @type {any} */
    //         const data = result.data;
    //         const sanitizedMessage = data.text;
    //         console.log(sanitizedMessage)
    //     });

    //   if(auth) {

    //   }

    //   } catch(error){
    //     console.log("Error Initializing app: " + error);
    //   }
    // } else {
    //   console.log('App exists, getting app')
    //   try{
    //     app = getApp();
    //     auth = getAuth(app);
    //     db = getDatabase(app);
    //     functions = getFunctions(app);
    //     console.log(functions)
    //   const addMessage = httpsCallable(functions, 'addMessage');

    //   let messageText = 'nothing useful'
    //   console.log('sending addMessage')
    //     addMessage({ text: messageText })
    //       .then((result) => {
    //         // Read result of the Cloud Function.
    //         /** @type {any} */
    //         const data = result.data;
    //         const sanitizedMessage = data.text;
    //         console.log(sanitizedMessage)
    //     });
    //   } catch (error) { 
    //     console.log("[ERROR] getting Authentication before Firebase App initialized " + error)

    //   }
    // }



  // Set log level (this part is crucial to handle log messages correctly)
  setLogLevel('debug');

      // function signin() {
      // signInWithEmailAndPassword(auth, email, password)
      //   .then((userCredential) => {
      //     // Signed in 
      //     const user = userCredential.user;
      //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   });
  // Listen to authentication state changes
  // if (auth) {
  //   onAuthStateChanged(auth, (user) => {
      
  //     if (user) {
  //       console.log('User is signed in:', user);
  //     } else {
  //       console.log('No user is signed in.');
  //     }
  //   });
  // }
  }