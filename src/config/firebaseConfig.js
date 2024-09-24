import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";



// Your web app's Firebase configuration
const firebaseConfig = {
    databaseURL: 'https://edustreamapp-default-rtdb.firebaseio.com/',
    apiKey: "AIzaSyB4oihNT-wnNoGMutpK5hoeYNYLxU1qNI8",
    authDomain: "edustreamapp.firebaseapp.com",
    projectId: "edustreamapp",
    storageBucket: "edustreamapp.appspot.com",
    messagingSenderId: "363361904383",
    appId: "1:363361904383:web:291940df5a7f8e1ac34eca"
};


export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getDatabase()
