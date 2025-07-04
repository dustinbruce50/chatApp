import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4242/api",
});

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
