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
      <div className="">
        <h1 className="p-4">Register here!</h1>
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

export default Register;
