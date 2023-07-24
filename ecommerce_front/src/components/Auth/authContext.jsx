//crear un estado por otro archivo, por fuera
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../Auth/firebase";
import { toast } from "react-toastify";
export const authContext = createContext();
const userUrl = import.meta.env.VITE_URL_USERS;
// const userUrl = 'http://localhost:3001/users';
// const userUrlVerifyEmail = 'http://localhost:3001/users/verifyemail';


const URL_LOGIN = "https://front-project-board-games.vercel.app/login";

const serviceId = import.meta.env.VITE_SERVICE_ID;
const templateId = import.meta.env.VITE_TEMPLATE_ID_EMAIL_VERIFICATION;
const publicId = import.meta.env.VITE_YOUR_PUBLIC_KEY;

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(null);
  const [role, setRole] = useState("");

  const signup = async (name, email, password) => {
    await createUserWithEmailAndPassword(auth, email, password).then(
      ({ user }) => {
        console.log('user')
        console.log(user)
        axios
          .post(userUrl, {
            user_id: user.uid,
            email: user.email,
            name: name,
          })
          .then((res) => {
            if (res.status === 201) {
              toast.success("User created succesully!");
            } else if (res.status === 400 || res.status === 500) {
              toast.error(res.data.message);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    );
    sendEmail(name, auth.currentUser.email, auth.currentUser.uid);
    await signOut(auth);
    window.localStorage.removeItem("token");
  };

  const sendEmail = (name, email, uid) => {
    // const link = "http://localhost:5173/login?verify=" + uid;
    const link ="https://front-project-board-games.vercel.app/login?verify=" + uid;

    const templateParams = {
      user_name: name,
      message: "Follow this link to verify your email address.",
      user_email: email,
      link: link,
    };

    emailjs.send(serviceId, templateId, templateParams, publicId).then(
      function (response) {
        // console.log('SUCCESS!', response.status, response.text);
      },

      function (error) {
        console.log("FAILED...", error);
      }
    );
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
    let role = "";

        if (user) {
        console.log('user')
        console.log(user)
      axios
        .get(`${userUrl}/${user.uid}`)
        .then(({ data }) => {
          console.log('data')
          console.log(data)
          window.localStorage.setItem("role", data.Role.role_name);
          setUserAuth({...userAuth, displayName: data.name});
        window.localStorage.setItem("displayName", data.name);
        })
      }
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

      role = await getRole(user.uid);
      window.localStorage.setItem("role", role);
      setRole(role);
      window.localStorage.setItem("token", user.accessToken);
      window.localStorage.setItem("userId", user.uid);
    }

    setUserAuth({
      ...userAuth,
      uid: user.uid,
      name: user.name,
      email: user.email,
      token: user.accessToken,
      emailVerified: user.emailVerified,
      role: role,
    });
  };

  const getRole = async (user_id) => {
    try {
      const { data } = await axios.get(`${userUrl}/${user_id}`);

      setUserAuth({
        ...userAuth,
        role: data.Role.role_name,
      });
      return data.Role.role_name;
    } catch ({ message }) {
      console.log(message);
    }
  };

  const logOut = async () => {
    try {
      setRole("client");
      window.localStorage.removeItem("role");
      window.localStorage.removeItem("displayName");
      window.localStorage.removeItem("userId");
      await signOut(auth);
      window.localStorage.removeItem("token");
      toast.success("Log out succesfull");
    } catch (error) {
      console.log(error.message);
    }
  };

  const logInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();

    const { user } = await signInWithPopup(auth, googleProvider);

    window.localStorage.setItem("displayName", user.displayName);
    window.localStorage.setItem("userId", user.uid);



    if (user) {    
      axios
        .get(`${userUrl}/${user.uid}`)
        .then(({ data }) => {
          window.localStorage.setItem("role", data.Role.role_name);
          setRole(data.Role.role_name);
          
        })
        .catch((error) => {
          axios
            .post(userUrl, {
              user_id: user.uid,
              email: user.email,
              name: user.displayName,
              email_verified: true,
            })
            .then((res) => {
              window.localStorage.setItem("role", "client");
              setRole("client");
            })
            .catch((error) => {});
        });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUserAuth(currentUser);
    });

    const getRoleLocalStorage = window.localStorage.getItem("role");
    if (getRoleLocalStorage) {
      setRole(getRoleLocalStorage);
    }
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
        setUserAuth,
        role,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
