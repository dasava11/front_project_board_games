import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const SignUp = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    repeat_password: "",
  });
  const { signup } = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    //aca va logica de firebase
    try {
      await signup(
        // input.first_name,
        // input.last_name,
        input.email,
        input.password
      );
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        toast.error(error.message);
        console.error(error.message);
      }
    }
  };
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={(e) => handleSubmit(e)}>
        <h2 className="create-account">Create your account</h2>
        <label htmlFor="first_name">First Name:</label>
        <input
          className="inputs-signup"
          type="text"
          name="first_name"
          value={input.first_name}
          onChange={handleChange}
        ></input>
        <label htmlFor="last_name">Last Name:</label>
        <input
          className="inputs-signup"
          type="text"
          name="last_name"
          value={input.last_name}
          onChange={handleChange}
        ></input>
        <label htmlFor="email">Email:</label>
        <input
          className="inputs-signup"
          type="text"
          name="email"
          value={input.email}
          placeholder="youremail@yourcompany.com"
          onChange={handleChange}
        ></input>

        <label htmlFor="password">Password:</label>
        <input
          className="inputs-signup"
          type="password"
          name="password"
          value={input.password}
          onChange={handleChange}
        ></input>
        <label htmlFor="repeat_password">Repeat Password:</label>
        <input
          className="inputs-signup"
          type="password"
          name="repeat_password"
          value={input.repeat_password}
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
