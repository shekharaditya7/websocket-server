const express = require("express");
const app = express();
const server = app.listen(8080);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Server is healthy");
});

var connections = {};

io.on("connection", (socket) => {
  connections[socket.id] = socket.id;
  console.log(socket.id, "connected");
  socket.on("disconnect", () => {
    console.log(socket.id, "user disconnected");
  });
});
