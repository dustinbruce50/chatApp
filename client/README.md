This project is a simple chat app using Socket.IO

The server is located in /server/server.js. The server uses Mongo DB models to create and interact with the database.

update: in the root folder, there's a node script "start-all.js" that should open all terminals required for the project to run"

The database is hosted in /data. It is a MongoDB instance.

The front end is hosted in src. It's a React app created with Vite.

To run/test this project:
spin up the db (from root):
mongod --dbpath data
spin up server(from /server):
nodemon server.js
you should see a confirmation in the terminal that the db is running.
spin up 2 clients(from client): 1) npm run dev 2) (seperate terminal) port=3001 npm run dev
