import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBrHaAefpnn52Sed2gZeszFG_zG16ipKR8",
    authDomain: "oneresume-636e5.firebaseapp.com",
    projectId: "oneresume-636e5",
    storageBucket: "oneresume-636e5.appspot.com",
    messagingSenderId: "578169602996",
    appId: "1:578169602996:web:94de938445dc23274628e1",
    measurementId: "G-72DP7B5TYP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return "";
    } catch (err) {
        // console.error(err);
        if (err.message === "Firebase: Error (auth/user-not-found).") {
            return "User not found";
        }
        else if(err.message === "Firebase: Error (auth/wrong-password)."){
            return "Please check your password";
        }
        else {
            alert(err.message);
        }
    }
};

const registerWithEmailAndPassword = async (/* name, */ email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            // name,
            authProvider: "local",
            email,
        });
        return "";
    } catch (err) {
        if (err.message === "Firebase: Error (auth/email-already-in-use).") {
            // alert("Email ID already exists")
            return "Email ID already exists";
        }
        else {
            alert(err.message);
            return err.message;
        }
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        if (err.message === "Firebase: Error (auth/user-not-found).") {
            alert("User not found");
        }
        else
            alert(err.message);
    }
};

const logout = () => {
    console.log("User logged out");
    signOut(auth);
};

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};