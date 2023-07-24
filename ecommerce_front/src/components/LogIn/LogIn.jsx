import React, { useEffect, useState } from "react";
import { useAuth } from "../Auth/authContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getWishList } from "../../Redux/actions_creators/index"
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./login.css";
import { FcGoogle } from "react-icons/fc";


export const LogIn = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [forgotPassword, setForgotPassword] = useState(false)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { login, logInWithGoogle, resetPassword, userAuth, setUserAuth } = useAuth();
  let executed = false;

  useEffect(()=> {
    if(searchParams.get('verify') !== null){
      verifyUser(searchParams.get('verify'));
    }
  },[])

  const verifyUser = (id) => {
    if(!executed){
      axios
      // .put(`http://localhost:3001/users/verifyemail/${id}`)
      .put(`https://backprojectboardgames-production.up.railway.app/users/verifyemail/${searchParams.get('verify')}`)

        .then((res) => {
          if (res.status === 200) {
            setUserAuth({...userAuth, emailVerified: true})
            toast.success("Email verified!");
            // setExecuted(true);
            executed = true;
            navigate('/login');
          } else if (res.status === 400 || res.status === 500) {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  const [error, setError] = useState();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const validForm = () => {
    if(error?.length === 0  &&  user.email?.length !== 0  &&  user.password?.length !== 0){
      return true;
    }else{
      return false;
    }
  }
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await logInWithGoogle();
      dispatch(getWishList());
      toast.success("A successfull log in with Google!");

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    try {
      if (!user.email || !emailRegex.test(user.email)){
        setError("Please write a valid email");
      } else {
        await resetPassword(user.email);
        toast.success("If your account exists, you will receive an email to reset your password.");
        setForgotPassword(false);
        setUser({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      toast.error(error.mesage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(user.email, user.password);

      toast.success("Successful Log in");
      dispatch(getWishList());
      navigate("/");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("You must signup.");
        navigate("/signup");
      }
      if (error.code === "auth/user-disabled") {
        toast.error("Your account has been blocked by the admin.");
      }
      if (error.code === "auth/wrong-password") {
        toast.error("Wrong password");
      } else{
        // toast.error(error.message);
      }
    }
  };

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    if(name === 'email'  &&  !emailRegex.test(user.email)  &&  value.length !== 0){
      setError("Invalid email.");
    }else if(name === 'email' &&  emailRegex.test(user.email) || value.length === 0){
      setError("");
    }
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
  }

  return (
    <div className="container-login">
      <form className="login-form" >
        <h1 className="login-title">Log In</h1>
        <div className="div-inputs">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            className="login-form-inputs"
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleUser}/>

          {error && <h6 className="login-input-error">{error}</h6>}
          {forgotPassword && <button className="recover-password-button" disabled={email?.length === 0 || !emailRegex.test(user.email) } onClick={handleRecoverPassword}>Send</button>}

          <label htmlFor="password" className={`label ${forgotPassword && "login-disabled"}`}>
            Password
          </label>

          <input
            className={`login-form-inputs ${forgotPassword && "login-disabled"}`}
            type="password"
            name="password"
            email="email"
            id="password"
            value={user.password}
            onChange={handleUser}
            disabled={forgotPassword}/>
        </div>

        <button type="submit" className={`login-button ${forgotPassword && "login-disabled"}`} disabled={forgotPassword || !validForm()} onClick={handleSubmit}>
          Log in
        </button>
          <button className={`login-button ${forgotPassword && "login-disabled"}`} onClick={handleGoogleSignIn} disabled={forgotPassword}>
            Log in with <FcGoogle />
          </button>
          <h6 className="forgot-p" onClick={handleForgotPassword}>
            Forgot your password?
          </h6>
          <span className="span-signup-p">
            Don't have an account? <Link to="/signup" className="signup-p">Create one now</Link>
          </span>
      </form>
    </div>
  );
};
