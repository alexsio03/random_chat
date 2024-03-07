const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("connected: ", socket.id);

  socket.on("text", (msg) => {
    console.log("text: " + msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(4000, () => {
  console.log("server running at http://localhost:4000");
});
