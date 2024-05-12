import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io"
import signup from "./api/signup.js";

const app = express();

app.use(cors());
app.use(express.json());

// API calls

app.use("/signup", signup);

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
});
app.get("/", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({data: "Hi this works"}));
});


io.on("connection",  () => {
    console.log("someon connected")
})

httpServer.listen(3000);
