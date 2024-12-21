// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDqawnLhqPNspq90WokXScxNfVH4N6hjMk",
  authDomain: "melodymix-b4674.firebaseapp.com",
  projectId: "melodymix-b4674",
  storageBucket: "melodymix-b4674.firebasestorage.app",
  messagingSenderId: "223291471850",
  appId: "1:223291471850:web:961c31c4e44b86b298a493",
  measurementId: "G-E4TVNXW389",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
