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
      const response = await login({
        username,
        password,
      });
      if(response.status == 200){
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', username)
      }
      setMessage(response.data.message);
      console.log(message);
      navigate("/chat");
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "An error occured");
      console.log(message);
    }
  };

  return (
    <>
      <div className="">
        <h1 className="p-4">Login here!</h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4"
        >
          <label className="p-4" htmlFor="username">
            Username
          </label>
          <input
            className="bg-white text-black"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="p-4" htmlFor="password">
            Password
          </label>
          <input
            className="bg-white text-black"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-white" type="submit">
            Register
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default Login;
