import { Database, getDatabase } from "firebase/database";
import { initializeApp, getApp, getApps, FirebaseApp} from "firebase/app";
import { Auth, browserLocalPersistence, getAuth } from 'firebase/auth';
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from "react-native";

export interface User {
    email: string,
    password: string, 
    username?: string,
    avatar?: string,
}


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

let app: FirebaseApp, auth: Auth, db: Database;

if(!getApps().length) {
    try {
    app = initializeApp(firebaseConfig);
    if (Platform.OS !== 'web') {
        auth = initializeAuth(app, {
            persistence: [getReactNativePersistence(ReactNativeAsyncStorage), browserLocalPersistence]
        });
    } else {
        auth = initializeAuth(app, {
            persistence: browserLocalPersistence,
        });
    }
    
    db = getDatabase(app);

    } catch(error){
    console.log("Error Initializing app: " + error);
    }
} else {
    try{
        app = getApp();
        auth = getAuth(app);
        db = getDatabase(app);
    } catch (error) { 
        console.log("[ERROR] getting Authentication before Firebase App initialized " + error)
    }
}

export { app, auth, db };