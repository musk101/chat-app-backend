const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const server = app.listen(process.env.PORT, () => {
  console.log("Server Running");
});

io = socket(server, {
  cors: {
    origin: '*',
  }
});


io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User Joined Room: " + data);
  });

  socket.on("send_text", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_text", data.content);
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});
