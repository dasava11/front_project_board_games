import React, { useState } from "react";

export const LogIn = () => {
  const [input, setInput] = useState({
    user_name: "",
    password: "",
  });
  return (
    <div>
      <form onSubmit={""}>
        <label htmlFor="user_name">Username:</label>
        <input type="text" name="user_name" value={input.user_name}></input>
        <label htmlFor="password">Password:</label>
        <input type="text" name="password" value={input.password}></input>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};
