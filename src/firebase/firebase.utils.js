import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const config = {
    apiKey: "AIzaSyCgjOFAWp_TlncthHhjIJ5ldKzsg9u0NqQ",
    authDomain: "clothing-e-commerce-90a28.firebaseapp.com",
    projectId: "clothing-e-commerce-90a28",
    storageBucket: "clothing-e-commerce-90a28.appspot.com",
    messagingSenderId: "80625419425",
    appId: "1:80625419425:web:ecd42c62a24b63514d9ce0",
    measurementId: "G-B2TJK3YKP0"
};

const app = initializeApp(config);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Create user profile document
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = doc(firestore, `users/${userAuth.uid}`);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        const { displayName, email } = userAuth;

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt: new Date(),
                ...additionalData
            });
        } catch (error) {
            console.error("Error creating user profile document:", error);
        }
    }
    return userRef;
};

// Sign up with email and password function
export const signUpWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in with Google function
export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
        const result = await signInWithPopup(auth, provider);
        return result; // Handle result as needed
    } catch (error) {
        console.error("Error signing in with Google:", error);
    }
};

// Export necessary modules
export { app, auth };
