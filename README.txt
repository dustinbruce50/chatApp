# ChatApp - Project Overview

ChatApp is a demonstration project built to showcase modern web development skills and technology integration. It is not intended for production use, but rather as a portfolio example for potential employers.

Key technologies and their roles:

- **MongoDB** stores user accounts and chat messages, demonstrating the use of a NoSQL database for persistent data.
- **Socket.io** provides real-time, bidirectional communication, enabling instant message delivery between users.
- **JWT (JSON Web Tokens)** handles user authentication and session management, illustrating secure access control.
- **bcrypt** is used to hash user passwords before storage, highlighting best practices in password security.
- **Vite** powers the frontend development with fast startup and Hot Module Replacement (HMR), streamlining the developer experience.

This project demonstrates the integration of these technologies to create a live chat application with authentication, real-time messaging, and persistent storage.


# ChatApp - Quick Start Guide
## 1. Running with Docker

If you have Docker installed, you can start all required components easily:

1. In the project root, run:
    ```
    docker compose up
    ```
2. Open your browser and visit:
    - [http://localhost:3000](http://localhost:3000)
    - [http://localhost:3001](http://localhost:3001)

3. Log in with the following credentials to demonstrate the chat app:
    - User 1: `user1` / `password1`
    - User 2: `user2` / `password2`

---

## 2. Running Without Docker

If you don't have Docker, follow these steps:

1. Ensure you have [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally.
2. In the `server` folder, start the backend:
    ```
    node server.js
    ```
3. In the `client` folder, open two terminals and run:
    ```
    npm run dev
    ```
    and in the second terminal:
    ```
    npm run dev2
    ```
4. Open your browser at:
    - [http://localhost:3000](http://localhost:3000)
    - [http://localhost:3001](http://localhost:3001)

5. Log in with:
    - User 1: `user1` / `password1`
    - User 2: `user2` / `password2`