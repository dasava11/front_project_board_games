import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { signup, controlarEmail } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await controlarEmail(e.target.email.value);
      await signup(
        e.target.name.value,
        e.target.email.value,
        e.target.password.value
      );
      toast.success("You will receive an email to verify your account.");
      navigate("/login");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        toast.error("Invalid email");
      }else{
        toast.error(error.message);
      }

    }
  };
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={(e) => handleSubmit(e)}>
        <h2 className="create-account">Create your account</h2>

        <label htmlFor="name">Full Name:</label>
        <input
          className="inputs-signup"
          type="text"
          name="name"
          id="name"
          value={user.name}
          onChange={handleChange}
        ></input>
        <label htmlFor="email">Email:</label>
        <input
          className="inputs-signup"
          type="text"
          name="email"
          id="email"
          value={user.email}
          placeholder="youremail@yourcompany.com"
          onChange={handleChange}
        ></input>

        <label htmlFor="password">Password:</label>
        <input
          className="inputs-signup"
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
        ></input>

        <button type="submit" className="signup-button">
          Create Account
        </button>
        <span>
          Already have an account? <Link to="/login">Log in</Link>
        </span>
      </form>
    </div>
  );
};
