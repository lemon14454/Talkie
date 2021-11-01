import { Server, Socket } from "socket.io";
import { createServer } from "http";
import express from "express";
import path from "path";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// frontend
app.use(express.static(path.join(path.resolve(), "/build")));

io.on("connection", (socket: Socket) => {
  const id = socket.handshake.query.id;
  socket.join(id!);

  socket.on("send-message", ({ recipients, text }) => {
    recipients.forEach((recipient: string) => {
      const newRecipients = recipients.filter((r: string) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});

httpServer.listen(process.env.PORT || 5000, () => {
  console.log("server running at port 5000");
});
