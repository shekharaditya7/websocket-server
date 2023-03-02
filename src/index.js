const express = require("express");
const app = express();
const server = app.listen(8080);

const CLIENT_ORIGIN =
  process.env.NODE_ENV === "production"
    ? "https://this-is-me-74cbf.web.app"
    : "http://localhost:3000";

const io = require("socket.io")(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Server is healthy");
});

const createMessage = ({ socketId, text, type, name }) => {
  return JSON.stringify({ socketId, text, type, name });
};

io.on("connection", (socket) => {
  const roomId = socket.handshake.query.roomId;
  const name = socket.handshake.query.name;
  if (roomId) {
    socket.join(roomId);
    socket.to(roomId).emit(
      "messageFromServer",
      createMessage({
        socketId: socket.id,
        text: `${name} joined the chat`,
        type: "server",
      })
    );
  }
  socket.on("messageFromClient", ({ text, name } = {}) => {
    socket.to(roomId).emit(
      "messageFromServer",
      createMessage({
        socketId: socket.id,
        text,
        type: "user",
        name,
      })
    );
  });
  socket.on("disconnect", () => {
    console.log(socket.id, "user disconnected");
  });
});
