import axios from "axios";


export const API_BASE =
  import.meta.env.VITE_API_URL || `http://${window.location.hostname}:4242`;

export const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || `http://${window.location.hostname}:4242`;


console.log("[client] API_BASE =", API_BASE, "SOCKET_URL =", SOCKET_URL);
window.__API_BASE = API_BASE;
window.__SOCKET_URL = SOCKET_URL;


const api = axios.create({ baseURL: `${API_BASE}/api` });
/**
 * const api = axios.create({
  baseURL: "http://localhost:4242/api",
});
**/
//register.jsx
export const register = (userData) => api.post("/users/register", userData);

//login.jsx
export const login = (userData) => api.post("/users/login", userData);

//chat.jsx
export const sendMessage = async (messageData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post("/messages", messageData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error sending message:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
  //console.log("Returning after sendMessage API: ", response.data);
  //return response.data;
};
export const getMessages = async () => {
  console.log("get messages has run");
  const token = localStorage.getItem("token");

  const response = await api.get("/messages", {
    headers: {
      Authorization: `Bearer ${token}`,
    },

  });

  return response.data;
};
