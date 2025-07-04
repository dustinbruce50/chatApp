const { exec } = require("child_process");

exec('mintty -e bash -c "mongod --dbpath "./data"');
exec('mintty -e bash -l -c "cd server && nodemon server.js"');
exec('mintty -e bash -l -c "cd client && npm run dev"');
exec('mintty -e bash -l -c "cd client && npm run dev2"');
