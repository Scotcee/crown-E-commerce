import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const config = {
    apiKey: "AIzaSyCgjOFAWp_TlncthHhjIJ5ldKzsg9u0NqQ",
    authDomain: "clothing-e-commerce-90a28.firebaseapp.com",
    projectId: "clothing-e-commerce-90a28",
    storageBucket: "clothing-e-commerce-90a28.appspot.com",
    messagingSenderId: "80625419425",
    appId: "1:80625419425:web:ecd42c62a24b63514d9ce0",
    measurementId: "G-B2TJK3YKP0"
};

// Initialize Firebase
const app = initializeApp(config);

// Initialize Firestore and Auth
const firestore = getFirestore(app);
const auth = getAuth(app);

// Google Auth Provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// Sign in with Google function
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        return result; // Handle the result as needed
    } catch (error) {
        console.error("Error signing in with Google:", error);
        // Optionally display an error message to the user
    }
};

// Export instances
export { app, firestore, auth, provider };
