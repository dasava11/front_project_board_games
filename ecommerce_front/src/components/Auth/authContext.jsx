//crear un estado por otro archivo, por fuera
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../Auth/firebase";
export const authContext = createContext();

//este hook me va a dar la informacion del usuario en todos lados q lo llame
export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signup = async (first_name, last_name, email, password) => {
    await createUserWithEmailAndPassword(auth, email, password).then(
      async ({ user }) => {
        user.getIdToken().then((idToken) => {
          window.localStorage.setItem("token", idToken);
          // const newUser = {                VER ACA Q TENGO Q MANDAR AL BACK PARA GENERAR NUEVO USER
          //     email:email,
          //     token:idToken,
          //     first_name:first_name,
          //     last_name:last_name,
          // }
        });
      }
    );
  };
  const resetPassword = (email) => {
    sendPasswordResetEmail(email);
  };
  const login = async (email, password) => {
    const credentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).then(({ user }) => user.accessToken);
    if (window.localStorage.getItem("token")) {
      window.localStorage.removeItem("token");
    }
    window.localStorage.setItem("token", credentials);
    console.log(credentials);
  };
  const logOut = () => {
    try {
      signOut(auth);
      window.localStorage.removeItem("token");
      toast.success("Log out succesfull");
    } catch (error) {
      console.log(error.message);
    }
  };
  const logInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  return (
    <authContext.Provider
      value={{ signup, login, user, logOut, logInWithGoogle, resetPassword }}
    >
      {children}
    </authContext.Provider>
  );
};
