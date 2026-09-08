import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBJpyHGjx7eWUKWtZB3-WyD-12-KBJPwFk',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'project-test-9bd48.firebaseapp.com',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://project-test-9bd48-default-rtdb.firebaseio.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'project-test-9bd48',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'project-test-9bd48.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '211338110281',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:211338110281:web:a0513b801ebfab5afc6698',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-SS6RR7E081',
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Analytics support check
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Analytics optional fallback
  });
}

export { app, auth, db, analytics };
