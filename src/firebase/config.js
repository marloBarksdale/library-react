import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCOJwGKndVQrlFGMRfglzWIZxufpdJzwiU',
  authDomain: 'library-7ec9f.firebaseapp.com',
  projectId: 'library-7ec9f',
  storageBucket: 'library-7ec9f.appspot.com',
  messagingSenderId: '619637477546',
  appId: '1:619637477546:web:c47e0ed0d55134027080d3',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const authorization = getAuth();

export { db, authorization };
