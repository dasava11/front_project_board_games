import React from "react";

export const SignUp = () => {
  const handleSubmit = () => {};
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Full name:</label>
        <input type="text"></input>
        <label>Address:</label>
        <input type="text"></input>
        <label>ZIP Code</label>
        <input type="number"></input>
        <label>State</label>
        <input></input>
        <label>City</label>
        <input></input>
        <label>Phone number</label>
        <input></input>
        <label>Email:</label>
        <input></input>
        <label>Password:</label>
        <input type="password"></input>
        <label>Repeat Password:</label>
        <input type="password"></input>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};
