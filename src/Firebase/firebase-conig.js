import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import ('dotenv')
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:"process.env.API_KEY",
  authDomain: "sub-app-fc954.firebaseapp.com",
  projectId: "sub-app-fc954",
  storageBucket: "sub-app-fc954.firebasestorage.app",
  messagingSenderId: "14484487930",
  appId: "1:14484487930:web:6195205612a1e319519343"
};

// Initialize Firebase
// Initialize Firebas const app = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app);

export const provider = new GoogleAuthProvider()
export default app;