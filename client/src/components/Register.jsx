import React, { useState, useEffect } from "react";
import { register } from "../services/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register({
        username,
        password,
      });
      setMessage(response.data.message);
      console.log(message);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occured");
      console.log(message);
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <h1 className="login-text">Register here!</h1>
        <form action="" onSubmit={handleSubmit} className="form-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
        <button
          className="registerButton"
          onClick={() => (window.location.href = "/login")}
        >
          Back To Login
        </button>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default Register;
