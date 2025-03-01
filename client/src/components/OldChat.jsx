import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { getMessages, sendMessage } from "../services/api";

//const socket = io("http://localhost:4242");

const Chat = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const fetchMessages = async () => {
    try {
      const response = await getMessages().then((response) => {
        console.log("Messages from server:");
        console.log({ response });
        if (response.messages) {
          setMessages(response.messages);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    getMessages()
      .then((response) => {
        console.log("Messages from server:");
        console.log({ response });
        if (response.messages) {
          setMessages(response.messages);
        }
      })
      .catch((error) => {
        console.error("Error fetching messages", error);
      });
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const messageData = { content: message };
    sendMessage(messageData)
      .then(() => {
        //socket.emit("sendMessage", messageData);
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending message", error);
      });
    fetchMessages();
  };

  return (
    <div className="chat-container p-4">
      <div className="bg-white text-black  mb-6 min-h-48 max-h-48 border-2 overflow-y-auto space-y-4">
      
        {messages.map((msg, index) => (
          <div key={index} className="message mb-2 grid grid-cols-3">
            <div>{msg.content}</div>

            <div>{msg.sender?.username.toString()}</div>

            <div>{msg.timestamp}</div>
          </div>
        ))}
      </div>
      <div className="input-bar flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded ml-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};
export default Chat;
