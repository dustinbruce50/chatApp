import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //return res.status(400).json({ error: "invalid username" });
      //return res.status(400).json({ error: "invalid password" });
      //res.json({ token });
      const response = await login({
        username,
        password,
      });
      if (response.status == 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", username);
      }
      setMessage(response.data.message);
      console.log(message);
      navigate("/chat");
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.error || "An error occured");
      console.log(message);
    }
  };
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="login-wrapper">
        <h1 className="login-text">Welcome to my Chat App!</h1>
        <div>
          This application uses Socket.IO to implement a live chat window.{" "}
        </div>
        <form action="" onSubmit={handleSubmit} className="form-container">
          <label htmlFor="username">Username</label>
          <input
            className
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
          <button>Login</button>
        </form>
        <button className="registerButton" onClick={handleRegister}>
          Register
        </button>

        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default Login;
