// // Node server which will handle socket io connection

// const io = require("socket.io")(8000);

// const user = {};

// io.on("connection", (socket) => {
//   socket.on("new-user-joined", (name) => {
//     console.log("new-user", name);
//     user[socket.id] = name;
//     socket.broadcast.emit("user-joined", name);
//   });

//   socket.on("send", (message) => {
//     socket.broadcast.emit("receive", {
//       message: message,
//       name: user[socket.id],
//     });
//   });
// });


const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public')); // Serve your static files from a directory named 'public'.

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('new-user-joined', (userName) => {
    // Notify all connected clients that a new user has joined.
    console.log('new-user' , userName);
    socket.broadcast.emit('user-joined', userName);
  });

  socket.on('send-message', (message) => {
    // Broadcast the received message to all connected clients.
    socket.broadcast.emit('receive-message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
