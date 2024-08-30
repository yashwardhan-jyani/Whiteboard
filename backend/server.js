import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import { userJoin, userLeave, getUsers } from "./utils/user.js";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true
    },
});

// app.get("/", (req, res) => {
//     res.send("server");
// });

import path from "path";
import { fileURLToPath } from "url";
const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
);

let imageUrl, userRoom;
io.on("connection", (socket) => {
    socket.on("user-joined", (data) => {
        const { roomId, userName, host, presenter } = data;
        userRoom = roomId;
        const user = userJoin(socket.id, userName, roomId, host, presenter);
        const roomUsers = getUsers(user.room);
        socket.join(user.room);
        socket.emit("message", {
            message: "Welcome to ChatRoom",
        });
        socket.broadcast.to(user.room).emit("message", {
            message: `${user.username} has joined`,
        });

        io.to(user.room).emit("users", roomUsers);
        io.to(user.room).emit("canvasImage", imageUrl);
    });

    socket.on("drawing", (data) => {
        imageUrl = data;
        socket.broadcast.to(userRoom).emit("canvasImage", imageUrl);
    });

    socket.on("disconnect", () => {
        const userLeaves = userLeave(socket.id);
        const roomUsers = getUsers(userRoom);

        if(userLeaves) {
            io.to(userLeaves.room).emit("message", {
                message: `${userLeaves.username} left the chat`,
            });
            io.to(userLeaves.room).emit("users", roomUsers);
        }
    });
});

server.listen(3000, () => {
    console.log("Server started on port 3000");
});
