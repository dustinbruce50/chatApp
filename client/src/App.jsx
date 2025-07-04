import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import ChatNew from "./components/ChatNew.jsx";
import "./App.css";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import socketIO from "socket.io-client";

function isAuthenticated() {
  console.log("checking authentication");
  const token = localStorage.getItem("token");
  return !!token;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/chat"
            element={isAuthenticated() ? <ChatNew /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default App;
