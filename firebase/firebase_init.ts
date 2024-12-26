// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps} from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';
import { getDatabase, ref, onValue, child, get } from "firebase/database";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



export default function firebase_init(){ 
  
  const firebaseConfig = {
      apiKey: "AIzaSyAY9WZ33Dmj09FLnAdQFXvcx-ll8FabNG0",
      authDomain: "test-f3464.firebaseapp.com",
      databaseURL: "https://test-f3464-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "test-f3464",
      storageBucket: "test-f3464.appspot.com",
      messagingSenderId: "747573430249",
      appId: "1:747573430249:web:f06d525f7925862bb2ed78",
      measurementId: "G-CPSBG1TH81"
  };

    let app, auth, analytics;
    if(!getApps().length) {
      try {
        app = initializeApp(firebaseConfig);
        auth = initializeAuth(app, {
          persistence: getReactNativePersistence(ReactNativeAsyncStorage)
        });
      } catch(error){
        console.log("Error Initializing app: " + error);
      }
    } else {
      console.log('App exists, getting app')
      app = getApp();
      auth = getAuth(app);
      // isSupported().then((yes) => {
      //   console.log('getting the analytics', JSON.stringify(app, null, 4))
      //   analytics = getAnalytics(app);
      // })
    }

      const db = getDatabase(app);
      const email = 'test@test.com'
      const password = '123456'

    // let analytics = getAnalytics(app);
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode)
        const errorMessage = error.message;
        console.log(errorMessage)
      });

    // Initialize Firebase
    // const scores = ref(db, 'server/tennis_app/scores/sets_data');
    // console.log('running on Value')
    // onValue(scores, (snapshot) => {
    //   console.log('running scores')
    //   const data = snapshot.val();
    //   // console.log(data)
    //   return data;
    // })

    const dbRef = ref(db)
    get(child(dbRef, 'server/tennis_app/scores/sets_data')).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.exists())
        // console.log(snapshot.val())
      } else {
        console.log('No data available');
      }
    }).catch((error) => {
      console.log(error);
    })
}