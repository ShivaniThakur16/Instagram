import app from "./src/app.js";
import connectdb from "./src/db/db.js";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconect", () => {
    console.log("A user disconnected");
  });
  setTimeout(() => {
    socket.emit("kuch-ramndome", {});
  }, 10000);
});

connectdb();
httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});


