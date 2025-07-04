import React, { useState, useEffect, useRef } from "react";
import { getMessages, sendMessage } from "../services/api";
import io from "socket.io-client";

const socket = io("http://localhost:4242");

const ChatNew = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({});
  };

  useEffect(() => {
    console.log("use effect 1 runs");

    socket.on("receiveMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      scrollToBottom();
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {

    //load initial messages from db on server
    
    console.log("use effect 2 runs");
    const response = getMessages().then((response) => {
      if (response.messages) {
        setMessages(response.messages);
        //if messages exist, scroll to the bottom
        scrollToBottom();
      }
    });
  }, []);


  //scroll to the bottom every time a message is sent/recieved.
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    // Prevent sending empty messages
    if (!message.trim()) {
      return; 
    }

    const messageData = {
      content: message,
    };

    //call api.js sendMessage function
    sendMessage(messageData);
    setMessage("");

    //setUpdate(true);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="chat-container p-4">
      <div className="bg-white text-black  mb-6 min-h-48 max-h-48 border-2 overflow-y-auto space-y-4">
        {console.log(messages)}
        {messages.map((msg, index) => (
          <div key={index} className="message mb-2 grid grid-cols-3">
            <div className="flex-grow break-words whitespace-normal">
              {msg.content}
            </div>

            <div className="text-right ml-2">{msg.sender?.username}</div>

            <div className="text-right ml-2">{formatDate(msg.timestamp)}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
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
export default ChatNew;
