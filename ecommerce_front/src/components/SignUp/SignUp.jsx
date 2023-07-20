import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { passwordDifficulty, validateForm, validateInput } from "./validate";

export const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] =  useState({
    name: "",
    email: "",
    password: "",
  });

  const validForm = validateForm(form,errors)
  const passDifficulty = passwordDifficulty(form.password);

  const { signup, controlarEmail } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateInput({
      ...form, [name]: value },
      errors,
      setErrors);
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
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1 className="create-account">Create your account</h1>

        <div className="div-inputs">
          <label htmlFor="name">Full Name:</label>
          <input
            className="inputs-signup"
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            />
          <span className="inputs-errors-signup">{errors.name}</span>
          <label htmlFor="email">Email:</label>
          <input
            className="inputs-signup"
            type="text"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            />
          <span className="inputs-errors-signup">{errors.email}</span>

          <label htmlFor="password">Password:</label>
          <input
            className="inputs-signup"
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            />
          <span className="inputs-errors-signup">{errors.password}</span>
          <p className={`signup-password-${passDifficulty}`}>{passDifficulty}</p>
        </div>

        <button type="submit" className="signup-button" disabled={!validForm}>
          Create Account
        </button>
        <span>
          Already have an account? <Link to="/login" className="login-p">Log in</Link>
        </span>
      </form>
    </div>
  );
};
