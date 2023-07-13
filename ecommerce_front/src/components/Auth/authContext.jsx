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
  fetchSignInMethodsForEmail,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../Auth/firebase";
import { toast } from "react-toastify";
export const authContext = createContext();
const userUrl = import.meta.env.VITE_URL_USERS;
// const userUrl = 'http://localhost:3001/users';

const URL_LOGIN = import.meta.env.VITE_URL_LOGIN;

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(null);

  const signup = async (name, email, password) => {
    await createUserWithEmailAndPassword(auth, email, password).then(
      ({ user }) => {
            axios
              .post(userUrl, {
                uid: user.uid,
                email: user.email,
                name: name})
              .then((res) => {
                // setUserAuth({
                //   name: newUser.name,
                //   email: newUser.email,
                //   token: idToken,
                // });
                if (res.status === 201) {
                  toast.success("User created succesully!");
                } else if (res.status === 400 || res.status === 500) {
                  toast.error(res.data.message);
                }
              })
              .catch((err) => {
                console.error(err);
              });
        // user
        //   .getIdToken()
        //   .then((idToken) => {
        //     window.localStorage.setItem("token", idToken);
        //     const newUser = {
        //       email: email,
        //       name: name,
        //       token: idToken,
        //     };
        //     axios
        //       .post(userUrl, newUser)
        //       .then((res) => {
        //         setUserAuth({
        //           name: newUser.name,
        //           email: newUser.email,
        //           token: idToken,
        //         });
        //         if (res.status === 201) {
        //           toast.success("User created succesully!");
        //         } else if (res.status === 400 || res.status === 500) {
        //           toast.error(res.data.message);
        //         }
        //       })
        //       .catch((err) => {
        //         console.error(err);
        //       });
        //   })
        //   .catch((err) => console.error(err));
      }
    );
    const configuration = {
      url: URL_LOGIN,
    };

    await sendEmailVerification(auth.currentUser, configuration)
      .then(() => {
        console.log(
          `Se ha enviado un correo electrónico de verificación a ${name}.`
        );
      })
      .catch((error) => {
        console.error(
          "Error sending verification email.",
          error
        );
      });

    await signOut(auth);
    window.localStorage.removeItem("token");
  };

  const controlarEmail = async (email) => {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods.length > 0) {
      throw new Error("There is already a user with that email");
    }
  };
  const resetPassword = async (email) => {
    const configuration = {
      url: URL_LOGIN,
    };
    try {
      const response = await fetchSignInMethodsForEmail(auth, email);
      if (response.length !== 0) {
        await sendPasswordResetEmail(auth, email, configuration);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const login = async (email, password) => {

    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const { user } = credentials;
    
    setUserAuth({
      name: user.name,
      email: user.email,
      token: user.accessToken,
      emailVerified: user.emailVerified
    });
    
    if (!user.emailVerified) {
      await signOut(auth);
      window.localStorage.removeItem("token");
      throw new Error(
        "Verify the account with the link that we sent to your email"
        );
    } else {
      if (window.localStorage.getItem("token")) {
        window.localStorage.removeItem("token");
      }
      window.localStorage.setItem("token", user.accessToken);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      window.localStorage.removeItem("token");
      toast.success("Log out succesfull");
    } catch (error) {
      console.log(error.message);
    }
  };

  const logInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();

    const userCredential = await signInWithPopup(auth, googleProvider);
    if (!userCredential.user.emailVerified) {
      await signOut(auth);
      window.localStorage.removeItem("token");
      throw new Error(
        "Verify the account with the link that we sent to your email"
      );
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUserAuth(currentUser);
    });
  }, []);

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        logOut,
        userAuth,
        logInWithGoogle,
        resetPassword,
        controlarEmail,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
