import { Database, connectDatabaseEmulator, getDatabase } from "firebase/database";
import { initializeApp, getApp, getApps, FirebaseApp} from "firebase/app";
import { Auth, getReactNativePersistence, browserLocalPersistence, getAuth, initializeAuth, connectAuthEmulator} from 'firebase/auth';
// @ts-ignore
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import { getReactNativePersistence } from '@firebase_native/auth';
// import { getReactNativePersistence } from "@/node_modules/@firebase/auth/dist/index.rn.d.ts";
// import { getReactNativePersistence } from "@/node_modules/@firebase/auth/dist/index.rn.d.ts";

import { Functions, getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { Firestore, getFirestore, connectFirestoreEmulator } from "firebase/firestore";
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
    measurementId: "G-CPSBG1TH81",
    ssl: false
};

let app: FirebaseApp, auth: Auth, db: Database, store: Firestore, functions: Functions;

app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
auth = getAuth(app);
db = getDatabase(app);
store = getFirestore(app);
functions = getFunctions(app);

if (__DEV__) {
    if (Platform.OS === 'web') {
        connectAuthEmulator(auth, "http://127.0.0.1:9099");
        connectFirestoreEmulator(store, "http://127.0.0.1", 8080);
        connectDatabaseEmulator(db, "http://127.0.0.1", 9000);
        connectFunctionsEmulator(functions, "127.0.0.1", 5001);
    } else { 
        const ipAddr = '192.168.1.82'
        connectAuthEmulator(auth, `http://${ipAddr}:9099`);
        connectFirestoreEmulator(store, `http://${ipAddr}`, 8080);
        connectDatabaseEmulator(db, `http://${ipAddr}`, 9000);
        connectFunctionsEmulator(functions, `${ipAddr}`, 5001);
    }
}

Platform.OS === 'web' ? auth.setPersistence(browserLocalPersistence) : auth.setPersistence(getReactNativePersistence(ReactNativeAsyncStorage));
// if (Platform.OS === 'web') auth.setPersistence(browserLocalPersistence);

export { app, auth, db, functions, store };
