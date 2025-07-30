import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB_pnp6utp_Pw7GANLEmFz1gDo1c-o5qVU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sentinel-rdc.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://sentinel-rdc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sentinel-rdc",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sentinel-rdc.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "720916055628",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:720916055628:web:5c64ead7a365b8db1596e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Functions
export const functions = getFunctions(app);

// Connect to emulators in development
if (import.meta.env.DEV) {
  try {
    // Only connect if not already connected
    if (!db._delegate._databaseId.projectId.includes('localhost')) {
      connectFirestoreEmulator(db, 'localhost', 8080);
    }
    if (!functions.app.automaticDataCollectionEnabled) {
      connectFunctionsEmulator(functions, 'localhost', 5001);
    }
  } catch (error) {
    // Emulators might already be connected, ignore errors
    console.log('Firebase emulators connection status:', error);
  }
}

export default app;